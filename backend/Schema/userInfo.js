const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInfo = new Schema({ //usd = User Schema Details
    _id: {
        type: String,
    },
    usdName: {
        type: String,
    },
    usdAge: {
        type: Number,
    },
    usdGender: {
        type: String,
    },
    usdDOB: {
        type: String,
    }
});

module.exports = mongoose.model('userInfo', userInfo);