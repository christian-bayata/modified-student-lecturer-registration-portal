require('express-async-errors');
const Course = require('../models/courses');
const status = require('http-status');
const ErrorHandler = require('../utils/ErrorHandler');

/*
    author: EDOMARUSE Frank
    @params req 
    @params res
    @params next

    @return <Promise(void)>
*/

//Register a new course .........................../api/v1/course/register
exports.registerCourse = async (req, res, next) => {
    
}

//Gets all courses ......................./api/v1/courses
exports.getCourses = async (req, res, next) => {

    const courses = await Course.find().sort();
    
    res.status(status.OK).json({
        success: true,
        courses
    });
};

/*
    @params: req
    @params: res
    @params: next

    @return: <Promise(void)>
*/

//Gets a single course by it's ID ............./api/v1/course/:id
exports.getSingleCourse = async (req, res, next) => {

    const course = await Course.findById(req.params.id);

    if(!course) {return next(new ErrorHandler("Course with the given ID not found", status.NOT_FOUND))}

    res.status(status.OK).json({
        success: true,
        course
    });
};

//

