const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const web_route = require("./route")

const app = express();
//Top
mongoose
    .connect(
        "mongodb+srv://max:Top@cluster0-r60mt.mongodb.net/test?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




app.use("/api/regis", web_route);

module.exports = app;