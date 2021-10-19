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
    },
    level: {
        type: String,
        maxlength: 3,
        required: true
    },
    department: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true}
);

module.exports = mongoose.model("Course", courseSchema);

