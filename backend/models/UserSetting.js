const mongoose = require('mongoose');

const userSettingsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    theme: {
        type: String,
        enum: ['light', 'dark', 'system'],
        default: 'light'
    },
    notifications: {
        email: {
            taskReminders: { type: Boolean, default: true },
            dailySummary: { type: Boolean, default: true }
        },
        push: {
            taskReminders: { type: Boolean, default: true }
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserSettings', userSettingsSchema);