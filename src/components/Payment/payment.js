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
      cart: {
        email: "guest@test.com",
        name: "Guest",
        //items: [],
        amount: 100000
        //totalQty: 0
      },
      charge: undefined
    };
  }

  change = () => {
    console.log(this.state.cart);
  };
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
=======
    const { cart, charge } = this.state;
>>>>>>> 964973d3d071bed6a20b453ca119944418f5721f
    return (
      <div className="own-form">
        <div className="cart__summary">
          <h2>Cart Summary</h2>
          <div className="cart-details"></div>
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
<<<<<<< HEAD
      
        <button onClick = {this.change}></button>
=======

        <button onClick={this.change}></button>
>>>>>>> 964973d3d071bed6a20b453ca119944418f5721f
      </div>
    );
  }
}

export default CheckoutPage;
