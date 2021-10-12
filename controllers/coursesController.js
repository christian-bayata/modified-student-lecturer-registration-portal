const Course = require('../models/courses');

//Gets all courses ......................./api/v1/courses
exports.getCourses = async (req, res, next) => {

    const courses = await Course.find().sort();
    
    res.status(200).json({
        success: true,
        courses
    });
};

//Gets a single course by it's ID ............./api/v1/course/:id
exports.getSingleCourse = async (req, res, next) => {

    const course = await Course.findById(req.params.id);

    res.status(200).json({
        success: true,
        course
    });
};
