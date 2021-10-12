const express = require('express');
const app = express();

//Set up the express urlencoded and json files
app.use(express.urlencoded({extended: true}));
app.use(express.json());

module.exports  = app;