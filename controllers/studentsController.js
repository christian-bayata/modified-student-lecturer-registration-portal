const User = require('../models/users');
const status = require('http-status');

/* 
    Author: EDOMARUSE Frank
    @params: req
    @params: res
    @params: next
*/

//get the details of the currently logged in user ................../api/v1/me
exports.getStudentDetails = async (req, res, next) => {
    const student = await User.findById(req.user.id);

    res.status(status.OK).json({
        success: true,
        student
    })
};

//Routes that accessible to the ADMIN alone.....

/* 
    @params: req
    @params: res
    @params: next
*/
//Route for getting all students that have registered for the course ............../api/v1/admin/students
exports.getAllRegisteredStudents = async (req, res, next) => {
    const students = await User.find().sort('createdAt');
    
    res.status(status.OK).json({
        success: true,
        students
    })
};