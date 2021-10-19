const express = require('express');
const router = express.Router();

const { registerCourse } = require('../controllers/actionsController');
const { userIsAuthenticated } = require('../middlewares/auth');

router.route('/action/register/course').post(userIsAuthenticated, registerCourse);

module.exports = router;