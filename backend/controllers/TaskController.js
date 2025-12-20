const Task = require('../models/Task');

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const userId = req.user.id; // assume JWT middleware se user id mil rahi hai

    const newTask = new Task({ userId, title, description, status, priority });
    await newTask.save();

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task: newTask
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get all tasks of a user
const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ userId });
    res.status(200).json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, message: 'Task updated', task });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
