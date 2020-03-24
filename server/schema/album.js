const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var albumSchema = new Schema({
    albumName: { type: String, required: true },
    portfolioID: { type: String, required: true },
    imageURLs: {type: [String]}
})

var Album = mongoose.model('album', albumSchema);

module.exports = Portfolio;