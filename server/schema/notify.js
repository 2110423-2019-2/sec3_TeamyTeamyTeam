const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var notifySchema = new Schema({
    email: {type: String, required: true},
    content: {type: String, required: true},
    redirectLink: {type: String, required: true}, // redirect to the  accept/decline section
    isRead: {type: Boolean, default: false},
    isReply: {type: Boolean, default: false}
})

var Notify = mongoose.model('notify',notifySchema);

module.exports = Notify;