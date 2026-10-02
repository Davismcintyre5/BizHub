import { ipcMain, app, shell, BrowserWindow } from 'electron';
import path from 'node:path';
import os from 'node:os';
import { get, set, del } from '../store/index.js';
import { KEYS } from '../store/keys.js';

export function registerAppIpc() {
  ipcMain.handle('app:getVersion', () => app.getVersion());
  ipcMain.handle('app:getPlatform', () => process.platform);
  ipcMain.handle('app:isPackaged', () => app.isPackaged);

  ipcMain.handle('app:restart', () => {
    app.relaunch();
    app.exit(0);
  });

  ipcMain.handle('app:quit', () => {
    app.isQuitting = true;
    app.quit();
  });

  ipcMain.handle('app:getDeviceInfo', () => {
    let id = get(KEYS.DEVICE_ID);
    if (!id) {
      id = `dev_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      set(KEYS.DEVICE_ID, id);
    }
    return {
      id,
      name: get(KEYS.DEVICE_NAME, os.hostname()),
      platform: process.platform,
      arch: process.arch,
      hostname: os.hostname(),
      version: app.getVersion(),
    };
  });

  ipcMain.handle('app:setDeviceName', (_e, name) => {
    set(KEYS.DEVICE_NAME, String(name || '').slice(0, 64));
    return { ok: true };
  });

  ipcMain.handle('app:openLogs', async () => {
    const dir = path.join(app.getPath('userData'), 'logs');
    await shell.openPath(dir);
    return { ok: true, path: dir };
  });

  ipcMain.handle('app:openExternal', async (_e, url) => {
    if (typeof url !== 'string') return { ok: false };
    if (!/^https?:\/\//i.test(url)) return { ok: false, error: 'invalid-url' };
    await shell.openExternal(url);
    return { ok: true };
  });

  ipcMain.handle('app:getPreference', (_e, key) => {
    const prefs = get(KEYS.PREFERENCES, {}) || {};
    return prefs[key];
  });

  ipcMain.handle('app:setPreference', (_e, key, value) => {
    const prefs = get(KEYS.PREFERENCES, {}) || {};
    prefs[key] = value;
    set(KEYS.PREFERENCES, prefs);
    return { ok: true };
  });

  ipcMain.handle('app:setAuthToken', (_e, token) => {
    if (!token) {
      del(KEYS.AUTH_TOKEN);
      return { ok: true, cleared: true };
    }
    set(KEYS.AUTH_TOKEN, String(token));
    return { ok: true };
  });

  ipcMain.handle('app:getAuthToken', () => get(KEYS.AUTH_TOKEN, null));
}