const express = require('express');
const router = express.Router();

const { registerCourse, updateCourse } = require('../controllers/actionsController');
const { userIsAuthenticated } = require('../middlewares/auth');

router.route('/action/register/course').post(userIsAuthenticated, registerCourse);

router.route('/action/update/course/:id').put(userIsAuthenticated, updateCourse);

module.exports = router;