const initSqlJs = require('sql.js');
const path = require('path');
const { app } = require('electron');
const axios = require('axios');
const fs = require('fs');

const dbPath = path.join(app.getPath('userData'), 'bizhub-offline.db');
let db = null;

async function getDB() {
  if (db) return db;
  
  const SQL = await initSqlJs();
  
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }
  
  db.run(`
    CREATE TABLE IF NOT EXISTS queue (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      method TEXT NOT NULL,
      url TEXT NOT NULL,
      headers TEXT,
      body TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      retries INTEGER DEFAULT 0
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS cache (
      key TEXT PRIMARY KEY,
      value TEXT,
      expires_at DATETIME
    )
  `);
  
  return db;
}

function saveDB() {
  if (!db) return;
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

async function queueAction(action) {
  const database = await getDB();
  const { method, url, headers, body } = action;
  database.run(
    'INSERT INTO queue (method, url, headers, body) VALUES (?, ?, ?, ?)',
    [method, url, JSON.stringify(headers || {}), JSON.stringify(body || {})]
  );
  saveDB();
  return { success: true, queued: true };
}

async function syncNow() {
  const database = await getDB();
  const rows = database.exec('SELECT * FROM queue ORDER BY id ASC');
  const items = rows[0]?.values || [];
  let synced = 0;
  let failed = 0;

  for (const row of items) {
    const [id, method, url, headersStr, bodyStr] = row;
    try {
      const headers = JSON.parse(headersStr);
      const body = bodyStr ? JSON.parse(bodyStr) : undefined;
      await axios({
        method,
        url,
        headers: { ...headers, 'X-Offline-Sync': 'true' },
        data: body,
      });
      database.run('DELETE FROM queue WHERE id = ?', [id]);
      synced++;
    } catch {
      database.run('UPDATE queue SET retries = retries + 1 WHERE id = ?', [id]);
      failed++;
    }
  }
  
  saveDB();
  return { synced, failed, pending: items.length - synced };
}

async function getPendingCount() {
  const database = await getDB();
  const result = database.exec('SELECT COUNT(*) as count FROM queue');
  return result[0]?.values?.[0]?.[0] || 0;
}

module.exports = { queueAction, syncNow, getPendingCount };