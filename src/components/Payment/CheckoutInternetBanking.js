import React, { Component } from "react";
import Script from "react-load-script";

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

  omiseInternetBankingHandler = () => {
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

  checkoutInternetBanking = e => {
    e.preventDefault();
    this.internetBankingConfigure();
    this.omiseInternetBankingHandler();
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
          <ion-icon name="wifi-outline" size="large" style={{marginRight:"2vh"}}></ion-icon>
          <button
            id="internet-banking"
            className="btn btn-outline-dark"
            type="button"
            onClick={this.checkoutInternetBanking}
          >
            Pay with Internet Banking / Others
          </button>
        </form>
      </div>
    );
  }
}

export default CheckoutInternetBanking;
