//Import the dependencies
require('express-async-errors');
const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');

//Set up the express urlencoded and json files
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Import all routes
const courses = require("./routes/courses")


//Use the imported routes
app.use('/api/v1', courses);

//Use the error handling middleware;
app.use(errorMiddleware);

module.exports  = app;