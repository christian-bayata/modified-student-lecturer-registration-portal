const express = require('express');
const router = express.Router();

const { getCourses, getSingleCourse } = require("../controllers/coursesController");

router.route('/courses').get(getCourses);
router.route('/course/:id').get(getSingleCourse);

module.exports = router;
