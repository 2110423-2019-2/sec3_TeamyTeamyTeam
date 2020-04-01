import React, { Component } from "react";
import axios from "axios";

import ChekoutCreditCard from "./CheckoutCreditCard";
import CheckoutInternetBanking from "./CheckoutInternetBanking";

// Card 4242-4242-4242-4242
//name test 
// 02/21  
// Security code 333

export class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'guest@test.com',
      name: 'test',
      amount: 10000,
      charge: undefined
    };
  }

  createCreditCardCharge = async (email, name, amount, token) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:9000/checkout-creditCard",
        data: { email, name, amount, token },
        headers: {
          "Content-Type": "application/json"
        }
      }).then(console.log("active post --> createCreditCardCharge"));

      if (res.data) {
        this.setState({ charge: res.data});
        this.props.clearCart()
      }
    } catch (err) {
      console.log(err);
    }
  };

  createInternetBankingCharge = async (email, name, amount, token) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:9000/checkout-internetBanking",
        data: { email, name, amount, token },
        headers: {
          "Content-Type": "application/json"
        }
      }).then(console.log("active post --> createInternetBankingCharge"));

      const { authorizeUri } = res.data;
      if (authorizeUri) {
        window.location.href = authorizeUri;
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const charge = this.charge ;
    return (
      <div className="has-text-centered">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 text-center ">
              <h1 style={{margin:"5vh"}}>Please select your payment method</h1>
                <ChekoutCreditCard
                    createCreditCardCharge={this.createCreditCardCharge}
                  />
                <div>
                  <CheckoutInternetBanking
                    createInternetBankingCharge={this.createInternetBankingCharge}
                  /></div>
                <div className="message">
                  {charge && (
                  <div>
                    <h4>Thank you for your payment with credit card.</h4>
                    <p>
                      Your payment amount is{" "}
                        <span
                          className={
                          charge.status === "successful"
                          ? "success"
                          : charge.status === "failed"
                          ? "failed"
                          : "pending"
                          }
                        >
                          {charge.status}
                        </span>
                    </p>e
                  </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default CheckoutPage;
