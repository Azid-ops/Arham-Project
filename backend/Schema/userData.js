const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userData = new Schema({
    schemaPassword: {
        type: String,
    },
    schemaEmail: {
        type: String,
    }
});

module.exports = mongoose.model('userData', userData);