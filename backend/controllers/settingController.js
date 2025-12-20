const UserSettings = require('../models/UserSetting');

// ✅ Get user settings
const getSettings = async (req, res) => {
  try {
    const userId = req.user.id; // JWT middleware se aayega
    const settings = await UserSettings.findOne({ userId });

    if (!settings) {
      return res.status(404).json({ success: false, message: 'Settings not found' });
    }

    res.status(200).json({ success: true, settings });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// ✅ Update user settings
const updateSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    // updatedAt ko automatically refresh karna
    updates.updatedAt = Date.now();

    const settings = await UserSettings.findOneAndUpdate(
      { userId },
      updates,
      { new: true, upsert: true } // agar settings na ho to create kar de
    );

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      settings
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// ✅ Reset settings (optional feature)
const resetSettings = async (req, res) => {
  try {
    const userId = req.user.id;

    const defaultSettings = {
      theme: 'light',
      notifications: {
        email: { taskReminders: true, dailySummary: true },
        push: { taskReminders: true }
      },
      updatedAt: Date.now()
    };

    const settings = await UserSettings.findOneAndUpdate(
      { userId },
      defaultSettings,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Settings reset to default',
      settings
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { getSettings, updateSettings, resetSettings };
