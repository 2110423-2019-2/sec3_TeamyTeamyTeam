const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var offerSchema = new Schema({
    title: {type: String, required: true},
    employerName: {type: String, required: true},
    style: {type: String, required: true},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    location: {type: String, required: true}
})

var Offer = mongoose.model('offer',offerSchema);

module.exports = Offer;