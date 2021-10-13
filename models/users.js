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
        required: true
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
    role: {
        type: String,
        required: true,
        default: "Student"
    }
}, { timestamps: true })


userSchema.methods.generateAuthToken = () => {
    const token = jwt.sign({
        userId: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        regNo: this.regNo,
        email: this.email,
        role: this.role
    }, process.env.JWTPRIVATEKEY);
    
    return token;
};

module.exports = mongoose.model("User", userSchema);