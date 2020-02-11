const express = require('express')
const router = express.Router()
const Schema = require('./Schema')

router.post("", (req, res, next) => {
    const regis_post = new Schema({
        name: req.params.name,
        userName: req.params.username,
        password: req.params.password,
        email: req.params.email,
        authorize: false
    });
    regis_schema.save();
    console.log(regis_post);
    res.status(201).json({
        message: "Post added successful"
    });
});

router.get("", (req, res, next) => {
    Schema.find().then(documents => {
        res.status(200).json({
            message: "Posts fetched successfully!",
            posts: documents
        });
    });
});
module.exports = router;