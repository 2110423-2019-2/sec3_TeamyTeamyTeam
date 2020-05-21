const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var penaltySchema = new Schema({
    email: { type: String, required: true },
    hibitScore: { type: Number, required: true },
    acceptOffer: { type: Number, required: true },
    declineOffer: { type: Number, required: true },

})

var penalty = mongoose.model('penalty', penaltySchema);

module.exports = penalty;