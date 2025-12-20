const express = require('express');
const { getSettings, updateSettings, resetSettings } = require('../controllers/settingController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, getSettings);
router.put('/', authMiddleware, updateSettings);
router.put('/reset', authMiddleware, resetSettings);

module.exports = router;
