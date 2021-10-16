require('express-async-errors');
const User = require('../models/users');
const validateRegister = require('../validations/user/user-register');
const status = require('http-status');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const crypto = require('crypto');
const HashPassword = require('../utils/hash-password');
const storeToken = require('../utils/store-token');
const ErrorHandler = require('../utils/ErrorHandler');
const getResetPasswordToken = require('../utils/reset-password');
const sendEmail = require('../utils/send-email');

/* 
    Author: EDOMARUSE Frank
    @params: req
    @params: res
    @params: next

    @returns: {Promise<*>} 
*/

//Registers a new user ....................../api/v1/register
exports.registerUser = async (req, res, next) => {
    
    //validate the input of the user
    const { error }  = await validateRegister(req.body); 
    if(error) return res.status(status.BAD_REQUEST).json(error.details[0].message);
  
    let { firstName, lastName, email, password, regNo } = req.body;
    
    //Check to see if the user already exists;
    let checkUserReg = await User.findOne({regNo});
    if(checkUserReg) return next(new ErrorHandler("The user with this registration number already exists", status.BAD_REQUEST));
    
    password = await HashPassword.encryptPassword(password);
    let user =  await User.create({ firstName, lastName, email, password, regNo })
    
    storeToken(user, status.OK, res);
}

/* 
    @params: req
    @params: res
    @params: next

    @returns: {Promise<*>} 
*/

//Login user ............................../api/v1/login
exports.loginUser = async (req, res, next) => {
   
    let { regNo, password } = req.body;

    //Check to be sure that the user supplies both Reg_No and password;
    if(!regNo || !password) {
        return next(new ErrorHandler("Enter your registration number or password", status.BAD_REQUEST));
    };
    //Check to see if the user Reg_No does exist in the database;
    const user = await User.findOne({regNo}).select('+password');
    if(!user) {
        return next(new ErrorHandler("Invalid registration number", status.NOT_FOUND)); 
    };
    //Compare user password;
    isPasswordValid = await HashPassword.comparePasswords(password, user.password);
    if(!isPasswordValid) {
        return next(new ErrorHandler("Invalid user password", status.BAD_REQUEST));
    }

    storeToken(user, status.OK, res);
};

/* 
    @params: req
    @params: res
    @params: next

    @returns: {Promise<*>} 
*/

//user forgot password ................................/api/v1/reset
exports.forgotPassword = async (req, res, next) => {
    
    //Check if user email exists in the database;
    const user = await User.findOne({ email: req.body.email });
    if(!user) {
        return next(new ErrorHandler("Email does not exist", status.NOT_FOUND));
    };
    //Get the reset token
    const resetToken = getResetPasswordToken(user);
    await user.save({ validateBeforeSave: false });

    //The reset password url
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/reset/password/${resetToken}`; 
    //set the message that accompanies the password reset url
    const message = `This is your password reset url: \n\n${resetPasswordUrl}\n\n However, if you did not request this email, simply ignore it.`

    try{
        await sendEmail({
            email: user.email,
            subject: 'Registration password recovery e-mail',
            message
        })

        res.status(status.OK).json({
            success: true,
            message: `recovery mail sent to ${user.email}`
        })
    } 
    catch(err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(err.message, status.BAD_REQUEST));
    }
}

/*
    @params: req
    @params: res
    @params: next
*/

// //reset user password
exports.resetPassword = async (req, res, next) => {

    // Hash the already existing password token;
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    //Check to see if the user with this password does exist in the database;
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() }
    }) 
    if(!user) {
        return next(new ErrorHandler("Reset token for password is either invalid or has expired", status.BAD_REQUEST));
    }
    //Validate password and confirm password
    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Your password does not match", status.NOT_FOUND));
    }
    //If user has been validated
    //Encrypt the password
    user.password = await HashPassword.encryptPassword(req.body.password);
    //Nullify the password reset token and its expiry date;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    storeToken(user, status.OK, res);
}

/* 
    @params: req
    @params: res
    @params: next

    @returns: {Promise<*>} 
*/

//Log out user ................................/api/v1/logout
exports.logoutUser = async (req, res, next) => {
    //Set the cookie options
    const options = {
        expires: new Date(Date.now),
        httpOnly: false
    };

    res.status(status.OK).cookie('token', null, options).json({
        success: true,
        message: "user is logged out"
    });
}