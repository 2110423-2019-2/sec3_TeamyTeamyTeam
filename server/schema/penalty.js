const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var penaltySchema = new Schema({
    email: { type: String, required: true },
    hibitScore: { type: Number, required: true },
    cancelJob: { type: Number, required: true },
    acceptJob: { type: Number, required: true },
    rejectOffer: { type: Number, required: true },

})

var penalty = mongoose.model('penalty', penaltySchema);

module.exports = penalty;