const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose")
const portfolio = require("./schema/portfolio");
const user = require("./schema/user");
const offer = require("./schema/offer");
const notify = require("./schema/notify");
const nodemailer = require("nodemailer");
const crypto = require("crypto");


// define http status
const status_ok = 200;
const status_created = 201;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "phomooffermanager@gmail.com", // your email
        pass: "teamyteam" // your email password
    }
});

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
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

router.get("/login/:email.:password", (req, res, next) => {
    user
        .find({ email: req.params.email, password: req.params.password })
        .then(documents => {
            documents[0].password = "*****";
            var token = crypto.randomBytes(64).toString("hex");
            res.status(status_ok).json({
                message: "Registor fetched successfully!",
                data: documents
            });
            console.log(documents);
        });
});
router.get("/portfolio", (req, res, next) => {
    portfolio.find().then(documents => {
        res.status(status_ok).json({
            message: "Registor fetched successfully!",
            data: documents
        });
        console.log(documents);
    });
});

router.get("/portfolioTags/:key", (req, res, next) => {
    portfolio.find({ tags: req.params.key }).then(documents => {
        res.status(status_ok).json({
            message: "Registor fetched successfully!",
            data: documents
        });
        console.log(documents);
    });
});

router.get("/offer/:email", (req, res, next) => {
    user
        .find({ email: req.params.email })
        .then(user_mail => {
            offer.find({ employerEmail: req.params.user_mail });
        })
        .then(documents => {
            res.status(status_ok).json({
                message: "offer get fetched successfully!",
                data: documents
            });
            console.log(documents);
        });
});

router.post("/offer", (req, res, next) => {
    const offer_post = new offer({
        title: req.body.title,
        photographerID: req.body.photographerID,
        portfolioName: req.body.portfolioName, // portfolioName == portfolioID
        employerID: req.body.employerID,
        employerEmail: req.body.employerEmail,
        style: req.body.style,
        actDate: req.body.actDate, // data_tag in server !!!
        meetUpTime: req.body.meetUpTime, // meetUpTime เวลาที่มาเจอกัน
        location: req.body.location,
        progress: req.body.progress,
        optionalRequest: req.body.optionalRequest // Text_block สำหรับการคุยคร่าวๆ
    });
    offer_post.save().then(() => {
        portfolio
            .find({ portfolioName: offer_post.portfolioName })
            .then(documents => {
                // create notify for photographer
                const notify_post_photographer = new notify({
                    email: documents[0].email,
                    content: offer_post.title + ": " + offer_post.progress,
                    redirectLink: offer_post._id, // redirect to the  accept/decline section
                    isRead: false,
                    isReply: true
                });
                notify_post_photographer.save();
                // create notify for employer
                const notify_post_employer = new notify({
                    email: req.body.employerEmail,
                    content: offer_post.title + ": " + offer_post.progress,
                    redirectLink: offer_post._id, // redirect to the  accept/decline section
                    isRead: false,
                    isReply: false
                });
                notify_post_employer.save();
                console.log(offer_post);
                console.log(notify_post_photographer);
            });
    });

    res.status(status_created).json({
        message: "Post added successful"
    });
});
router.post("/portfolio", (req, res, next) => {
    const port = new portfolio({
        photographerName: req.body.photographerName, // gather email by ID
        email: req.body.email,
        tags: req.body.tags,
        minBath: req.body.minBath,
        maxBath: req.body.maxBath
    });
    port.save();
    console.log(offer_post);
    res.status(status_created).json({
        message: "Post added successful"
    });
});
router.get("/notify/:email", (req, res, next) => {
    notify.find({ email: req.params.email }).then(documents => {
        res.status(status_ok).json({
            message: "Registor fetched successfully!",
            data: documents
        });
    });
});

router.put("/readNotify/:email", (req, res, next) => {
    notify
        .update({ email: req.params.email, isRead: false }, {
            isRead: true
        })
        .exec();
});


router.get("/replyNotify/:id.:isAccept", (req, res, next) => {
    var of;
    offer
        .find({ _id: req.params.id })
        .then(documents => {
            of = documents[0];
            if (req.params.isAccept == true) {
                if (of.progress == "wait_photographer_reply") {
                    const new_content = of.title + ": " + "wait_employer_reply"
                    notify
                        .update({ redirectLink: req.params.id, isReply: true }, {
                            content: new_content,
                            isReply: false
                        })
                        .exec();
                    notify
                        .update({ redirectLink: req.params.id, isReply: false }, {
                            content: new_content,
                            isReply: true
                        })
                        .exec();
                    offer
                        .update({ _id: req.params.id }, {
                            progress: "wait_employer_reply"
                        })
                        .exec();
                } else if (of.progress == "wait_employer_reply") {
                    const new_content = of.title + ": " + "offer complete"
                    notify
                        .update({ redirectLink: req.params.id }, {
                            content: new_content,
                            isReply: false
                        })
                        .exec();
                    offer
                        .update({ _id: req.params.id }, {
                            progress: "offer complete"
                        })
                        .exec();
                }
            } else {
                const new_content = of.title + ": " + "offer fail"
                notify
                    .update({ redirectLink: req.params.id }, {
                        content: new_content,
                        isReply: false
                    })
                    .exec();
                offer
                    .update({ _id: req.params.id }, {
                        progress: "offer fail"
                    })
                    .exec();
            }
            console.log("reply success")
        });

});

// router.put("/user", (req, res, next) => {
//     const user_profile = user.find(m => user.email === parseInt(req.params.email));
//     if (!user_profile) {
//         res.status(404).send('The profile with the given ID was not found ')
//     } else {

//         if (user_profile.firstName === '') {
//             user_profile.firstName = req.params.firstName
//         }

//         res.send(user_profile);
//     }
//     user_post.save();

//     // firstName: req.body.firstName,
//     // lastName: req.body.lastName,
//     // email: req.body.email,
//     // username: req.body.username,
//     // password: req.body.password,
//     // nationalID: req.body.nationalID,
//     // gender: req.body.gender,
//     // birthDate: req.body.birthDate,
//     // isPhotographer: req.body.isPhotographer,
//     // phoneNo: req.body.phoneNo,
//     // introduction: req.body.introduction,
//     // profileImage: req.body.profileImage,
//     // portfolioID: req.body.portfolioID,
//     // avgRating: req.body.avgRating,
//     // authorize: false

//     console.log(user_post);
//     res.status(status_created).json({
//         message: "Put update profile successful"
//     });
// });

router.get("/user/:email", (req, res, next) => {
    user.find({ email: req.params.email }).then(documents => {
        res.status(status_ok).json({
            message: "get employee fetched successfully!",
            data: documents
        });
        console.log(documents);
    });
});





module.exports = router;