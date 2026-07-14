const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');
const env = require('../config/env');

// ============================================
// Winston Logger
// ============================================

const transports = [];

// Console transport
if (env.LOG_TO_CONSOLE) {
  transports.push(
    new winston.transports.Console({
      level: env.LOG_LEVEL,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
          return `${timestamp} [${level}]: ${message} ${metaStr}`;
        })
      ),
    })
  );
}

// File transport
if (env.LOG_TO_FILE) {
  transports.push(
    new winston.transports.DailyRotateFile({
      level: env.LOG_LEVEL,
      dirname: env.LOG_FILE_PATH || './logs',
      filename: 'bizhub-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: `${env.LOG_MAX_FILE_SIZE_MB}m`,
      maxFiles: env.LOG_MAX_FILES,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    })
  );
}

const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  transports,
  exitOnError: false,
});

module.exports = logger;