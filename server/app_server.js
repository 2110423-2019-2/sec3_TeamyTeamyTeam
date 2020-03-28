const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./route')
const app = express();

var omise = require('omise')({
    'publicKey': 'pkey_test_5jbivi6naa2udixoo7y',
    'secretKey': 'skey_test_5j5a3k4rg8n5vinn88i'
});

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
app.use(cors)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/checkout-credit-card', async(req, res, next) => {
    console.log("Get req");
    console.log(req.params);
    try {
        omise.tokens.retrieve(req.params.token, function(error, token) {
            return omise.customers.create({
                email: 'john.doe@example.com',
                description: 'John Doe (id: 30)',
                card: token.id
            });
        }).then(function(customer) {
            // And we make a charge to actually charge the customer for something.
            console.log(customer.id);
            return omise.charges.create({
                amount: 10000,
                currency: 'thb',
                customer: customer.id
            });

        }).then(function(charge) {

            // This function will be called after a charge is created.

        }).error(function(err) {

            // Put error handling code here.

        }).done();
    } catch (error) {
        console.log(error);
    }

});

app.use("/api", routes)

module.exports = app