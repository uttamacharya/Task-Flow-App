const Notification = require('../models/Notification');

// Create Notification
const createNotification = async (req, res) => {
  try {
    const { type, title, message, data } = req.body;
    const userId = req.user.id; // JWT middleware se aayega

    const newNotification = new Notification({ userId, type, title, message, data });
    await newNotification.save();

    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      notification: newNotification
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

//Get All Notifications for a User
const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

//Mark Notification as Read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    res.status(200).json({ success: true, message: 'Notification marked as read', notification });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

//Delete Notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    res.status(200).json({ success: true, message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { createNotification, getNotifications, markAsRead, deleteNotification };
