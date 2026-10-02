import { app, BrowserWindow } from 'electron';
import { createLogger } from './logger.js';
import { createMainWindow, getMainWindow } from './window.js';
import { buildMenu } from './menu.js';
import { createTray, destroyTray } from './tray.js';
import { registerAllIpc } from './ipc/index.js';
import { updaterManager } from './updater.js';

const log = createLogger('main');

const API_BASE_URL = 'https://bizhubserver.pxxl.click/api';

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  log.warn('Another instance is already running — quitting');
  app.quit();
  process.exit(0);
}

app.on('second-instance', () => {
  const win = getMainWindow();
  if (!win) return;
  if (win.isMinimized()) win.restore();
  win.show();
  win.focus();
});

if (process.platform === 'win32') {
  app.setAppUserModelId('com.hdm.bizhub');
}

app.whenReady().then(() => {
  log.info('App ready — version', app.getVersion());
  log.info('User data path:', app.getPath('userData'));
  log.info('Packaged:', app.isPackaged);

  registerAllIpc();
  buildMenu();
  createMainWindow();
  createTray();

  log.info('API base URL:', API_BASE_URL);

  updaterManager.start();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    } else {
      getMainWindow()?.show();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  app.isQuitting = true;
  updaterManager.stop();
  destroyTray();
  log.info('App quitting');
});

log.info('Main process initialized');