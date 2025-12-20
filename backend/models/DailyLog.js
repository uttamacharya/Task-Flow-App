// it's for writing notes
const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // sectionId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Section',
    //     required: true
    // },
    taskId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required:true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    duration: {
        type: Number, // in minutes
        default: 0
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    },
    comments: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('DailyLog', dailyLogSchema);