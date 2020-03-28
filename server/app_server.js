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

const {
    omiseCheckoutCreditCard,
    omiseCheckoutInternetBanking,
    omiseWebHooks,
    getInternetBankingCharge
} = require('./controller/paymentControl');

app.post('/checkout-creditCard', omiseCheckoutCreditCard)
app.post('/checkout-internetBanking', omiseCheckoutInternetBanking)
app.post('/webhooks', omiseWebHooks)
app.get('/bank-charge', getInternetBankingCharge)

app.use("/api", routes)

app.use(cors)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app