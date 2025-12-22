const DailyLog = require('../models/DailyLog');

const createLog = async (req, res) => {
  try {
    const { taskId, duration, rating, comments } = req.body;
    const userId = req.user.id; // JWT middleware se aayega

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newLog = new DailyLog({ userId, taskId, duration, rating, comments, date: today });
    await newLog.save();
    console.log("Saved log:", newLog);

    res.status(201).json({
      success: true,
      message: 'Daily log created successfully',
      log: newLog
    });
  } catch (err) {
    console.log(" ERROR STACK:", err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
const createLogForTask = async (req, res) => {
  try {
    const { taskId } = req.params;      //  URL se
    const { duration, rating, comments } = req.body;
    const userId = req.user.id;          //  JWT se

    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required"
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newLog = new DailyLog({
      userId,
      taskId,
      duration,
      rating,
      comments,
      date: today
    });

    await newLog.save();

    res.status(201).json({
      success: true,
      message: "Daily log created",
      log: newLog
    });

  } catch (err) {
    console.error("🔥 Create log error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};


const getLogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const { taskId } = req.query;  //taskId=
    const logs = await DailyLog.find({
      userId,
      taskId
    }).sort({ date: -1 });

    res.status(200).json({ success: true, logs });
  } catch (err) {
    console.log("ERROR STACK:", err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get logs for a specific task
const getLogsByTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const logs = await DailyLog.find({ taskId: taskId }).sort({ createdAt: -1 });

    res.status(200).json({ logs });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getLogsByDate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date } = req.params; // format: YYYY-MM-DD
    const logs = await DailyLog.find({
      userId,
      date: { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) }
    }).populate('taskId', 'name');

    res.status(200).json({ success: true, logs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
//  Update Log
const updateLog = async (req, res) => {
  try {
    const log = await DailyLog.findById(req.params.id);

    if (!log) {
      return res.status(404).json({
        success: false,
        message: 'Log not found'
      });
    }

    //  HISTORY LOCK LOGIC
    const logDate = new Date(log.date).toDateString();
    const today = new Date().toDateString();

    if (logDate !== today) {
      return res.status(403).json({
        success: false,
        message: 'Past logs cannot be edited'
      });
    }

    // Same day hai to update allow
    log.comments = req.body.comments ?? log.comments;
    log.duration = req.body.duration ?? log.duration;
    log.rating = req.body.rating ?? log.rating;

    await log.save();

    res.status(200).json({
      success: true,
      message: 'Log updated',
      log
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
const deleteLog = async (req, res) => {
  try {
    const log = await DailyLog.findById(req.params.id);

    if (!log) {
      return res.status(404).json({
        success: false,
        message: 'Log not found'
      });
    }

    const logDate = new Date(log.date).toDateString();
    const today = new Date().toDateString();

    if (logDate !== today) {
      return res.status(403).json({
        success: false,
        message: 'Past logs cannot be deleted'
      });
    }

    await log.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Log deleted'
    });

  } catch (err) {
    console.log(" ERROR STACK:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
module.exports = {
  createLog,
  createLogForTask, //this
  getLogs,
  getLogsByDate,
  getLogsByTask,  //  add this
  updateLog,
  deleteLog
};

