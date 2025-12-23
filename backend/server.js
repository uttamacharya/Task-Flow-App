const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
require('dotenv').config();
// const aiRoutes = require("./routs/AIRoutes");

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routers
const authRoutes= require('./routs/authRoutes');
const taskRoutes= require('./routs/taskRoutes');
// const sectionRoutes = require('./routs/sectionRoutes');
const dailyLogRoutes=require('./routs/dailyLogRoutes');
const notificationRoutes=require('./routs/notificationRoutes');
const settingsRoutes=require('./routs/settingRoutes');
const socialRoutes = require('./routs/socialRouts');
// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
// app.use('/api/sections', sectionRoutes);
app.use('/api/logs', dailyLogRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/social',socialRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// app.use("/api/ai", aiRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
