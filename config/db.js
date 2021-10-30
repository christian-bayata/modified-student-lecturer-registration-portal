const mongoose = require('mongoose');

const dbConnect = async (databaseURI) => {
    try{
        await mongoose.connect(databaseURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((conn) => console.log(`Database is connected to the host: ${conn.connection.host}`));
    } 
    catch(error) {
        console.log(error);
        process.exit(1);
    }
    
    }    

module.exports = dbConnect;