const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var albumSchema = new Schema({
    albumName: { type: String, required: true },
    portfolioID: { type: String, required: true }, // add id from frontend id= 'email-name-id'
    imageURLs: [{
        id: { type: Number, required: true },
        name: { type: String, required: true },
        url: { type: String, required: true },
        tag: { type: String, required: true },
        ref: { type: String, required: true }
    }]

})

var Album = mongoose.model('album', albumSchema);

module.exports = Album;