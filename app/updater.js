const initializeUpdater = win => {
  const log = require('electron-log');
  const { autoUpdater } = require('electron-updater');

  autoUpdater.logger = log;
  autoUpdater.logger.transports.file.level = 'info';
  log.info('App starting...');

  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
  });
  autoUpdater.on('update-available', info => {
    sendStatusToWindow('Update available.');
  });
  autoUpdater.on('update-not-available', info => {
    sendStatusToWindow('Update not available.');
  });
  autoUpdater.on('error', err => {
    sendStatusToWindow('Error in auto-updater. ' + err);
  });
  autoUpdater.on('download-progress', progressObj => {
    let log_message = 'Download speed: ' + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message =
      log_message +
      ' (' +
      progressObj.transferred +
      '/' +
      progressObj.total +
      ')';
    sendStatusToWindow(log_message);
  });
  autoUpdater.on('update-downloaded', info => {
    sendStatusToWindow('Update downloaded');
  });

  function sendStatusToWindow(text) {
    log.info(text);
    win.webContents.send('message', text);
  }

  return autoUpdater;
};

module.exports = initializeUpdater;
