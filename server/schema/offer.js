const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var offerSchema = new Schema({
    title: { type: String, required: true },
    portfolioID: { type: String, required: true }, // portfolioName == portfolioID
    employerID: { type: String, required: true },
    style: { type: String, required: true },
    Actdate: { type: Date, required: true }, // data_tag in server !!!
    meetUpTime: { type: String, required: true }, // meetUpTime เวลาที่มาเจอกัน
    location: { type: String, required: true },
    progress: { type: String, required: true },
    OptionalRequest: { type: String } // Text_block สำหรับการคุยคร่าวๆ
})

var Offer = mongoose.model('offer', offerSchema);

module.exports = Offer;