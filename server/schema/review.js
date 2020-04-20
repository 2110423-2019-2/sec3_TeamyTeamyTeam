const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    portfolioName: { type: String, required: true },
    rating: { type: Number, required: true },
    content: { type: String, required: false }
})

var Review = mongoose.model('review', reviewSchema);

module.exports = Review;