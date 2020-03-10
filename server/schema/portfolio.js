const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var portfolioSchema = new Schema({
    portfolioID: { type: String, required: true },
    photographerID: { type: String, required: true }, // gather email by ID
    // email: {type: String, required: true},
    tags: { type: [String] },
    minBath: Number,
    maxBath: Number
})

var Portfolio = mongoose.model('portfolio', portfolioSchema);

module.exports = Portfolio;