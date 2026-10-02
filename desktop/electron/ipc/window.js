import { ipcMain, BrowserWindow } from 'electron';

function getWin(event) {
  return BrowserWindow.fromWebContents(event.sender);
}

export function registerWindowIpc() {
  ipcMain.on('window:minimize', (event) => {
    getWin(event)?.minimize();
  });

  ipcMain.on('window:maximize', (event) => {
    const win = getWin(event);
    if (!win) return;
    if (win.isMaximized()) win.unmaximize();
    else win.maximize();
  });

  ipcMain.on('window:close', (event) => {
    getWin(event)?.close();
  });
}