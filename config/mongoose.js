const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('err', console.error.bind(console, "Error Connectiong to Database!"));

db.once('open', function(){
    console.log("Successfully Connected to DB!");
});

module.exports = db;