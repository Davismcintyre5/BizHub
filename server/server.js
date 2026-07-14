require('./scripts/dnsSet');

const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');

const env = require('./config/env');
const connectDB = require('./config/database');
const { connectRedis, getRedisClient } = require('./config/redis');
const { configureCloudinary } = require('./config/cloudinary');
const { initSocket } = require('./config/socket');

const errorHandler = require('./middleware/global/errorHandler');
const maintenance = require('./middleware/global/maintenance');
const { generalLimiter } = require('./middleware/global/rateLimiter');

const startSchedulers = require('./schedulers/index');
const logger = require('./utils/logger');
const { sendSuccess } = require('./utils/response');

const app = express();
const server = http.createServer(app);

const c = {
  reset: '\x1b[0m', bright: '\x1b[1m', dim: '\x1b[2m',
  red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m',
  blue: '\x1b[34m', cyan: '\x1b[36m', white: '\x1b[37m',
  bgBlue: '\x1b[44m', bgGreen: '\x1b[42m', bgRed: '\x1b[41m',
};

const icon = {
  success: '✅', error: '❌', info: 'ℹ️', db: '🗄️',
  redis: '🔴', server: '🚀', cloud: '☁️', key: '🔑',
  socket: '🔌', disabled: '⛔', maintenance: '🔧', clock: '⏰',
};

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGINS, credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(mongoSanitize());
app.use(generalLimiter);
app.use(maintenance);

if (env.isDevelopment()) app.use(morgan('dev'));
else app.use(morgan('combined'));

app.get('/', (req, res) => sendSuccess(res, { name: env.APP_NAME, version: env.APP_VERSION, environment: env.NODE_ENV, timezone: env.APP_TIMEZONE, timestamp: new Date().toISOString() }, `${env.APP_NAME} is running`));

app.get('/api', (req, res) => sendSuccess(res, { name: env.APP_NAME, version: env.APP_VERSION, description: env.APP_DESCRIPTION, prefix: env.API_PREFIX, time: new Date().toISOString() }, 'API Information'));

app.get('/health', async (req, res) => {
  const health = { uptime: process.uptime(), timestamp: new Date().toISOString(), status: 'healthy', services: { server: 'up', database: 'unknown', redis: env.REDIS_ENABLED ? 'unknown' : 'disabled' } };
  try { const mongoose = require('mongoose'); health.services.database = mongoose.connection.readyState === 1 ? 'up' : 'down'; } catch { health.services.database = 'down'; }
  if (env.REDIS_ENABLED) { try { const redis = getRedisClient(); health.services.redis = redis?.status === 'ready' ? 'up' : 'down'; } catch { health.services.redis = 'down'; } }
  const allUp = Object.values(health.services).every(s => s === 'up' || s === 'disabled');
  health.status = allUp ? 'healthy' : 'degraded';
  res.status(allUp ? 200 : 503).json({ success: allUp, data: health });
});

app.use(env.API_PREFIX, require('./routes/index'));

app.use((req, res) => res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}`, error: 'NOT_FOUND' }));
app.use(errorHandler);

const start = async () => {
  try {
    console.log('');
    console.log(`${c.bgBlue}${c.bright}${c.white}  ╔══════════════════════════════════════════╗  ${c.reset}`);
    console.log(`${c.bgBlue}${c.bright}${c.white}  ║        BIZHUB SERVER v${env.APP_VERSION}                ║  ${c.reset}`);
    console.log(`${c.bgBlue}${c.bright}${c.white}  ╚══════════════════════════════════════════╝  ${c.reset}`);
    console.log('');
    console.log(`${c.cyan}${icon.info} Environment: ${c.bright}${env.NODE_ENV.toUpperCase()}${c.reset}`);

    const dbConn = await connectDB();
    console.log(`${c.green}${icon.db} MongoDB:    ${c.bright}Connected${c.reset} ${c.dim}→ ${dbConn.connection.host}/${dbConn.connection.name}${c.reset}`);

    if (env.REDIS_ENABLED) {
      const redis = connectRedis();
      if (redis) {
        try { await redis.ping(); console.log(`${c.green}${icon.redis} Redis:      ${c.bright}Connected${c.reset} ${c.dim}→ ${env.REDIS_URL}${c.reset}`); }
        catch { console.log(`${c.yellow}${icon.redis} Redis:      ${c.bright}Connecting...${c.reset}`); }
      }
    } else console.log(`${c.dim}${icon.disabled} Redis:      Disabled${c.reset}`);

    if (env.STORAGE_PROVIDER === 'cloudinary') { configureCloudinary(); console.log(`${c.green}${icon.cloud} Storage:    ${c.bright}Cloudinary${c.reset}`); }
    else console.log(`${c.dim}${icon.cloud} Storage:    Local${c.reset}`);

    console.log(`${c.dim}${icon.key} JWT:        ${env.JWT_ACCESS_EXPIRES_IN} / ${env.JWT_REFRESH_EXPIRES_IN}${c.reset}`);

    startSchedulers();
    console.log(`${c.green}${icon.clock} Schedulers: Started${c.reset}`);

    initSocket(server);
    console.log(`${c.green}${icon.socket} Socket.io:  Ready${c.reset}`);

    server.listen(env.PORT, env.HOST, () => {
      console.log('');
      console.log(`${c.bgGreen}${c.bright}${c.white}  ╔══════════════════════════════════════════╗  ${c.reset}`);
      console.log(`${c.bgGreen}${c.bright}${c.white}  ║  ${icon.server} Server ready on http://${env.HOST}:${env.PORT}        ║  ${c.reset}`);
      console.log(`${c.bgGreen}${c.bright}${c.white}  ╚══════════════════════════════════════════╝  ${c.reset}`);
      console.log('');
      console.log(`  ${c.cyan}API:${c.reset}      ${c.bright}http://${env.HOST}:${env.PORT}${env.API_PREFIX}${c.reset}`);
      console.log(`  ${c.cyan}Health:${c.reset}   ${c.bright}http://${env.HOST}:${env.PORT}/health${c.reset}`);
      console.log(`  ${c.cyan}Mode:${c.reset}     ${c.yellow}${env.NODE_ENV.toUpperCase()}${c.reset}`);
      console.log('');
    });
  } catch (error) {
    console.log(`\n${c.bgRed}${c.bright}${c.white}  ❌ Failed to start server  ${c.reset}`);
    console.log(`${c.red}${error.message}${c.reset}\n`);
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

const gracefulShutdown = async (signal) => {
  console.log(`\n${c.yellow}${c.bright}${signal} received. Shutting down...${c.reset}`);
  server.close(async () => {
    console.log(`${c.dim}HTTP server closed${c.reset}`);
    try {
      const mongoose = require('mongoose'); await mongoose.connection.close();
      console.log(`${c.dim}MongoDB connection closed${c.reset}`);
      if (env.REDIS_ENABLED) { const redis = getRedisClient(); if (redis) { await redis.quit(); console.log(`${c.dim}Redis connection closed${c.reset}`); } }
      console.log(`${c.green}${icon.success} All connections closed. Goodbye!${c.reset}\n`);
      process.exit(0);
    } catch (err) { console.log(`${c.red}${icon.error} Error: ${err.message}${c.reset}`); process.exit(1); }
  });
  setTimeout(() => { console.log(`${c.red}${icon.error} Forced shutdown${c.reset}`); process.exit(1); }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('uncaughtException', (error) => { console.log(`${c.red}${icon.error} Uncaught: ${error.message}${c.reset}`); logger.error('Uncaught Exception:', error); gracefulShutdown('UNCAUGHT_EXCEPTION'); });
process.on('unhandledRejection', (reason) => logger.error('Unhandled Rejection:', reason));

start();
module.exports = app;