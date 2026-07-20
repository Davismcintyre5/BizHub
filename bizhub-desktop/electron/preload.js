const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Printer
  printReceipt: (data) => ipcRenderer.invoke('print-receipt', data),
  printInvoice: (data) => ipcRenderer.invoke('print-invoice', data),
  getPrinters: () => ipcRenderer.invoke('get-printers'),

  // Storage
  storeGet: (key) => ipcRenderer.invoke('store-get', key),
  storeSet: (key, value) => ipcRenderer.invoke('store-set', key, value),
  storeDelete: (key) => ipcRenderer.invoke('store-delete', key),

  // Offline
  queueAction: (action) => ipcRenderer.invoke('offline-queue', action),
  syncNow: () => ipcRenderer.invoke('offline-sync'),
  getPendingCount: () => ipcRenderer.invoke('offline-pending'),

  // Notifications
  notify: (title, body) => ipcRenderer.invoke('notify', title, body),

  // App
  getVersion: () => ipcRenderer.invoke('get-version'),
  checkUpdate: () => ipcRenderer.invoke('check-update'),
  restartApp: () => ipcRenderer.invoke('restart-app'),

  // Window
  minimizeWindow: () => ipcRenderer.invoke('window-minimize'),
  maximizeWindow: () => ipcRenderer.invoke('window-maximize'),
  closeWindow: () => ipcRenderer.invoke('window-close'),
  isMaximized: () => ipcRenderer.invoke('window-is-maximized'),

  // Network
  isOnline: () => ipcRenderer.invoke('get-online-status'),
  onOnlineChange: (callback) => {
    ipcRenderer.on('online-status-changed', (_, status) => callback(status));
  },

  // Platform
  platform: process.platform,
});