require('express-async-errors');
const User = require('../models/users');
const { validate } = require('../validations/user/user-register');
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
    const { error }  = await validate(req.body); 
    if(error) return res.status(status.BAD_REQUEST).json(error.details[0].message);
  
    let { firstName, lastName, email, password, regNo } = req.body;
    
    //Check to see if the user already exists;
    let findUserByEmail = await User.findOne({email});
    if(findUserByEmail) return next(new ErrorHandler("This user already exists", status.BAD_REQUEST));
    
    password = await HashPassword.encryptPassword(password);
    let user =  await User.create({ firstName, lastName, email, password, regNo })
    
    storeToken(user, status.OK, res);
}

// exports.loginUser = async (req, res, next) => {

// }