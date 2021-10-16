const ErrorHandler = require('../utils/ErrorHandler');
const status = require('http-status');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.userIsAuthorized = async (req, res, next) => {
    //Check out for the user token from the cookies
    const token = req.cookies.token;
    if(!token) {
        return next(new ErrorHandler("Please login first", status.BAD_REQUEST))
    }

    //If token does exist
    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        //Check if the decoded token contains the user ID;
        req.user = await User.findById(decoded.id);
        return next();
    }
    catch(err) {
        return next(new ErrorHandler('You are not authorized to access this resource', status.UNAUTHORIZED));
    }
}

exports.userIsAuthorized = (...roles) => {
    return function(req, res, next) {
        if(!roles.include(req.user.role)) {
            return next(new ErrorHandler(`Sorry, ${req.user.role}s cannot access this resource`, status.FORBIDDEN));
        }
        next();
    }
}