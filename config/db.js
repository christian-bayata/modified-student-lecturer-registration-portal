const mongoose = require('mongoose'); 

const dbConnect = async (databaseURI) => {
       await mongoose.connect(databaseURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(conn => console.log(`Database is connected to host: ${conn.connection.host}`))
        .catch(err => console.log("Could not connect to the database", err));
    }    

module.exports = dbConnect;