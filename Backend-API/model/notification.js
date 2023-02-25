import mongoose from 'mongoose';

const notifySchema = new mongoose.Schema({
    recipient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    message:{
        type: String,
        required:true
    },
    isRead:{
        type: Boolean,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Notify = mongoose.model('Notify', notifySchema);
export default Notify;