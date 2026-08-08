const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow = null;
let tray = null;

const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    frame: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../assets/icon.png'),
    show: false
  });

  // Always load from built files
  mainWindow.loadFile(path.join(__dirname, '../dist/index.html'), { hash: '/login' });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('close', (event) => {
    if (tray && !app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Initialize app
app.whenReady().then(() => {
  createWindow();
  
  try {
    const { createTray } = require('./tray.js');
    tray = createTray(mainWindow);
  } catch (err) {
    console.log('Tray not available:', err.message);
  }
  
  try {
    const { initDatabase, registerDatabaseHandlers } = require('./database.js');
    initDatabase();
    registerDatabaseHandlers(ipcMain);
  } catch (err) {
    console.log('Database not available:', err.message);
  }
  
  try {
    const { initOfflineQueue, registerOfflineHandlers } = require('./offline-queue.js');
    initOfflineQueue();
    registerOfflineHandlers(ipcMain);
  } catch (err) {
    console.log('Offline queue not available:', err.message);
  }
  
  if (!isDev) {
    try {
      const { initAutoUpdater, registerUpdaterHandlers } = require('./updater.js');
      initAutoUpdater(mainWindow);
      registerUpdaterHandlers(ipcMain);
    } catch (err) {
      console.log('Updater not available:', err.message);
    }
  }

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    } else {
      mainWindow.show();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  app.isQuitting = true;
});

// IPC Handlers
ipcMain.handle('get-app-version', () => app.getVersion());

ipcMain.handle('toggle-maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.handle('minimize-window', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.handle('close-window', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});