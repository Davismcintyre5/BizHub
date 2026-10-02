import { ipcMain } from 'electron';
import {
  checkForUpdates,
  installUpdate,
  dismissUpdate,
  getUpdaterStatus,
  setUpdateChannel,
} from '../updater.js';

export function registerUpdaterIpc() {
  ipcMain.handle('updater:getStatus', () => getUpdaterStatus());
  ipcMain.handle('updater:check', () => checkForUpdates());
  ipcMain.handle('updater:install', () => installUpdate());
  ipcMain.handle('updater:dismiss', () => dismissUpdate());
  ipcMain.handle('updater:setChannel', (_e, channel) => setUpdateChannel(channel));
}