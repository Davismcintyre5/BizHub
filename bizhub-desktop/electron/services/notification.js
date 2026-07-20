const { Notification } = require('electron');

function show(title, body) {
  if (!Notification.isSupported()) return { success: false, error: 'Notifications not supported' };

  const notification = new Notification({
    title,
    body,
    icon: require('path').join(__dirname, '../../assets/icon.png'),
    silent: false,
  });

  notification.show();
  notification.on('click', () => {
    const win = require('electron').BrowserWindow.getAllWindows()[0];
    if (win) {
      win.show();
      win.focus();
    }
  });

  return { success: true };
}

module.exports = { show };