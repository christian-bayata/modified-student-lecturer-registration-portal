const dotenv = require('dotenv'); 
const app = require('./app');
const dbConnect = require('./config/db');

//Handle uncaughtExceptions error;
process.on('uncaughtExceptions', (err) => {
    console.log(`Error: ${err.stack}`);
    console.log(`Shutting down server due to uncaught exceptions`);
});

//Set up the config file
dotenv.config({ path: "config/config.env" })

//Set up the database connection
let databaseURI = process.env.DB_LOCAL_URI;
if(process.env.NODE_ENV === "TESTING") databaseURI = process.env.DB_TEST_URI;
dbConnect(databaseURI).then(() => true);

const port = process.env.PORT;
const environment = process.env.NODE_ENV;
const server = app.listen(port, () => console.log(`Server is running on port ${port} in ${environment} mode`)); 

//Handle unhandledRejections error;
process.on('unhandledRejections', (err) => {
    console.log(`Error: ${err.stack}`);
    console.log(`Shutting down server due to unhandled rejections`);

    server.close(() => {
        process.exit(1);
    });
})