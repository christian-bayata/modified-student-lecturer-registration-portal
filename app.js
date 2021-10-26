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
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const actions = require('./routes/actions');

//Use the imported routes
app.use('/api/v1', courses);
app.use('/api/v1', auth);
app.use('/api/v1', actions);

//Use the error handling middleware;
app.use(errorMiddleware);

module.exports  = app;