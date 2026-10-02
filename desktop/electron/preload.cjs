const { contextBridge, ipcRenderer } = require('electron');

const listeners = new Map();

function on(channel, callback) {
  const handler = (_event, ...args) => callback(...args);
  ipcRenderer.on(channel, handler);
  listeners.set(callback, { channel, handler });
  return () => {
    ipcRenderer.removeListener(channel, handler);
    listeners.delete(callback);
  };
}

contextBridge.exposeInMainWorld('electron', {
  isElectron: true,
  platform: process.platform,
  versions: {
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
  },

  app: {
    getVersion: () => ipcRenderer.invoke('app:getVersion'),
    getPlatform: () => ipcRenderer.invoke('app:getPlatform'),
    isPackaged: () => ipcRenderer.invoke('app:isPackaged'),
    restart: () => ipcRenderer.invoke('app:restart'),
    quit: () => ipcRenderer.invoke('app:quit'),
    getDeviceInfo: () => ipcRenderer.invoke('app:getDeviceInfo'),
    setDeviceName: (name) => ipcRenderer.invoke('app:setDeviceName', name),
    openLogs: () => ipcRenderer.invoke('app:openLogs'),
    openExternal: (url) => ipcRenderer.invoke('app:openExternal', url),
    getPreference: (key) => ipcRenderer.invoke('app:getPreference', key),
    setPreference: (key, value) =>
      ipcRenderer.invoke('app:setPreference', key, value),
    setAuthToken: (token) => ipcRenderer.invoke('app:setAuthToken', token),
    getAuthToken: () => ipcRenderer.invoke('app:getAuthToken'),
  },

  updater: {
    getStatus: () => ipcRenderer.invoke('updater:getStatus'),
    check: () => ipcRenderer.invoke('updater:check'),
    install: () => ipcRenderer.invoke('updater:install'),
    dismiss: () => ipcRenderer.invoke('updater:dismiss'),
    setChannel: (channel) => ipcRenderer.invoke('updater:setChannel', channel),
  },

  window: {
    minimize: () => ipcRenderer.send('window:minimize'),
    maximize: () => ipcRenderer.send('window:maximize'),
    close: () => ipcRenderer.send('window:close'),
  },

  events: {
    onTraySyncNow: (cb) => on('tray:sync-now', cb),
    onTrayOpenSettings: (cb) => on('tray:open-settings', cb),
    onUpdaterChange: (cb) => on('updater:change', cb),
  },
});