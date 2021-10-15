//Import the dependencies
require('express-async-errors');
const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');

//Set up the express urlencoded and json files
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//cookie parser config
app.use(cookieParser());

//Import all routes
const courses = require('./routes/courses')
const users = require('./routes/auth')

//Use the imported routes
app.use('/api/v1', courses);
app.use('/api/v1', users);

//Use the error handling middleware;
app.use(errorMiddleware);

module.exports  = app;