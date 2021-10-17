require('express-async-errors');
const express = require('express');
const router = express.Router();

const { getUserDetails } = require('../controllers/usersController');

const { userIsAuthenticated } = require('../middlewares/auth');

router.route('/me').get(userIsAuthenticated, getUserDetails);

module.exports = router;