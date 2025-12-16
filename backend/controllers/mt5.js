const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Trade = require('../models/Trade');
const { getAllServers, getBrokers } = require('../data/mt5Brokers');

// Encryption key from environment (should be 64 hex characters for AES-256)
// If not set, use JWT_SECRET padded/truncated to 64 chars, or generate a fixed one
let ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
if (!ENCRYPTION_KEY) {
  // Use JWT_SECRET if available, otherwise use a default (should be set in production)
  const baseKey = process.env.JWT_SECRET || 'default-encryption-key-change-in-production';
  // Pad or truncate to 64 hex characters (32 bytes)
  ENCRYPTION_KEY = crypto.createHash('sha256').update(baseKey).digest('hex');
}
const ALGORITHM = 'aes-256-cbc';

// Helper function to encrypt sensitive data
function encrypt(text) {
  if (!text) return null;
  try {
    const iv = crypto.randomBytes(16);
    // Ensure key is exactly 32 bytes (64 hex chars)
    const keyBuffer = Buffer.from(ENCRYPTION_KEY.slice(0, 64), 'hex');
    if (keyBuffer.length !== 32) {
      throw new Error('Invalid encryption key length');
    }
    const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

// Helper function to decrypt sensitive data
function decrypt(text) {
  if (!text) return null;
  try {
    const parts = text.split(':');
    if (parts.length < 2) {
      throw new Error('Invalid encrypted data format');
    }
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = parts.join(':');
    // Ensure key is exactly 32 bytes (64 hex chars)
    const keyBuffer = Buffer.from(ENCRYPTION_KEY.slice(0, 64), 'hex');
    if (keyBuffer.length !== 32) {
      throw new Error('Invalid encryption key length');
    }
    const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    // Return null instead of throwing to prevent crashes on corrupted data
    return null;
  }
}

// @desc    Link MT5 account
// @route   POST /api/v1/mt5/link
// @access  Private
exports.linkMT5Account = asyncHandler(async (req, res, next) => {
  const { accountNumber, server, password } = req.body;

  if (!accountNumber || !server || !password) {
    return next(new ErrorResponse('Please provide account number, server, and password', 400));
  }

  const user = await User.findById(req.user.id);

  // Encrypt sensitive data
  user.mt5Account = {
    accountNumber: encrypt(accountNumber.toString()),
    server: encrypt(server),
    password: encrypt(password),
    isLinked: true,
    lastSync: null,
    syncEnabled: false
  };

  await user.save();

  res.status(200).json({
    success: true,
    data: {
      isLinked: true,
      accountNumber: accountNumber.toString().slice(0, -4) + '****', // Show only last 4 digits
      server: server
    }
  });
});

// @desc    Get MT5 account status
// @route   GET /api/v1/mt5/status
// @access  Private
exports.getMT5Status = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user.mt5Account || !user.mt5Account.isLinked) {
    return res.status(200).json({
      success: true,
      data: {
        isLinked: false
      }
    });
  }

  // Decrypt account number for display (last 4 digits only)
  let maskedAccount = '****';
  if (user.mt5Account.accountNumber) {
    try {
      const decrypted = decrypt(user.mt5Account.accountNumber);
      if (decrypted && decrypted.length > 4) {
        maskedAccount = decrypted.slice(0, -4) + '****';
      }
    } catch (e) {
      // If decryption fails, just show masked
      console.error('Error decrypting account number:', e);
    }
  }

  // Decrypt server name
  let serverName = null;
  if (user.mt5Account.server) {
    try {
      serverName = decrypt(user.mt5Account.server);
    } catch (e) {
      console.error('Error decrypting server:', e);
      serverName = '****';
    }
  }

  res.status(200).json({
    success: true,
    data: {
      isLinked: true,
      accountNumber: maskedAccount,
      server: serverName,
      lastSync: user.mt5Account.lastSync,
      syncEnabled: user.mt5Account.syncEnabled || false
    }
  });
});

// @desc    Unlink MT5 account
// @route   DELETE /api/v1/mt5/unlink
// @access  Private
exports.unlinkMT5Account = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  user.mt5Account = {
    accountNumber: null,
    server: null,
    password: null,
    isLinked: false,
    lastSync: null,
    syncEnabled: false
  };

  await user.save();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Toggle sync enabled
// @route   PUT /api/v1/mt5/sync
// @access  Private
exports.toggleSync = asyncHandler(async (req, res, next) => {
  const { enabled } = req.body;

  const user = await User.findById(req.user.id);

  if (!user.mt5Account || !user.mt5Account.isLinked) {
    return next(new ErrorResponse('MT5 account not linked', 400));
  }

  user.mt5Account.syncEnabled = enabled === true || enabled === 'true';

  await user.save();

  res.status(200).json({
    success: true,
    data: {
      syncEnabled: user.mt5Account.syncEnabled
    }
  });
});

// @desc    Sync trades from MT5 (webhook endpoint for MQL5 EA)
// @route   POST /api/v1/mt5/sync-trades
// @access  Private (requires API key or token)
exports.syncTrades = asyncHandler(async (req, res, next) => {
  const { trades, apiKey } = req.body;

  // Simple API key validation (you should use a more secure method)
  if (apiKey !== process.env.MT5_API_KEY) {
    return next(new ErrorResponse('Invalid API key', 401));
  }

  if (!trades || !Array.isArray(trades)) {
    return next(new ErrorResponse('Invalid trades data', 400));
  }

  // Find user by account number (from trades data)
  // This assumes trades include accountNumber
  const accountNumber = trades[0]?.accountNumber;
  if (!accountNumber) {
    return next(new ErrorResponse('Account number not found in trades', 400));
  }

  // Find user with matching MT5 account
  const users = await User.find({ 'mt5Account.isLinked': true });
  let targetUser = null;

  for (const user of users) {
    if (user.mt5Account && user.mt5Account.accountNumber) {
      try {
        const decrypted = decrypt(user.mt5Account.accountNumber);
        if (decrypted && decrypted === accountNumber.toString()) {
          targetUser = user;
          break;
        }
      } catch (e) {
        console.error('Error decrypting account number in sync:', e);
        continue;
      }
    }
  }

  if (!targetUser) {
    return next(new ErrorResponse('User not found for this MT5 account', 404));
  }

  // Process and save trades
  const savedTrades = [];
  const errors = [];

  for (const mt5Trade of trades) {
    try {
      // Map MT5 trade format to our Trade model
      const tradeData = {
        user: targetUser._id,
        symbol: mt5Trade.symbol || mt5Trade.instrument,
        tradeType: mt5Trade.type === 'buy' || mt5Trade.type === 0 ? 'LONG' : 'SHORT',
        entryPrice: mt5Trade.openPrice || mt5Trade.priceOpen,
        exitPrice: mt5Trade.closePrice || mt5Trade.priceClose,
        quantity: mt5Trade.volume || mt5Trade.lots,
        entryDate: mt5Trade.openTime ? new Date(mt5Trade.openTime) : new Date(),
        exitDate: mt5Trade.closeTime ? new Date(mt5Trade.closeTime) : null,
        profitLoss: mt5Trade.profit || mt5Trade.profitLoss || 0,
        status: mt5Trade.closeTime ? 'closed' : 'open',
        notes: `Synced from MT5 - Ticket: ${mt5Trade.ticket || mt5Trade.order}`
      };

      // Check if trade already exists (by ticket/order number)
      const existingTrade = await Trade.findOne({
        user: targetUser._id,
        'notes': { $regex: `Ticket: ${mt5Trade.ticket || mt5Trade.order}` }
      });

      if (!existingTrade) {
        const trade = await Trade.create(tradeData);
        savedTrades.push(trade);
      }
    } catch (error) {
      errors.push({ trade: mt5Trade, error: error.message });
    }
  }

  // Update last sync time
  targetUser.mt5Account.lastSync = new Date();
  await targetUser.save();

  res.status(200).json({
    success: true,
    data: {
      saved: savedTrades.length,
      errors: errors.length,
      trades: savedTrades,
      errors: errors
    }
  });
});

// @desc    Manual sync trigger (for testing)
// @route   POST /api/v1/mt5/manual-sync
// @access  Private
exports.manualSync = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user.mt5Account || !user.mt5Account.isLinked) {
    return next(new ErrorResponse('MT5 account not linked', 400));
  }

  // This endpoint is for manual sync trigger
  // In a real implementation, you would:
  // 1. Connect to MT5 API using the stored credentials
  // 2. Fetch trades
  // 3. Process and save them

  // For now, return instructions
  res.status(200).json({
    success: true,
    message: 'Manual sync triggered. Please use the MQL5 Expert Advisor to sync trades.',
    data: {
      instructions: 'To sync trades automatically, install the MQL5 Expert Advisor in your MT5 terminal. The EA will send trades to this API endpoint.'
    }
  });
});

// @desc    Get list of MT5 brokers and servers
// @route   GET /api/v1/mt5/brokers
// @access  Public
exports.getBrokers = asyncHandler(async (req, res, next) => {
  const brokers = getBrokers();
  const allServers = getAllServers();

  res.status(200).json({
    success: true,
    data: {
      brokers: brokers,
      servers: allServers
    }
  });
});


