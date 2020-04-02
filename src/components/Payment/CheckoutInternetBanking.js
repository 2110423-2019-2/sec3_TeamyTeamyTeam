import React, { Component } from "react";
import Script from "react-load-script";
import "../../stylesheets/creditCard.css";

import { publicKey } from "./keys";

let OmiseCard

export class CheckoutInternetBanking extends Component {
  constructor(props) {
    super(props);
  }
  handleScriptLoad = () => {
    OmiseCard = window.OmiseCard
    OmiseCard.configure({
      publicKey,
      frameLabel: "Promo Shop",
      submitLabel: "PAY NOW",
      currency: "thb"
    });
  };

  internetBankingConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "internet_banking",
      otherPaymentMethods: [
        "bill_payment_tesco_lotus",
        "alipay",
        "pay_easy",
        "net_banking",
        "convenience_store"
      ]
    })
    OmiseCard.configureButton("#internet-banking");
    OmiseCard.attach();
  };

  omiseCardHandler = () => {
    const { cart, createInternetBankingCharge } = this.props;
    console.log("Cart" , cart)
    OmiseCard.open({
      frameDescription: "Invoice #3847",
      amount: cart.amount,
      onCreateTokenSuccess: token => {
        createInternetBankingCharge(cart.email, cart.name, cart.amount, token);
      },
      onFormClosed: () => {}
    });
  };

  handleClick = e => {
    e.preventDefault();
    this.internetBankingConfigure();
    this.omiseCardHandler();
  };

  render() {
    const { cart } = this.props;
    return (
      <div className="own-form">
        <Script
          url="https://cdn.omise.co/omise.js"
          onLoad={this.handleScriptLoad}
        />
        <form>
          <button
            id="internet-banking"
            className="btn internet-banking"
            type="button"
            onClick={this.handleClick}
          >
            Pay with Internet Banking / Others
          </button>
        </form>
      </div>
    );
  }
}

export default CheckoutInternetBanking;
