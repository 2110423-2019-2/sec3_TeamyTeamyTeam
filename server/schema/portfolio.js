const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var portfolioSchema = new Schema({
    portfolioName: { type: String, required: true }, // gather email by ID
    email: { type: String, required: true },
    tags: { type: [String] },
    albums: {type:[String]}, //album._id
    minBath: Number,
    maxBath: Number
})

var Portfolio = mongoose.model('portfolio', portfolioSchema);

module.exports = Portfolio;