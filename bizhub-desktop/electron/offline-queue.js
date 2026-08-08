import { getDatabase, saveDatabase } from './database.js';

let isOnline = true;
let processingQueue = false;

export function initOfflineQueue() {
  // Monitor online status
  setInterval(checkOnlineStatus, 30000); // Every 30 seconds
  checkOnlineStatus();
}

async function checkOnlineStatus() {
  try {
    const online = await fetch('https://bizhubserver.pxxl.click/api/v1/public/health', {
      method: 'HEAD',
      cache: 'no-cache'
    });
    
    if (online.ok && !isOnline) {
      isOnline = true;
      processQueue();
    }
    isOnline = online.ok;
  } catch {
    isOnline = false;
  }
}

async function processQueue() {
  if (processingQueue) return;
  processingQueue = true;
  
  const db = getDatabase();
  if (!db) return;
  
  try {
    const stmt = db.prepare('SELECT * FROM cached_requests ORDER BY timestamp ASC LIMIT 10');
    const items = [];
    while (stmt.step()) {
      items.push(stmt.getAsObject());
    }
    stmt.free();
    
    for (const item of items) {
      try {
        const response = await fetch(item.url, {
          method: item.method,
          headers: { 'Content-Type': 'application/json' },
          body: item.method !== 'GET' ? item.data : undefined
        });
        
        if (response.ok) {
          db.run('DELETE FROM cached_requests WHERE id = ?', [item.id]);
        }
      } catch (error) {
        console.error('Failed to process queue item:', error);
        break;
      }
    }
    
    saveDatabase();
  } catch (error) {
    console.error('Queue processing error:', error);
  } finally {
    processingQueue = false;
  }
}

export function addToQueue(url, method, data) {
  const db = getDatabase();
  if (!db) return false;
  
  db.run('INSERT INTO cached_requests (url, method, data) VALUES (?, ?, ?)', 
    [url, method, JSON.stringify(data)]);
  saveDatabase();
  
  if (isOnline) {
    processQueue();
  }
  
  return true;
}

export function registerOfflineHandlers(ipcMain) {
  ipcMain.handle('offline-queue-add', (event, action) => {
    addToQueue(action.url, action.method, action.data);
    return { success: true };
  });
  
  ipcMain.handle('offline-queue-get-all', () => {
    const db = getDatabase();
    if (!db) return [];
    
    const stmt = db.prepare('SELECT * FROM cached_requests ORDER BY timestamp ASC');
    const items = [];
    while (stmt.step()) {
      items.push(stmt.getAsObject());
    }
    stmt.free();
    return items;
  });
  
  ipcMain.handle('offline-queue-remove', (event, id) => {
    const db = getDatabase();
    db.run('DELETE FROM cached_requests WHERE id = ?', [id]);
    saveDatabase();
    return { success: true };
  });
  
  ipcMain.handle('offline-queue-process', () => {
    processQueue();
    return { success: true };
  });
  
  ipcMain.handle('offline-queue-status', () => {
    return { isOnline, processing: processingQueue };
  });
}