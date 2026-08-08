const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // App info
  getVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // Window controls
  toggleMaximize: () => ipcRenderer.invoke('toggle-maximize'),
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
  
  // Database operations
  db: {
    execute: (sql, params) => ipcRenderer.invoke('db-execute', sql, params),
    query: (sql, params) => ipcRenderer.invoke('db-query', sql, params),
    getAll: (sql, params) => ipcRenderer.invoke('db-get-all', sql, params),
  },
  
  // Offline queue
  offlineQueue: {
    add: (action) => ipcRenderer.invoke('offline-queue-add', action),
    getAll: () => ipcRenderer.invoke('offline-queue-get-all'),
    remove: (id) => ipcRenderer.invoke('offline-queue-remove', id),
    process: () => ipcRenderer.invoke('offline-queue-process'),
    getStatus: () => ipcRenderer.invoke('offline-queue-status'),
  },
  
  // Updates
  updates: {
    checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
    downloadUpdate: () => ipcRenderer.invoke('download-update'),
    installUpdate: () => ipcRenderer.invoke('install-update'),
  },
  
  // Events
  on: (channel, callback) => {
    const validChannels = ['update-available', 'update-downloaded', 'update-error', 'download-progress', 'offline-status', 'sync-complete'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    }
  },
  
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  }
});