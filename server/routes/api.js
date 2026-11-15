import express from 'express';
import { getDB, saveDB, purgeExpiredReports } from '../db.js';

const router = express.Router();

// SSE Connected clients list
let sseClients = [];

export function broadcastEvent(eventType, data) {
  const payload = `event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`;
  sseClients.forEach(client => {
    try {
      client.res.write(payload);
    } catch (e) {
      // client disconnected
    }
  });
}

// 1. GET /api/lots - List all parking lots
router.get('/lots', (req, res) => {
  const db = getDB();
  purgeExpiredReports();
  res.json({
    success: true,
    data: db.parkingLots,
    timestamp: new Date().toISOString()
  });
});

// 2. GET /api/lots/:id - Get specific parking lot
router.get('/lots/:id', (req, res) => {
  const db = getDB();
  const lot = db.parkingLots.find(l => l.id === req.params.id);
  if (!lot) {
    return res.status(404).json({ success: false, message: 'Parking lot not found' });
  }
  res.json({ success: true, data: lot });
});

// 3. GET /api/buildings - List all campus destinations
router.get('/buildings', (req, res) => {
  const db = getDB();
  res.json({ success: true, data: db.buildings });
});

// 4. GET /api/recommend - Smart recommendation engine (Giải pháp 1 & 3)
router.get('/recommend', (req, res) => {
  const db = getDB();
  const { destination = 'b-a2', avoidLot = 'lot-a' } = req.query;

  // Filter out avoided lot and full lots
  const candidates = db.parkingLots.filter(l => l.id !== avoidLot && l.status !== 'red');

  // Score candidate lots by (walkMinutes * 1.5 + avgWaitTimeMin)
  const sorted = candidates.sort((a, b) => {
    const walkA = a.walkingInfo?.[destination]?.walkMinutes || 6;
    const waitA = a.avgWaitTimeMin || 1;
    const totalA = walkA + waitA;

    const walkB = b.walkingInfo?.[destination]?.walkMinutes || 6;
    const waitB = b.avgWaitTimeMin || 1;
    const totalB = walkB + waitB;

    return totalA - totalB;
  });

  const best = sorted[0] || candidates[0] || db.parkingLots[1];

  res.json({
    success: true,
    data: {
      recommendedLot: best,
      allAlternatives: sorted,
      destinationId: destination,
      timeSavedMin: Math.max(5, (db.parkingLots.find(l => l.id === avoidLot)?.avgWaitTimeMin || 9) - (best.avgWaitTimeMin || 1))
    }
  });
});

// 5. GET /api/reports - Get active community reports
router.get('/reports', (req, res) => {
  purgeExpiredReports();
  const db = getDB();
  res.json({
    success: true,
    data: db.reports.slice(0, 15)
  });
});

// 6. POST /api/reports - 1-Tap report submission
router.post('/reports', (req, res) => {
  const { lotId, status, statusText, tags = [], note = '', author = 'Sinh viên năng động' } = req.body;

  if (!lotId || !status) {
    return res.status(400).json({ success: false, message: 'Missing lotId or status' });
  }

  const db = getDB();
  const lot = db.parkingLots.find(l => l.id === lotId);

  if (!lot) {
    return res.status(404).json({ success: false, message: 'Lot not found' });
  }

  // Calculate new spots based on reported status
  let newSpots = lot.availableSpots;
  let newQueue = lot.queueCount;
  let newWaitMin = lot.avgWaitTimeMin;

  if (status === 'green') {
    newSpots = Math.max(lot.availableSpots, Math.floor(lot.capacity * 0.45));
    newQueue = 0;
    newWaitMin = 1;
  } else if (status === 'yellow') {
    newSpots = Math.max(4, Math.floor(lot.capacity * 0.12));
    newQueue = 3;
    newWaitMin = 3;
  } else {
    // red / jam
    newSpots = 0;
    newQueue = Math.max(12, lot.queueCount + 2);
    newWaitMin = 9;
  }

  // Update lot
  lot.status = status === 'green' ? 'green' : status === 'yellow' ? 'yellow' : 'red';
  lot.availableSpots = newSpots;
  lot.queueCount = newQueue;
  lot.avgWaitTimeMin = newWaitMin;
  lot.lastUpdated = 'Vừa xong (1-Tap)';
  lot.crowdLevelDescription = `${statusText} • Báo cáo bởi ${author}`;

  // Create new community report (10-minute expiry)
  const newReport = {
    id: `rep-${Date.now()}`,
    lotId,
    author,
    timeAgo: 'Vừa xong',
    status: lot.status,
    text: `${statusText}. ${tags.length ? tags.join(', ') : ''} ${note}`.trim(),
    textJa: `${statusText}. ${tags.length ? tags.join('、') : ''} ${note}`.trim(),
    createdAt: Date.now(),
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    upvotes: 1
  };

  db.reports.unshift(newReport);
  saveDB();

  // Broadcast real-time change to all connected SSE clients
  broadcastEvent('LOT_UPDATED', {
    lot,
    newReport
  });

  res.status(201).json({
    success: true,
    message: 'Report submitted successfully',
    data: {
      lot,
      report: newReport
    }
  });
});

// 7. GET /api/stream - Server-Sent Events (SSE) for Real-Time Synchronization
router.get('/stream', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  const clientId = Date.now();
  const newClient = { id: clientId, res };
  sseClients.push(newClient);

  // Send initial ping
  res.write(`event: CONNECTED\ndata: ${JSON.stringify({ clientId, message: 'Real-time SSE stream connected' })}\n\n`);

  // Heartbeat to keep connection open across proxies/load balancers
  const heartbeat = setInterval(() => {
    res.write(': heartbeat\n\n');
  }, 25000);

  req.on('close', () => {
    clearInterval(heartbeat);
    sseClients = sseClients.filter(c => c.id !== clientId);
  });
});

export default router;

