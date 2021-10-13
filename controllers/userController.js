const User = require('../models/users');
const { validate } = require('../validations/user/user-register');
const status = require('http-status');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const HashPassword = require('../utils/hash-password');

/* 
    @params: req
    @params: res
    @params: next

    @returns: 
*/

//Registers a new user ....................../api/v1/register
exports.registerUser = async (req, res, next) => {
    
    //validate the input of the user
    const { error }  = await validate(req.body);
    if(error) return res.status(status.BAD_REQUEST).json(error.details[0].message);

    let { firstName, lastName, email, password, regNo } = req.body;
    
    password = await HashPassword.encryptPassword(password);

    let user =  await User.create({ firstName, lastName, email, password, regNo })
        
    user = (_.pick(req.body, [ "firstName", "lastName", "email", "regNo" ]));
    
    res.status(status.CREATED).json({
        success: true,
        user
    })
}