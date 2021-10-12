const express = require('express');
const router = express.Router();

const { getCourses } = require("../controllers/coursesController");

router.route('/courses').get(getCourses);

module.exports = router;
