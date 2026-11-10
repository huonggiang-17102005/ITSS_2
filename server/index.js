import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';
import { initDB, purgeExpiredReports } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, '..', 'dist');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database
initDB();

// Periodically clean up expired 10-min reports
setInterval(() => {
  purgeExpiredReports();
}, 30000);

// Middlewares
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  if (req.path !== '/api/stream') {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
  }
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'campus-smart-parking-backend', timestamp: new Date() });
});

// Mount API routes
app.use('/api', apiRouter);

// Serve frontend static files if built
app.use(express.static(DIST_DIR));

// Fallback for SPA (Compatible with Express 5)
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  const indexPath = path.join(DIST_DIR, 'index.html');
  res.sendFile(indexPath);
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log('==================================================');
  console.log(`🚀 SmartPark Campus Backend is running!`);
  console.log(`📡 Local:   http://localhost:${PORT}`);
  console.log(`🩺 Health:  http://localhost:${PORT}/health`);
  console.log(`🔌 API:     http://localhost:${PORT}/api/lots`);
  console.log('==================================================');
});
