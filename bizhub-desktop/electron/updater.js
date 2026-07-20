const { autoUpdater } = require('electron-updater');
const { dialog } = require('electron');

function initUpdater() {
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for updates...');
  });

  autoUpdater.on('update-available', async (info) => {
    const result = await dialog.showMessageBox({
      type: 'info',
      title: 'Update Available',
      message: `BizHub v${info.version} is available.`,
      detail: 'Would you like to download and install it now?',
      buttons: ['Download', 'Later'],
      defaultId: 0,
    });

    if (result.response === 0) {
      autoUpdater.downloadUpdate();
    }
  });

  autoUpdater.on('update-downloaded', async () => {
    await dialog.showMessageBox({
      type: 'info',
      title: 'Update Ready',
      message: 'Update downloaded. It will be installed on restart.',
      buttons: ['Restart Now', 'Later'],
    });
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on('error', (err) => {
    console.error('Update error:', err);
  });
}

function checkForUpdates(mainWindow) {
  autoUpdater.checkForUpdates();
  mainWindow?.webContents.send('checking-update');
}

module.exports = { initUpdater, checkForUpdates };