const { Tray, Menu, app, nativeImage } = require('electron');
const path = require('path');

let tray = null;

function initTray(mainWindow) {
  const iconPath = path.join(__dirname, '../assets/tray-icon.png');
  tray = new Tray(nativeImage.createFromPath(iconPath));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show BizHub',
      click: () => {
        mainWindow.show();
        mainWindow.focus();
      },
    },
    { type: 'separator' },
    {
      label: 'Sync Offline Data',
      click: () => {
        mainWindow.webContents.send('sync-offline');
      },
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.isQuitting = true;
        app.quit();
      },
    },
  ]);

  tray.setToolTip('BizHub');
  tray.setContextMenu(contextMenu);

  tray.on('double-click', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  return tray;
}

module.exports = { initTray };