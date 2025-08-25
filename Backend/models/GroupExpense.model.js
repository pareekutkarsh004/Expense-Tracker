import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a group name']
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    customExpense: {
        type: Boolean,
        default: false // 'false' would mean an average split is the default
    }
}, { timestamps: true });

const Group = mongoose.model('Group', groupSchema);

export default Group;