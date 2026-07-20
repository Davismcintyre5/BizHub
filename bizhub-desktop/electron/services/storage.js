const Store = require('electron-store');

const store = new Store({
  encryptionKey: 'bizhub-desktop-encryption-key-2026',
  name: 'bizhub-data',
});

function get(key) {
  return store.get(key);
}

function set(key, value) {
  store.set(key, value);
  return true;
}

function deleteKey(key) {
  store.delete(key);
  return true;
}

module.exports = { get, set, delete: deleteKey };