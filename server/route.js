const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose")
const portfolio = require("./schema/portfolio");
const user = require("./schema/user");
const offer = require("./schema/offer");
const notify = require("./schema/notify");
const penalty = require("./schema/penalty");
const review = require("./schema/review");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// define http status
const status_ok = 200;
const status_created = 201;


const {
    omiseCheckoutCreditCard,
    omiseCheckoutInternetBanking,
    omiseWebHooks,
    getInternetBankingCharge
} = require('./controller/payment/paymentControl');


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
    if(req.body.isPhotographer == true){
        const portfolio_post = new portfolio({
            portfolioName: req.body.displayName, // gather email by ID
            email: req.body.email,
            tags: [],
            minBath: -1,
            maxBath: -1
        });
        portfolio_post.save();
        console.log(portfolio_post);
    }
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
        displayName: req.body.displayName,
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
                message: "User login successfully",
                data: documents
            });
            console.log(documents);
        });
});
router.get("/portfolio/:email", (req, res, next) => {
    portfolio.find().then(documents => {
        res.status(status_ok).json({
            message: "Get portfolio successfully!",
            data: documents
        });
        console.log(documents);
    });
});
router.get("/portfolio", (req, res, next) => {
    portfolio.find().then(documents => {
        res.status(status_ok).json({
            message: "Get portfolio successfully!",
            data: documents
        });
        console.log(documents);
    });
});
router.get("/portfolioTags/:key", (req, res, next) => {
    portfolio.find({ tags: req.params.key }).then(documents => {
        res.status(status_ok).json({
            message: "Get portfolio successfully!",
            data: documents
        });
        console.log(documents);
    });
});

router.get("/offer/:email", (req, res, next) => {
    portfolio.find({ email: req.params.email }).then(documents => {
        if (documents.length >= 1) {
            offer.find({ $or: [{ employerEmail: req.params.email }, { portfolioName: documents[0].portfolioName }] }).then(documents2 => {
                res.status(status_ok).json({
                    message: "Get Offer successfully!",
                    data: documents2,
                    timestamp: documents2[documents2.length - 1]._id.getTimestamp()
                });
                console.log(documents2);
            });
        } else {
            offer.find({ employerEmail: req.params.email }).then(documents2 => {
                res.status(status_ok).json({
                    message: "Get Offer successfully!",
                    data: documents2,
                    timestamp: "No Offer"
                });
                console.log(documents2);
            });
        }
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
    console.log(offer_post)
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
            message: "Get notify",
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
    var false_notify;
    offer
        .find({ _id: req.params.id })
        .then(documents => {
            of = documents[0];
            console.log("find " + of.progress)
            if (req.params.isAccept == "true") {
                if (of.progress == "wait photographer reply") {
                    console.log("wait photographer reply:" + req.params.id)
                    const new_content = of.title + ": " + "wait employer reply"
                    console.log("update to " + new_content)
                    notify
                        .find({ redirectLink: req.params.id, isReply: false })
                        .then(documents2 => {
                            var false_notify = documents2[0];
                            notify
                                .update({ _id: false_notify._id }, {
                                    content: new_content,
                                    isReply: true
                                })
                                .exec(() => {
                                    console.log("wait employer reply notify update step2")
                                });
                        })
                    notify
                        .update({ redirectLink: req.params.id, isReply: true }, {
                            content: new_content,
                            isReply: false
                        })
                        .exec(() => {
                            console.log("wait employer reply notify update step1")
                        });
                    offer
                        .update({ _id: req.params.id }, {
                            progress: "wait employer reply"
                        })
                        .exec(() => {
                            console.log("wait employer reply offer update")
                        });
                } else if (of.progress == "wait employer reply") {
                    const new_content = of.title + ": " + "offer complete"
                    notify
                        .updateMany({ redirectLink: req.params.id }, {
                            content: new_content,
                            isReply: false
                        })
                        .exec(() => {
                            console.log("offer complete notify update")
                        });
                    offer
                        .update({ _id: req.params.id }, {
                            progress: "offer complete"
                        })
                        .exec(() => {
                            console.log("offer complete offer update")
                        });
                }
            } else {
                const new_content = of.title + ": " + "offer fail"
                notify
                    .update({ redirectLink: req.params.id }, {
                        content: new_content,
                        isReply: false
                    })
                    .exec(() => {
                        console.log("offer fail notify update")
                    });
                offer
                    .update({ _id: req.params.id }, {
                        progress: "offer fail"
                    })
                    .exec(() => {
                        console.log("offer fail offer update")
                    });
            }
        });
});

router.post("/report", (req, res, next) => {
    let mailOptions = {
        from: 'phomooffermanager@gmail.com', // sender
        to: 'phomooffermanager@gmail.com', // list of receivers
        subject: 'Problem Report', // Mail subject
        html: '<p>From: ' + req.body.firstname + ' ' + req.body.lastname + '</p>' +
            '<p>Email: ' + req.body.email + '</p>' +
            '<p>Title: ' + req.body.title + '</p>' +
            '<p>Message: ' + req.body.message + '</p>'
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
});

router.put("/user/:email", (req, res, next) =>{

})

router.get("/user/:email", (req, res, next) => {
    console.log('Access Get user')
    user.find({ email: req.params.email }).then(documents => {
        res.status(status_ok).json({
            message: "get employee fetched successfully!",
            data: documents,
            timestamp: documents[0]._id.getTimestamp()
        });
        console.log(documents);
        // ObjectId(documents[0]._id).getTimestamp()
    });
});

router.post('/checkout-creditCard', omiseCheckoutCreditCard)
router.post('/checkout-internetBanking', omiseCheckoutInternetBanking)
router.post('/webhooks', omiseWebHooks)
router.get('/bank-charge', getInternetBankingCharge)

router.get("/penalty/:email", (req, res, next) => {
    penalty.find({ email: req.params.email }).then(documents => {
        res.status(status_ok).json({
            message: "get penalty  successfully!",
            data: documents
        });
        console.log(documents);
    });
});


router.post("/penalty/:email", (req, res, next) => {
    const penalty_post = new penalty({
        email: req.body.email,
        hibitScore: req.body.hibitScore,
        cancelJob: req.body.cancelJob,
        acceptJob: req.body.acceptJob,
        rejectOffer: req.body.rejectOffer
    });
    penalty_post.save();
    console.log(penalty_post);
    res.status(status_created).json({
        message: "penalty_post added successful"
    });
});

router.put("/penalty/:email:", (req, res, next) => {
    penalty
        .update({ email: req.params.email, isRead: false }, {
            isRead: true
        })
        .exec();
});

router.get("/review/:portfolioName", (req, res, next) => {
    penalty.find({ portfolioName: req.params.portfolioName }).then(documents => {
        res.status(status_ok).json({
            message: "get penalty  successfully!",
            data: documents
        });
        console.log(documents);
    });
});

router.post("/review", (req, res, next) => {
    const review_post = new review({
        portfolioName: req.body.portfolioName,
        rating: req.body.rating,
        content: req.body.content
    })
    review_post.save()
    console.log(review_post);
    res.status(status_created).json({
        message: "review_post added successful"
    });
});


module.exports = router;