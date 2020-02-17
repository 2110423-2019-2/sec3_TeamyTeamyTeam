const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const web_route = require("./route")
const cors = require('cors')
const portfolio = require('./schema/portfolio')
const routes = require("./route");


const app = express();
//Top
mongoose
    .connect(
        //"mongodb+srv://max:w2e3lrYEIuHewmb9@cluster0-r60mt.mongodb.net/test?retryWrites=true&w=majority"
        "mongodb+srv://admin01:FwIS4yY0IL2gBBlN@cluster0-vkvxw.mongodb.net/test?retryWrites=true&w=majority"
        //"mongodb+srv://max:Top@cluster0-r60mt.mongodb.net/test?retryWrites=true&w=majority"
        //choose one here
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

//TestUser.save().then(() => console.log("compleate"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", routes);

module.exports = app;