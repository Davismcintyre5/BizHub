import log from 'electron-log/main.js';
import path from 'node:path';
import { app } from 'electron';

log.transports.file.level = 'info';
log.transports.console.level = 'debug';
log.transports.file.maxSize = 5 * 1024 * 1024;

log.transports.file.resolvePathFn = () => {
  const dir = app.getPath('userData');
  return path.join(dir, 'logs', 'main.log');
};

export function createLogger(scope) {
  return log.scope(scope);
}

export default log;