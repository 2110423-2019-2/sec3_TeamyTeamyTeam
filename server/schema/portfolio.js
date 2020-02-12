const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var portfolioSchema = new Schema({
    portfolioName: {type: String, required: true},
    ownerID: {type: mongoose.Types.ObjectId, required: true},
    tags: {typr: [String]}
})

var Portfolio = mongoose.model('portfolio',portfolioSchema);

module.exports = Portfolio;