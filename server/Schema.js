const mongoose = require('mongoose');

const regisInfo = mongoose.Schema({
    name: { type: String, require: true },
    userName: String,
    password: { type: String, require: true },
    email: { type: String, require: true },
    authorize: { type: Boolean, default: true }
    //editAccount: [{ log: String, timestamp: Date }]

});



module.exports = mongoose.model('regisInfo', regisInfo);