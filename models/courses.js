const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    code: {
        type: String,
        required: true,
        maxlength: 7,
    },
    units: {
        type: Number,
        required: true,
        default: 0
    },
    level: {
        type: Number,
        required: true
    }
}, {timestamps: true}
);

module.exports = mongoose.model("Course", courseSchema);

