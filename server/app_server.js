const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./express_route/route");

const app = express();
//w2e3lrYEIuHewmb9
mongoose
    .connect(
        //"mongodb+srv://max:w2e3lrYEIuHewmb9@cluster0-r60mt.mongodb.net/test?retryWrites=true&w=majority"
        "mongodb+srv://admin01:FwIS4yY0IL2gBBlN@cluster0-vkvxw.mongodb.net/test?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });




TestUser.save().then(() => console.log("compleate"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//     );
//     next();
// });

//app.use("/api/posts", postsRoutes);
app.use("/api", userRoutes);
module.exports = app;