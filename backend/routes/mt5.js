const express = require('express');
const {
  linkMT5Account,
  getMT5Status,
  unlinkMT5Account,
  toggleSync,
  syncTrades,
  manualSync,
  getBrokers
} = require('../controllers/mt5');

const router = express.Router();
const { protect } = require('../middleware/auth');

// Public route to get brokers list
router.get('/brokers', getBrokers);

// All routes below are protected except sync-trades (which uses API key)
router.post('/link', protect, linkMT5Account);
router.get('/status', protect, getMT5Status);
router.delete('/unlink', protect, unlinkMT5Account);
router.put('/sync', protect, toggleSync);
router.post('/manual-sync', protect, manualSync);

// Sync trades endpoint (can be called by MQL5 EA with API key)
router.post('/sync-trades', syncTrades);

module.exports = router;


