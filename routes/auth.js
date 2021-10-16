const express = require('express');
const router = express.Router();

const { registerUser, 
        loginUser, 
        forgotPassword,
        resetPassword,
        logoutUser 
} = require('../controllers/authController');

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/forgot/password').post(forgotPassword);

router.route('/reset/password/:token').put(resetPassword);

router.route('/logout').get(logoutUser);

module.exports = router;