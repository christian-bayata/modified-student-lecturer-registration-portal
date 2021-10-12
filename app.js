const express = require('express');
const app = express();

//Set up the express urlencoded and json files
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Import all routes
const courses = require("./routes/courses")


//Use the imported routes
app.use('/api/v1', courses);

module.exports  = app;