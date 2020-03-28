import React, { Component } from "react";
import Script from "react-load-script";
import axios from "axios";
let OmiseCard;
class payment extends Component {
    constructor(props) {
        super(props);
        this.omiseCardHandler = this.omiseCardHandler.bind(this);
        // eslint-disable-next-line react/no-direct-mutation-state
        // state ของตัว ค่าที่รับจาก Firebase uid เป็น unique id ที่ ใช้ในการทำงานร่วมกับ Firebase และเป็น state ที่เราจะเกิดไว้
        this.state = {
            name: 'JOHN DOE',
            email: 'john.doe@example.com',
            amount: 10000
        };
    }
    handleScriptLoad = () => {
        console.log("Call handleScriptLoad");
        OmiseCard = window.OmiseCard;
        OmiseCard.configure({
            publicKey: "pkey_test_5jbivi6naa2udixoo7y",
            amount: 10000,
            currency: 'thb',
            frameLabel: 'ProMo',
            sumitlabel: 'Pay Now',
            buttonlabel: 'Pay with Omise'
        });
        console.log(window.OmiseCard);
        console.log("6666");
    }

    creditCardConfigure = () => {
            console.log("Call creditCardConfigure");
            OmiseCard.configure({
                defaultPaymentMethod: 'credit_card',
                otherPaymentMethod: []
            });
            OmiseCard.configureButton('#credit-card');
            OmiseCard.attach();
        }
        // 4242-4242-4242-4242
        // John Doe
        // Expiration date
        // 02/2021
    creditCardCharge = async(email, name, amount, token) => {
        console.log("Call creditCardCharge");
        try {
            const res = await axios({
                method: 'post',
                url: 'http://localhost:9000/checkout-credit-card',
                data: {
                    email,
                    name,
                    amount,
                    token
                },
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(console.log("Push data to server"));
            const resData = res.data
            console.log("resData".res.data);
            this.setState({ charge: resData })
        } catch (error) {
            console.log(error)
        }
    }

    omiseCardHandler = () => {
        console.log("Call creditCardCharge");
        OmiseCard.open({
            amount: this.state.amount,
            submitFormTarget: '#checkout-form',
            onCreateTokenSuccess: (token) => {
                /* Handler on token or source creation.  Use this to submit form or send ajax request to server */
                console.log(token)
                this.creditCardCharge(this.state.email, this.state.name, this.state.amount, token)
            },


            onFormClosed: () => {
                /* Handler on form closure. */
            },
        })
    }

    handleClick = e => {
        e.preventDefault()
        this.creditCardConfigure()
        this.omiseCardHandler()
    }

    render() {
        return ( <
            div className = "own-form" >
            <
            Script url = "https://cdn.omise.co/omise.js"
            onLoad = { this.handleScriptLoad }
            />

            <
            form >
            <
            button id = "credit-card"
            className = "btn"
            type = "button"
            onClick = { this.handleClick } >
            Pay with Credit Card <
            /button>  < /
            form > <
            /div>
        );
    }
}
export default payment;