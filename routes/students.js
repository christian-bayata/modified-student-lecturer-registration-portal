require('express-async-errors');
const express = require('express');
const router = express.Router();

const { getStudentDetails } = require('../controllers/studentsController');

const { userIsAuthenticated } = require('../middlewares/auth');

router.route('/me').get(userIsAuthenticated, getStudentDetails);

module.exports = router;