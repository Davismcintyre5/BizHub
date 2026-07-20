const { app, BrowserWindow, ipcMain, Tray, Menu, Notification, nativeImage, session } = require('electron');
const path = require('path');
const { initUpdater, checkForUpdates } = require('./updater');
const { initTray } = require('./tray');
const printerService = require('./services/printer');
const storageService = require('./services/storage');
const offlineService = require('./services/offline');
const notificationService = require('./services/notification');

let mainWindow = null;
let tray = null;
const isDev = process.env.NODE_ENV === 'development';

const APP_URL = 'https://bizhub.pxxl.click';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    title: 'BizHub',
    icon: path.join(__dirname, '../assets/icon.png'),
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
    show: false,
    backgroundColor: '#f8fafc',
  });

  mainWindow.loadURL(APP_URL);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (!isDev) checkForUpdates(mainWindow);
  });

  mainWindow.on('close', (e) => {
    if (tray) {
      e.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ============================================
// IPC Handlers
// ============================================

// Printer
ipcMain.handle('print-receipt', async (_, data) => {
  return printerService.printReceipt(data);
});

ipcMain.handle('print-invoice', async (_, data) => {
  return printerService.printInvoice(data);
});

ipcMain.handle('get-printers', async () => {
  return printerService.getPrinters();
});

// Storage
ipcMain.handle('store-get', async (_, key) => {
  return storageService.get(key);
});

ipcMain.handle('store-set', async (_, key, value) => {
  return storageService.set(key, value);
});

ipcMain.handle('store-delete', async (_, key) => {
  return storageService.delete(key);
});

// Offline
ipcMain.handle('offline-queue', async (_, action) => {
  return offlineService.queueAction(action);
});

ipcMain.handle('offline-sync', async () => {
  return offlineService.syncNow();
});

ipcMain.handle('offline-pending', async () => {
  return offlineService.getPendingCount();
});

// Notifications
ipcMain.handle('notify', async (_, title, body) => {
  return notificationService.show(title, body);
});

// App
ipcMain.handle('get-version', () => {
  return app.getVersion();
});

ipcMain.handle('check-update', async () => {
  return checkForUpdates(mainWindow);
});

ipcMain.handle('restart-app', () => {
  app.relaunch();
  app.exit();
});

// Window controls
ipcMain.handle('window-minimize', () => {
  mainWindow?.minimize();
});

ipcMain.handle('window-maximize', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});

ipcMain.handle('window-close', () => {
  mainWindow?.close();
});

ipcMain.handle('window-is-maximized', () => {
  return mainWindow?.isMaximized();
});

// Online/Offline detection
ipcMain.handle('get-online-status', () => {
  return require('electron').net.isOnline();
});

// ============================================
// App Lifecycle
// ============================================

app.whenReady().then(() => {
  createWindow();
  tray = initTray(mainWindow);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  tray = null;
});