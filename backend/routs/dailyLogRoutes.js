const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
    createLog,
    createLogForTask,
    getLogs,
    getLogsByDate,
    getLogsByTask,
    updateLog,
    deleteLog
} = require('../controllers/dailyLogController');

const router = express.Router();

// Task-specific logs route should be first
router.get('/tasks/:taskId/logs', authMiddleware, getLogsByTask);
router.post(
    '/tasks/:taskId/logs',
    authMiddleware,
    createLogForTask
);

router.post('/', authMiddleware, createLog);
router.get('/', authMiddleware, getLogs);
router.get('/:date', authMiddleware, getLogsByDate);
router.put('/:id', authMiddleware, updateLog);
router.delete('/:id', authMiddleware, deleteLog);

module.exports = router;
