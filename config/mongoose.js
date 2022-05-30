const mongoose = require('mongoose');
const env = require('./env');
mongoose.connect(`mongodb://localhost/${env.db}`);
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Error in connecting to db"));
db.once('open',function(){console.log('Connected to db :: MongoDB');});
module.exports = db;