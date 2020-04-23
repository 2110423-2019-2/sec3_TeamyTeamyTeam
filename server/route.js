const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose")
const portfolio = require("./schema/portfolio");
const user = require("./schema/user");
const offer = require("./schema/offer");
const notify = require("./schema/notify");
const penalty = require("./schema/penalty");
const review = require("./schema/review");
const album = require("./schema/album");
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

createNotify = (email, content, redirectLink, isReply) => {
    const notify_post = new notify({
        email: email,
        content: content,
        redirectLink: redirectLink,
        isRead: false,
        isReply: isReply
    })
    console.log(notify_post)
    notify_post.save()
}

getPortfolioIDFromName = (name) => {
    portfolio.findOne({portfolioName: name}).then(document => {
        return document.portfolioName
    })
}

getPortfolioNameFromID = (id) => {
    portfolio.findOne({_id: id}).then(document => {
        return document.portfolioName
    })
}

getPortfolioEmailFromName = (name) => {
    portfolio.findOne({portfolioName: name}).then(document => {
        return document.email
    })
}

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

router.get("/portfolio", (req, res, next) => {
    portfolio.find().then(documents => {
        res.status(status_ok).json({
            message: "Get portfolio successfully!",
            data: documents
        });
        console.log(documents);
    });
});

router.get("/portfolioNameToID/:name", (req, res, next) => {
    portfolio.findOne({portfolioName: req.params.name}).then(documents => {
        res.status(status_ok).json({
            message: "Get portfolio successfully!",
            data: documents.portfolio
        });
        console.log(documents);
    });
});

router.get("/portfolioNameToEmail/:name", (req, res, next) => {
    portfolio.findOne({portfolioName: req.params.name}).then(portfolio => {
        res.status(status_ok).json({
            message: "Get portfolio successfully!",
            data: portfolio.email
        });
        console.log(user);
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

router.get("/offerid/:id", (req, res, next) => {
    offer.find({ _id: req.params.id }).then(documents => {
        res.status(status_ok).json({
            message: "Get offer successfully!",
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

router.get("/offerHistory/:email", (req, res, next) => {
    offer
        .find({ $or: [{ employerEmail: req.params.email }, { portfolioEmail: req.params.email }] })
        .sort({ 'created_at' : -1 })
        .then(documents => {
            res.status(status_ok).json({
                message: "Get Offer successfully!",
                data: documents,
            });
        })

});

router.post("/offer", (req, res, next) => {
    const offer_post = new offer({
        title: req.body.title,
        photographerID: req.body.photographerID,
        portfolioName: req.body.portfolioName, // portfolioName == portfolioID
        portfolioEmail: req.body.portfolioEmail,
        employerEmail: req.body.employerEmail,
        style: req.body.style,
        actDate: req.body.actDate, // data_tag in server !!!
        meetUpTime: req.body.meetUpTime, // meetUpTime เวลาที่มาเจอกัน
        location: req.body.location,
        progress: req.body.progress,
        optionalRequest: req.body.optionalRequest, // Text_block สำหรับการคุยคร่าวๆ
        fee: -1,
        resultURL: '-'
    });
    console.log(offer_post)
    offer_post.save()
    res.status(status_created).json({
        message: "Post offer added successful"
    });
    createNotify(
        req.body.portfolioEmail,
        req.body.title + ": " + "Waiting your reply, plese reply by clicking the below button",
        offer_post._id,
        true
    )
    createNotify(
        req.body.employerEmail,
        req.body.title + ": " + "Waiting photographer's reply",
        offer_post._id,
        false
    )
});

router.post("/notify", (req, res, next) => {
    const notify_post = new notify({
        email: req.body.email,
        content: req.body.content,
        redirectLink: req.body.redirectLink,
        isRead: false,
        isReply: req.body.isReply
    })
    console.log(notify_post)
    notify_post.save()
    res.status(status_created).json({
        message: "Post notify added successful"
    });
})

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

router.post("/photographerAccept", (req, res, next) => {
    offer.update({_id: req.body.id},{
        progress: 2,
        fee: req.body.fee
    }).exec();
    offer.findOne({_id: req.body.id}).then(repliedOffer => {
        createNotify(
            repliedOffer.portfolioEmail,
            repliedOffer.title + ": " + "Waiting employer reply",
            req.body.id,
            false
        )
        createNotify(
            repliedOffer.employerEmail,
            repliedOffer.title + ": " + "Waiting your reply, plese reply in history page",
            req.body.id,
            false
        )
    })
    notify.update({redirectLink: req.body.id},{
        isReply: false
    }).exec()
});

router.post("/declineOffer", (req, res, next) => {
    offer.findOne({_id: req.body.id}).then(repliedOffer => {
        createNotify(
            repliedOffer.portfolioEmail,
            repliedOffer.title + ": " + "Offer is declined",
            req.body.id,
            false
        )
        createNotify(
            repliedOffer.employerEmail,
            repliedOffer.title + ": " + "Offer is declined",
            req.body.id,
            false
        )
        offer.remove({_id: req.body.id},() => {
            console.log("remove declined offer complete")
        })
    })
    notify.update({redirectLink: req.body.id},{
        isReply: false
    }).exec()
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

router.put("/penalty/:email", (req, res, next) => {
    penalty
        .update({ email: req.params.email, isRead: false }, {
            isRead: true
        })
        .exec();
    });


// Api to getAlbum() in manageAlbum
router.get("/album/:portfolioID", (req, res, next) => {
    console.log('Api to getAlbum() in manageAlbum')
    console.log('Api to getAlbum() in manageAlbum',req.params)
    album.find({ portfolioID: req.params.portfolioID }).then(documents => {
        res.status(status_ok).json({
            message: "get album successfully!",
            data: documents
        });
        console.log(documents);
    });
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

// Api to uploadImage() in manageAlbum
router.post("/album/:portfolioID", (req, res, next) => {
    console.log('Api to uploadImage() in manageAlbum')
    console.log(req.body)
    const album_post = new album({
        albumName: req.body.albumName,
        portfolioID: req.body.portfolioID,
        imageURLs: req.body.imageURLs
    });
    album_post.save();
    console.log('album_post',album_post);
    res.status(status_created).json({
        message: "Post album successful"
    });
});

// Api to uploadImage() & DeletePhoto() & ChangeAlbumName()in manageAlbum || DeleteAlbum() & AddAlbum() in ManagePortfolio
router.put("/album/:portfolioID", (req, res, next) => {
    console.log('Api to uploadImage() & DeletePhoto() & ChangeAlbumName()in manageAlbum || DeleteAlbum() & AddAlbum() in ManagePortfolio')
    // album
    //     .update({ albumName: req.params.albumName, portfolioID:portfolioID ,imageURLs:req.params.imageURLs },
    //     {
    //         albumName: req.params.albumName, portfolioID:portfolioID ,imageURLs:req.params.imageURLs 
    //     })
    //     .exec().then(res => {
    //         res.status(status_created).json({
    //             message: "Post album successful"
    //         });
    //     });
    });

// Api to componentDidMount() in ManagePortfolio --> need to test to send real one
router.get("/portfolio/:email", (req, res, next) => {
    console.log('Api to componentDidMount() in ManagePortfolio --> need to test to send real one',req.params.email)
    portfolio.find({ email: req.params.email }).then(documents => {
            res.status(status_ok).json({
                message: "get portfolio in portfolio config successfully!",
                data: documents
            });
            console.log();
    });
});

// Api to componentDidMount() in ManagePortfolio --> need to test to send real one
router.put("/portfolio/:email", (req, res, next) => { 
    console.log('Api to componentDidMount() in ManagePortfolio --> need to test to send real one')
    // album
    //     .update({ albumName: req.params.email, isRead: false }, {
    //         isRead: true
    //     })
    //     .exec().then(res => {
    //         res.status(status_created).json({
    //             message: "Post album successful"
    //         });
    //     });
});



module.exports = router;