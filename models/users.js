const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    regNo: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    department: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100
    },
    level: {
        type: String,
        maxlength: 3,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "Student"
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, { timestamps: true })


userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this.id }, process.env.JWTPRIVATEKEY);  
    return token;  
};

module.exports = mongoose.model("User", userSchema);