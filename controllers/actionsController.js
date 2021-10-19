require('express-async-errors');
const Action = require('../models/actions');
const status = require('http-status');
const User = require('../models/users');
const Course = require('../models/courses');
const ErrorHandler = require('../utils/ErrorHandler');
const validateCourseRegister = require('../validations/actions/course-register');

/* 
    Author: EDOMARUSE Frank
    @params: req
    @params: res
    @params: next

    @returns: {Promise<*>} 
*/

//Allows student to register a new course .............../api/v1/action/register/course
exports.registerCourse = async (req, res, next) => {
     //validate the input of the user
     const { error }  = await validateCourseRegister(req.body); 
     if(error) return res.status(status.BAD_REQUEST).json(error.details[0].message);
      
     const { courseDetails, userDetails } = req.body;
       
     //Ensure that the user provides the right ID 
    if(userDetails.userId !== req.user.id) {
        return next(new ErrorHandler("User with this ID not found", status.NOT_FOUND));
    };
    //Ensure that student does not select any course outside his level
    if(courseDetails.level !== userDetails.level) {
        return next(new ErrorHandler("This course is out of your scope, sorry choose another one", status.BAD_REQUEST));
    };

    //Ensure that student cannot register the same course twice
    const ensureNotAlreadyRegistered = await Action.findOne({ 
        courseDetail: courseDetails.courseId, 
        userDetail: userDetails.userId
    });
    if(ensureNotAlreadyRegistered) {
        return next(new ErrorHandler(`You have already registered for ${courseDetails.code}`, status.BAD_REQUEST));
    };

    const result = await Action.create({
        courseDetails,
        userDetails
    });

    res.status(status.CREATED).json({
        success: true,
        message: "You've successfully registered this course",
        result
    });
}