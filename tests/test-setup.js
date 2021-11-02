const mongoose = require('mongoose');
mongoose.promise = global.Promise;

//Function for removing all test collections
async function removeAllCollections() {
    const allCollections = Object.keys(mongoose.connection.collections);
    //Loop over each collection in the database
    for(const collectionName of allCollections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany();
    };
};

//Function for dropping all test collections after all tests have ran
async function dropAllCollections() {
    const allCollections = Object.keys(mongoose.connection.collections);
    //Loop over each collection in the database
    for(const collectionName of allCollections) {
        const collection = mongoose.connection.collections[collectionName];
        try{
            await collection.drop();
        } catch(error) {
            if(error.message === "ns not found") 
            return;
            if(error.message.includes("a background operation is currently running")) 
            return;
            console.log(error.message);
        } 
    };
};

module.exports = {
    setupTestDatabase(databaseName) {
    
        beforeAll(async () => {
            let databaseURI = `mongodb://localhost:27017/${databaseName}`
            await mongoose.connect(databaseURI, {
                useNewUrlParser: true
            });
        });
        
        afterEach(async() => {
            await removeAllCollections();
        });

        //Disconnect Mongoose
        afterAll(async () => {
            await dropAllCollections();
            //End mongoose connection
            await mongoose.connection.close();
        });        
    }
}
