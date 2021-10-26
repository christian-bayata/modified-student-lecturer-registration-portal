const express = require('express');
const router = express.Router();

const { registerCourse, 
        updateCourse, 
        deleteCourse, 
        getStudentDetails, 
        getAllRegisteredStudents 
} = require('../controllers/actionsController');

const { userIsAuthenticated, userIsAuthorized } = require('../middlewares/auth');

router.route('/action/register/course').post(userIsAuthenticated, registerCourse);

router.route('/me').get(userIsAuthenticated, getStudentDetails);

router.route('/admin/students').get(userIsAuthenticated, userIsAuthorized('lecturer'), getAllRegisteredStudents)

router.route('/action/update/course/:id').put(userIsAuthenticated, updateCourse)
                                        .delete(userIsAuthenticated, deleteCourse)

module.exports = router;