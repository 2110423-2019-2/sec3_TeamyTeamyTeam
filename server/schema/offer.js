const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var offerSchema = new Schema({
    title: { type: String, required: true },
    portfolioName: { type: String, required: true },
    portfolioEmail: { type: String, required: true },
    employerEmail: { type: String, required: true },
    style: { type: String, required: true },
    actDate: { type: String, required: true }, // data_tag in server !!!
    meetUpTime: { type: String, required: true }, // meetUpTime เวลาที่มาเจอกัน
    location: { type: String, required: true },
    progress: { type: Number, required: true }, // status job
    fee: { type: String, required: true }, // Text_block สำหรับการคุยคร่าวๆ
    resultURL: { type: String, required: true }
})

var Offer = mongoose.model('offer', offerSchema);

module.exports = Offer;