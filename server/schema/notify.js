const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var notifySchema = new Schema({
    photographerID: {type: String, required: true},
    employerID: {type: String, required: true},
    portfolioID: {type: String, required: true},
    Actdate: {type: Date, required: true},
    content: {type: String, required: true},
    redirectLink: {type: String, required: true}, // redirect to the  accept/decline section
    isRead: {type: Boolean, default: false}
})

var Notify = mongoose.model('notify',notifySchema);

module.exports = Notify;