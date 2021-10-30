const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
    courseDetails: {
        name: {
            type: String,
            required: true
        },       
        code : {
            type: String,
            required: true
        },
        level: {
            type: String,
            required: true
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        }        
    },
    userDetails: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true
        },
        level: {
            type: String,
            required: true
        },
        // userId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true
        // }
    },
    studentRegistered: {
        type: Number,
        required: true,
        default: 1
    }
}, {timestamps: true});

module.exports = mongoose.model('Action', actionSchema);