const express = require('express');
const { createLog, getLogs, getLogsByDate, updateLog, deleteLog } = require('../controllers/dailyLogController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, createLog);
router.get('/', authMiddleware, getLogs);
router.get('/:date', authMiddleware, getLogsByDate);
router.put('/:id', authMiddleware, updateLog);
router.delete('/:id', authMiddleware, deleteLog);

module.exports = router;
