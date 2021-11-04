const mongoose = require('mongoose');
const config = require('config');

const dbConnect = async () => {
    try{
        const db = config.get('db');
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log(`Database is connected to ${db}`));
    } 
    catch(error) {
        console.log(error);
        process.exit(1);
    }
    
    }    

module.exports = dbConnect;