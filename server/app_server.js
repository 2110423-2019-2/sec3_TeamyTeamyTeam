const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./route')
const app = express();
const offer = require("./schema/offer");
var cron = require('node-cron');

dropIfTimeOut = (off) => {
    const appointment = Date.parse(off.actDate)
    const currentDate = new Date()
    if(appointment < currentDate){
        offer.drop({_id: off._id})
    }
}

passAppointment = (off) => {
    const appointment = Date.parse(off.actDate)
    const currentDate = new Date()
    if(appointment < currentDate){
        offer.update({_id: off._id},{
            progress: 5
        }).exec()
    }
}

dropNotPay = () => {
    console.log("Dropping offers which not have been paid 30%")
    offer.find({progress: 3}).then(documents => {
        documents.map(dropIfTimeOut)
    })
}

passAppointments = () => {
    console.log("Changing offer's progress to 5")
    offer.find({progress: 4}).then(documents => {
        documents.map(passAppointment)
    })
}


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
mongoose.set('useFindAndModify', true)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/api", routes)

app.use(cors)

cron.schedule('*/10 * * * *', dropNotPay);
cron.schedule('*/10 * * * *', passAppointments);

module.exports = app