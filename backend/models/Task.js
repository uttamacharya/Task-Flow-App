// this is about user's task that which task user add
const mongoose= require('mongoose');

const taskSchema= new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    title:{
        type:String,
        required: true,
        trim: true
    },
    description: String,
    status:{
        type:String,
        enum:['pending','In-Process', 'Completed'],
        default:'pending'
    },
    priority:{
        type: Number,
        min: 1,
        max:5,
        default:3
    },
    createdAt:{
        type: Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Task',taskSchema);