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
<<<<<<< HEAD
      cart: {
        email: "guest@test.com",
        name: "Guest",
        //items: [],
        amount: 100000,
        //totalQty: 0
      },
=======
      email: "guest@test.com",
      name: "test",
      amount: 10000,
>>>>>>> 74acb61c6ee1b02f34194f0983fbce94022cd5c1
      charge: undefined
    };
  }

  change = () =>{
    console.log(this.state.cart)
  }
  createCreditCardCharge = async (email, name, amount, token) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:9000/api/checkout-creditCard",
        data: { email, name, amount, token },
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.data) {
        this.setState({ charge: res.data });
        this.props.clearCart();
      }
    } catch (err) {
      console.log(err);
    }
  };

  createInternetBankingCharge = async (email, name, amount, token) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:9000/api/checkout-internetBanking",
        data: { email, name, amount, token },
        headers: {
          "Content-Type": "application/json"
        }
      });

      const { authorizeUri } = res.data;
      if (authorizeUri) {
        window.location.href = authorizeUri;
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
<<<<<<< HEAD
    const { cart,charge } = this.state;
    return (
      <div className="own-form">
        <div className="cart__summary">
          <h2>Cart Summary</h2>
          <div className="cart-details">
          </div>
        </div>
        <ChekoutCreditCard
          cart={cart}
          createCreditCardCharge={this.createCreditCardCharge}
        />
        <CheckoutInternetBanking
          cart={cart}
          createInternetBankingCharge={this.createInternetBankingCharge}
        />
        <div className="message">
          {charge && (
            <div>
              <h4>Thank you for your payment with credit card.</h4>
              <p>
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
              </p>
            </div>
          )}
        </div>
      
        <button onClick = {this.change}></button>
=======
    const charge = this.charge;
    return (
      <div className="container" style={{ marginTop: "-54px" }}>
        <div className="row h-100 align-items-center">
          <div className="col-12 text-center ">
            <h1 style={{ margin: "5vh" }}>Please select your payment method</h1>
            <ChekoutCreditCard
              createCreditCardCharge={this.createCreditCardCharge}
            />
            <div>
              <CheckoutInternetBanking
                createInternetBankingCharge={this.createInternetBankingCharge}
              />
            </div>
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
                  </p>
                  e
                </div>
              )}
            </div>
          </div>
        </div>
>>>>>>> 74acb61c6ee1b02f34194f0983fbce94022cd5c1
      </div>
    );
  }
}

export default CheckoutPage;
