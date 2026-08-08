import pkg from 'electron-updater';
const { autoUpdater } = pkg;
import { dialog } from 'electron';

export function initAutoUpdater(mainWindow) {
  // Configure for GitHub Releases
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.allowDowngrade = false;
  autoUpdater.allowPrerelease = false;
  
  // Check for updates every 4 hours
  setInterval(() => {
    autoUpdater.checkForUpdates().catch(err => {
      console.log('Update check failed (will retry):', err.message);
    });
  }, 4 * 60 * 60 * 1000);
  
  // Initial check after 10 seconds
  setTimeout(() => {
    autoUpdater.checkForUpdates().catch(err => {
      console.log('Initial update check failed:', err.message);
    });
  }, 10000);
  
  // Update available
  autoUpdater.on('update-available', (info) => {
    mainWindow.webContents.send('update-available', info);
    
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'Update Available',
      message: `BizHub v${info.version} is available!`,
      detail: `Current version: ${autoUpdater.currentVersion}\nNew version: ${info.version}\n\nDownload now?`,
      buttons: ['Download Now', 'Later'],
      defaultId: 0
    }).then(({ response }) => {
      if (response === 0) {
        autoUpdater.downloadUpdate();
      }
    });
  });
  
  // Download progress
  autoUpdater.on('download-progress', (progress) => {
    mainWindow.webContents.send('download-progress', progress);
  });
  
  // Update downloaded
  autoUpdater.on('update-downloaded', (info) => {
    mainWindow.webContents.send('update-downloaded', info);
    
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'Update Ready',
      message: 'Update has been downloaded',
      detail: 'BizHub will restart to install the update.',
      buttons: ['Restart Now', 'Later'],
      defaultId: 0
    }).then(({ response }) => {
      if (response === 0) {
        setImmediate(() => autoUpdater.quitAndInstall());
      }
    });
  });
  
  // Error handling
  autoUpdater.on('error', (error) => {
    console.error('Update error:', error);
    mainWindow.webContents.send('update-error', { message: error.message });
  });
  
  // No update available
  autoUpdater.on('update-not-available', () => {
    console.log('Current version is up to date');
  });
}

export function registerUpdaterHandlers(ipcMain) {
  ipcMain.handle('check-for-updates', async () => {
    try {
      const result = await autoUpdater.checkForUpdates();
      return { success: true, updateInfo: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  
  ipcMain.handle('download-update', () => {
    autoUpdater.downloadUpdate();
    return { success: true };
  });
  
  ipcMain.handle('install-update', () => {
    autoUpdater.quitAndInstall();
    return { success: true };
  });
}