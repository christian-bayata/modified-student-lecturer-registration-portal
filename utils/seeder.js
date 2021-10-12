const dbConnect = require('../config/db');
const dotenv = require('dotenv');
const Course = require('../models/courses');
const courseJson = require('../data/courses');

//Set the config file
dotenv.config({ path: 'config/config.env' });

//Import the Database
dbConnect();

//Create the seeder function
const courseSeeder = async () => {
    try {
        await Course.deleteMany();
        console.log("Temporarily deleting courses from the database");

        await Course.insertMany(courseJson);
        console.log("Restoring courses all the courses  into the database");

        process.exit();
    } 
    catch(err) {
        console.log(err.message);
        process.exit();
    }
}

courseSeeder();