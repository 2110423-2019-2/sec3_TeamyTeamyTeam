const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const portfolio = require('./schema/portfolio')
const user = require('./schema/user')

const ok = 200;
const created = 201;

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
    res.status(created).json({
        message: "Post added successful"
    });
});

router.get("/user/:username.:password", (req, res, next) => {
    user.find({username: req.params.username, password: req.params.password}).then(documents => {
        res.status(ok).json({
            message: "Registor fetched successfully!",
            data: documents
        });
        console.log(documents)
    });
});


module.exports = router;