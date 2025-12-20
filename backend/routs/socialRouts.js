const express = require('express');
const router = express.Router();
const socialController = require('../controllers/socialController');
const authMiddleware = require('../middleware/auth');

// All social routes require authentication
router.use(authMiddleware);

// Get productivity stats
router.get('/stats', socialController.getProductivityStats);

// Share productivity report
router.post('/share', socialController.shareReport);

// Export data
router.get('/export', socialController.exportData);

module.exports = router;