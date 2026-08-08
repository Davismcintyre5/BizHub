import initSqlJs from 'sql.js';
import path from 'path';
import { app } from 'electron';
import fs from 'fs';

let db = null;
const DB_PATH = path.join(app.getPath('userData'), 'bizhub.db');

export async function initDatabase() {
  const SQL = await initSqlJs();
  
  // Load existing or create new
  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }
  
  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS offline_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE,
      value TEXT,
      synced INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS cached_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT,
      method TEXT,
      data TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS user_preferences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE,
      value TEXT
    )
  `);
  
  saveDatabase();
  return db;
}

export function getDatabase() {
  return db;
}

export function saveDatabase() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  }
}

// IPC Handlers for database
export function registerDatabaseHandlers(ipcMain) {
  ipcMain.handle('db-execute', (event, sql, params = []) => {
    try {
      db.run(sql, params);
      saveDatabase();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  
  ipcMain.handle('db-query', (event, sql, params = []) => {
    try {
      const result = db.exec(sql, params);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  
  ipcMain.handle('db-get-all', (event, sql, params = []) => {
    try {
      const stmt = db.prepare(sql);
      if (params.length) stmt.bind(params);
      
      const rows = [];
      while (stmt.step()) {
        rows.push(stmt.getAsObject());
      }
      stmt.free();
      return { success: true, data: rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
}