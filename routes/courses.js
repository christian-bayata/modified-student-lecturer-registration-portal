const express = require('express');
const router = express.Router();

const { getCourses, getSingleCourse } = require("../controllers/coursesController");
const { userIsAuthenticated } = require('../middlewares/auth');

router.route('/courses').get(userIsAuthenticated, getCourses);
router.route('/course/:id').get(userIsAuthenticated, getSingleCourse);

module.exports = router;
