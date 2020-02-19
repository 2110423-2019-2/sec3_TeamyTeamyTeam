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

/*const photographer1 = new portfolio({
    portfolioName: "photographer1",
    email: "photographer1@example.com",
    tags: ["portrait", "wedding"],
    minBath: 10,
    maxBath: 100
});
photographer1.save();

const photographer2 = new portfolio({
    portfolioName: "photographer2",
    email: "photographer2@example.com",
    tags: ["graduate"],
    minBath: 20,
    maxBath: 200
});
photographer2.save();

const photographer3 = new portfolio({
    portfolioName: "photographer3",
    email: "photographer3@example.com",
    tags: ["graduate","wedding"],
    minBath: 30,
    maxBath: 300
});
photographer3.save()

const real = new portfolio({
    portfolioName: "Nictrak",
    email: "ntrakarnvanich@yahoo.com",
    tags: ["portrait", "graduate", "wedding"],
    minBath: 50,
    maxBath: 500
});
real.save();*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", routes);

module.exports = app;