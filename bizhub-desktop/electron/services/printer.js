const { app } = require('electron');

async function printReceipt(data) {
  try {
    const { content, printerName } = data;
    const win = require('electron').BrowserWindow.getAllWindows()[0];
    
    if (!win) return { success: false, error: 'No window available' };

    const result = await win.webContents.print({
      silent: true,
      printBackground: false,
      deviceName: printerName || '',
      margins: { marginType: 'none' },
      pageSize: { width: 80000, height: 200000 }, // 80mm thermal
    });

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function printInvoice(data) {
  try {
    const win = require('electron').BrowserWindow.getAllWindows()[0];
    if (!win) return { success: false, error: 'No window available' };

    const result = await win.webContents.print({
      silent: true,
      printBackground: true,
      margins: { marginType: 'custom', top: 10, bottom: 10, left: 10, right: 10 },
      pageSize: 'A4',
    });

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function getPrinters() {
  const win = require('electron').BrowserWindow.getAllWindows()[0];
  if (!win) return [];
  return win.webContents.getPrintersAsync();
}

module.exports = { printReceipt, printInvoice, getPrinters };