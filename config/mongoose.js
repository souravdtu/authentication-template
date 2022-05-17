const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost/authentication`);
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Error in connecting to db"));
db.once('open',function(){console.log('Connected to db :: MongoDB');});
module.exports = db;