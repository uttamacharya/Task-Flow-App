const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,  // 👈 add this
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.get('/:id', authMiddleware, getTaskById); // now works
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
