const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const portfolio = require('./schema/portfolio')
const user = require('./schema/user')
const offer = require('./schema/offer')

const status_ok = 200;
const status_created = 201;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'phomooffermanager@gmail.com', // your email
        pass: 'teamyteam' // your email password
    }
});

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

router.post("/offer", (req, res, next) => {
    const offer_post = new offer({
        title: req.body.title,
        portfolioName: req.body.portfolioName,
        employerName: req.body.employerName,
        style: req.body.style,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        progress: req.body.progress
    });
    offer_post.save();
    console.log(offer_post);
    res.status(status_created).json({
        message: "Post added successful"
    });

    portfolio.find({portfolioName: req.body.portfolioName}).then(documents => {
        console.log(documents)
        const email = documents[0].email;
        const nodemailer = require('nodemailer');
        
    
        let mailOptions = {
            from: 'phomooffermanager@gmail.com',                // sender
            to: email,                // list of receivers
            subject: 'Phomo Job Offer',              // Mail subject
            html: '<p>You have just got offer</p>'   // HTML body
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
        });
    });
});

router.get("/runOffer/:id.:type.:isAccept", (req, res, next) => {
    let update = {progress: req.body.type};
    let content = "<p>undefine</p>";
    let email = "undefine";
    let used = offer.find({_id: req.body.type, progress: req.body.type});

    if(req.body.idAccept == "false") {
        update.progress = "decline";
    }
    else if(req.body.idAccept == "true"){
        if(req.body.type == "wait-photographer") {
            update.progress = "wait-employer";
        }
        else if(req.body.type == "wait-employer") {
            update.progress = "accept"
        };
    }
    let mailOptions = {
        from: 'phomooffermanager@gmail.com',                // sender
        to: email,                // list of receivers
        subject: 'Phomo Job Offer',              // Mail subject
        html: content   // HTML body
    };
    offer.findOneAndUpdate({_id: req.body.id, progress: req.body.type})
    transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
    });
});
module.exports = router;