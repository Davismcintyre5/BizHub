import Store from 'electron-store';
import { KEYS } from './keys.js';

const store = new Store({
  name: 'bizhub-config',
  encryptionKey: undefined,
  clearInvalidConfig: true,
});

export function get(key, fallback) {
  return store.get(key, fallback);
}

export function set(key, value) {
  store.set(key, value);
}

export function del(key) {
  store.delete(key);
}

export function has(key) {
  return store.has(key);
}

export function getWindowBounds() {
  return get(KEYS.WINDOW_BOUNDS, null);
}

export function setWindowBounds(bounds) {
  set(KEYS.WINDOW_BOUNDS, bounds);
}

export function isMaximized() {
  return get(KEYS.WINDOW_MAXIMIZED, false);
}

export function setMaximized(value) {
  set(KEYS.WINDOW_MAXIMIZED, !!value);
}

export default store;