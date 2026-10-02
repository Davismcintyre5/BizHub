import { registerAppIpc } from './app.js';
import { registerUpdaterIpc } from './updater.js';
import { registerWindowIpc } from './window.js';

export function registerAllIpc() {
  registerAppIpc();
  registerUpdaterIpc();
  registerWindowIpc();
}