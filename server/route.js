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
// const mongo = require('mongodb').MongoClient
// const ObjectId = require('mongodb').ObjectID
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

createPenalty = (email) => {
    const penalty_post = new penalty({
        email: email,
        hibitScore: 100,
        acceptOffer: 0,
        declineOffer: 0,
    })
    console.log(penalty_post)
    penalty_post.save()
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
            albums:[],
            minBath: -1,
            maxBath: -1
        });
        portfolio_post.save();
        console.log(portfolio_post);
        createPenalty(req.body.email)
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
        if (documents.length > 1) {
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
        .sort({_id: -1})
        .then(documents => {
            res.status(status_ok).json({
                message: "Get Offer successfully!",
                data: documents,
            });
            console.log(documents)
        })

});

router.post("/offer", (req, res, next) => {
    const offer_post = new offer({
        title: req.body.title,
        photographerID: req.body.photographerID,
        portfolioName: req.body.portfolioName, // portfolioName == portfolioID
        portfolioEmail: req.body.portfolioEmail,
        employerEmail: req.body.employerEmail,
        employerName: req.body.employerName,
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
    notify.find({ email: req.params.email }).sort({_id: 1}).then(documents => {
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
        penalty.update({email: repliedOffer.portfolioEmail},{$inc: {
            'acceptOffer': 1,
            'hibitScore': 1
        }}).exec()
        console.log("already scoring penalty")
    })
    notify.update({redirectLink: req.body.id},{
        isReply: false
    }).exec()
});
router.post("/employerAccept", (req, res, next) => {
    offer.update({_id: req.body.id},{
        progress: 3,
    }).exec();
    offer.findOne({_id: req.body.id}).then(repliedOffer => {
        createNotify(
            repliedOffer.portfolioEmail,
            repliedOffer.title + ": " + "Waiting payment",
            req.body.id,
            false
        )
        createNotify(
            repliedOffer.employerEmail,
            repliedOffer.title + ": " + "Waiting payment",
            req.body.id,
            false
        )
    })
    notify.update({redirectLink: req.body.id},{
        isReply: false
    }).exec()
});

router.post("/pay30", (req, res, next) => {
    offer.update({_id: req.body.id},{
        progress: 4,
    }).exec();
    offer.findOne({_id: req.body.id}).then(repliedOffer => {
        createNotify(
            repliedOffer.portfolioEmail,
            repliedOffer.title + ": " + "Waiting appointment",
            req.body.id,
            false
        )
        createNotify(
            repliedOffer.employerEmail,
            repliedOffer.title + ": " + "Waiting appointment",
            req.body.id,
            false
        )
    })
    notify.update({redirectLink: req.body.id},{
        isReply: false
    }).exec()
});

router.post("/pay70", (req, res, next) => {
    console.log("pay the rest")
    offer.update({_id: req.body.id},{
        progress: 6,
    }).exec();
    offer.findOne({_id: req.body.id}).then(repliedOffer => {
        createNotify(
            repliedOffer.portfolioEmail,
            repliedOffer.title + ": " + "Waiting your uploading",
            req.body.id,
            false
        )
        createNotify(
            repliedOffer.employerEmail,
            repliedOffer.title + ": " + "Waiting photographer upload your photo",
            req.body.id,
            false
        )
    })
});

router.post("/uploadFile", (req, res, next) => {
    console.log("upload file")
    offer.update({_id: req.body.id},{
        progress: 7,
        resultURL: req.body.resultURL
    }).exec();
    offer.findOne({_id: req.body.id}).then(repliedOffer => {
        createNotify(
            repliedOffer.portfolioEmail,
            repliedOffer.title + ": " + "Complete",
            req.body.id,
            false
        )
        createNotify(
            repliedOffer.employerEmail,
            repliedOffer.title + ": " + "Complete",
            req.body.id,
            false
        )
    })
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
        if(req.body.isPhotographer){
            penalty.update({email: repliedOffer.portfolioEmail},{$inc: {
                'declineOffer': 1,
                'hibitScore': -1
            }}).exec()
            console.log("already scoring penalty")
        }
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
// 'Api to uploadImage() in editEmployee profile'
router.put("/user/:email", (req, res, next) =>{
    console.log('Api to uploadImage() in editEmployee profile')
    user.find({ email: req.params.email }).then(documents => {
        res.status(status_ok).json({
            message: "get penalty  successfully!",
        });
        console.log(documents);
        console.log(req.body.imageUrl)
        documents[0].profileImage = req.body.imageUrl
        documents[0].phoneNo = req.body.newPhoneNo
        documents[0].save()

    });
        //doc.imageURLs = req.body.photoLists
        //doc.save();
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

/*router.get("/penalty/:email", (req, res, next) => {
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
});*/


router.get("/review/:portfolioName", (req, res, next) => {
    review.find({ portfolioName: req.params.portfolioName }).then(documents => {
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

// ----------------------------------- New Feature ----------------------------------- //


router.get("/album/:portfolioID", (req, res, next) => {
    console.log('Api to ChangeAlbumName() by obj_id & getAllPhoto() get picture array  in manageAlbum req',req.params)
    album.find({ portfolioID: req.params.portfolioID }).then(documents => {
        res.status(status_ok).json({
            message: "get album successfully!",
            data: documents
        });
        console.log('Print doc from get album',documents);
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


// Api to uploadImage() & DeletePhoto() 
router.put("/album/:portfolioID", (req, res, next) => {
    console.log('Api to uploadImage() & DeletePhoto()  in ManagePortfolio')
    console.log('req.body._id',req.body._id)
    album.findById(req.body._id, function (err, doc) {
        if (err) {
            res.status(status_ok).json({
                message: "Fail to put portfolio album!",
            });
        }
        // console.log('req.body.photoLists',req.body.photoLists)
        // console.log('doc.imageURLs',doc.imageURLs)
        doc.imageURLs = req.body.photoLists
        doc.save();
    });
});
// Api to componentDidMount() in ManagePortfolio 
router.get("/portfolio/:email", (req, res, next) => {
    console.log('Api to get componentDidMount() in ManagePortfolio ',req.params.email)
    portfolio.find({ email: req.params.email }).then(documents => {
            res.status(status_ok).json({
                message: "get portfolio in portfolio config successfully!",
                data: documents[0]
            });
            console.log(documents[0]);
    });
});

// Api to put in ManagePortfolio
router.put("/portfolio/", (req, res, next) => { 
    console.log('Api to put in ManagePortfolio')
    console.log(req.body)
    portfolio.findById(req.body._id, function (err, doc) {
        if (err) {
            res.status(status_ok).json({
                message: "Fail to put portfolio album!",
                data: documents[0]
            });
        }
        
        doc.albums.push(req.body.album_id);
        doc.save();
        // refresh 
        // doc.albums = []
        // doc.save();
        
      });
});

// Delete From DeleteAlbum(id) ManagePortfolio
router.put("/portfolio/delete", (req, res, next) => { 
    console.log('Api to DeleteAlbum(id) put("/portfolio/delete in ManagePortfolio',req.body)
    portfolio.findById(req.body._id, function (err, doc) {
        if (err) {
            res.status(status_ok).json({
                message: "Fail to put portfolio album!",
            });
        }
        console.log(req.body.album_id)
        console.log(doc.albums)
        if (req.body.album_id.length == 0  ){
            console.log('True',req.body.album_id)
            doc.albums = []
            doc.save();
        }else {
            console.log('False',req.body.album_id)
            doc.albums = req.body.album_id ;
            doc.save();
        }
      });
});


router.put("/portfolio/tag/", (req, res, next) => {
    console.log('Api to add portfolio tags() in ManagePortfolio')
    console.log(req.body._id)
    portfolio.findById(req.body._id, function (err, doc) {
        if (err) {
            res.status(status_ok).json({
                message: "Fail to put tag portfolio album!",
            });
        }
        console.log(req.body.tags)
        if (!doc.tags.includes(req.body.tags)){
            doc.tags.push(req.body.tags)
            doc.save();
        }
    });
});



router.put("/album/name/:obj_id", (req, res, next) => {
    console.log('Api to  ChangeAlbumName() name put in manageAlbum')
    console.log(req.params)
    album.findById(req.params.obj_id, function (err, doc) {
        if (err) {
            res.status(status_ok).json({
                message: "Fail to put album!",
            });
        }
        console.log(doc)
        doc.albumName = req.body.albumName ;
        doc.save();
    });
})


// DeleteAlbum(id) delete portfolio in ManagePortfolio
router.delete('/album/:portfolioID', (req, res, next) =>{
    console.log('delete',req.params.portfolioID)
    try {
        album.findByIdAndDelete(req.params.portfolioID).exec()
    }catch{
    }
})



// Api to componentDidMount() >> getPortfolio() in Portfolio 
router.get("/portfolio/id/:id", (req, res, next) => {
    console.log('Api to componentDidMount() >> getPortfolio() in Portfolio',req.params)
    portfolio.find({ _id: req.params.id }).then(documents => {
            res.status(status_ok).json({
                message: "get portfolio in portfolio config successfully!",
                data: documents[0]
            });
            console.log(documents[0]);
    });
});




// Test print all album
// router.get("/album/", (req, res, next) => {
//     console.log('Print All')
//     album.find().then(documents => {
//         res.status(status_ok).json({
//             message: "get album successfully!",
//             data: documents
//         });
//         console.log(documents);
//     });
// });


// router.delete('/album', (req, res, next) =>{
//     console.log('Delete test all album')
//     album.deleteMany({},res =>{
//         res.status(status_ok).json({
//             message: "delete album successfully!",
//         });
//     })
// })

module.exports = router;