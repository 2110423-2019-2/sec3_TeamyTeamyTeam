const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const portfolio = require('./schema/portfolio')
const user = require('./schema/user')

const status_ok = 200;
const status_created = 201;


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


router.post("/user", (req, res, next) => {
    const user_post = new user({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        nationalID: req.body.nationalID,
        gender: req.body.gender,
        birthDate: req.body.birthDate,
        isPhotographer: req.body.isPhotographer,
        phoneNo: req.body.phoneNo,
        introduction: req.body.introduction,
        profileImage: req.body.profileImage,
        portfolioID: req.body.portfolioID,
        avgRating: req.body.avgRating,
        authorize: false
    });
    user_post.save();
    console.log(user_post);
    res.status(status_created).json({
        message: "Post added successful"
    });
});

router.get("/user/:email.:password", (req, res, next) => {
    user.find({ email: req.params.email, password: req.params.password }).then(documents => {
        documents[0].password = "*****"
        res.status(status_ok).json({
            message: "Registor fetched successfully!",
            data: documents 
        });
        console.log(documents)
    });
});

router.get("/portfolio", (req, res, next) => {
    portfolio.find().then(documents => {
        res.status(status_ok).json({
            message: "Registor fetched successfully!",
            data: documents 
        });
        console.log(documents)
    });
});

router.get("/portfolio/:name", (req, res, next) => {
    portfolio.find({portfolioName: req.params.name}).then(documents => {
        res.status(status_ok).json({
            message: "Registor fetched successfully!",
            data: documents 
        });
        console.log(documents)
    });
});


module.exports = router;