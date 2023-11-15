const mongoose = require('mongoose');

// mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost:27017/Career-Camp');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Connection problem"));

db.on('open', function(){
    console.log("Connected to MongoDB Successfully")
})

module.exports = db;