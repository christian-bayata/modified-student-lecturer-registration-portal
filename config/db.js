const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(conn => console.log(`Database is connected with host: ${conn.connection.host}`))
}

module.exports = dbConnect;