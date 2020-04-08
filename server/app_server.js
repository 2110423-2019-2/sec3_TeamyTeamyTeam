const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./route')
const app = express();

mongoose
    .connect(
        'mongodb+srv://admin01:FwIS4yY0IL2gBBlN@cluster0-vkvxw.mongodb.net/test?retryWrites=true&w=majority'
    )
    .then(() => {
        console.log('Connected to database!')
    })
    .catch(() => {
        console.log('Connection failed!')
    })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/api", routes)

app.use(cors)

module.exports = app