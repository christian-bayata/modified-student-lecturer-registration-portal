const dotenv = require('dotenv'); 
const app = require('./app');
const dbConnect = require('./config/db');

//Set up the config file
dotenv.config({ path: "config/config.env" })

//Set up the database connection
dbConnect();

const port = process.env.PORT;
const environment = process.env.NODE_ENV;
app.listen(port, () => console.log(`Server is running on port ${port} in ${environment} mode`)); 

