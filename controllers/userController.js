require('express-async-errors');
const User = require('../models/users');
const validateRegister = require('../validations/user/user-register');
const status = require('http-status');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const HashPassword = require('../utils/hash-password');
const storeToken = require('../utils/store-token');
const ErrorHandler = require('../utils/ErrorHandler');

/* 
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