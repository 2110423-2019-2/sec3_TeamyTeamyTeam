const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    nationalID: {type: String, required: true},
    gender: {type: String, required: true},
    birthDate: {type: String, required: true},
    isPhotographer: {type: String, required: true},
    phoneNo: {type: String, required: true},
    introduction: {type: String, required: false},
    profileImage: {type: String, required: true},
    portfolioID: {type: String, required: false},
    avgRating: {type: double, required: false} //if it is -1 mean no avilable rating point
})

var User = mongoose.model('user',userSchema);

module.exports = User;