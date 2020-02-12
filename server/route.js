const express = require('express')
const router = express.Router()
const Schema = require('./Schema')

router.post("api/regis", (req, res, next) => {
    const regis_post = new Schema({
        name: req.body.name,
        userName: req.body.username,
        password: req.body.password,
        email: req.body.email,
        authorize: false
    });
    regis_post.save();
    console.log(regis_post);
    res.status(201).json({
        message: "Post added successful"
    });
});

router.get("api/regis", (req, res, next) => {
    Schema.find().then(documents => {
        res.status(200).json({
            message: "Registor fetched successfully!",
            posts: documents
        });
        console.log(documents)
    });
});


router.get("", (req, res, next) => {
    Schema.find().then(documents => {
        res.status(200).json({
            message: "Posts fetched successfully!",
            posts: documents
        });
        console.log(documents)
    });
});

module.exports = router;