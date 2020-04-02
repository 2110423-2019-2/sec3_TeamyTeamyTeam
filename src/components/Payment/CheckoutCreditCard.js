import React, { Component } from "react";
import Script from "react-load-script";


import { publicKey } from "./keys";

let OmiseCard;

export class Checkout extends Component {
  constructor(props) {
    super(props);

  }
  handleScriptLoad = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey,
      frameLabel: "Promo Shop",
      submitLabel: "PAY NOW",
      currency: "thb"
    });
  };

  creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: []
    });
    OmiseCard.configureButton("#credit-card");
    OmiseCard.attach();
  };

  omiseCardHandler = () => {
    console.log("Credit Card --> ",this.props.cart)
    const { cart, createCreditCardCharge } = this.props;
    OmiseCard.open({
      frameDescription: "Invoice #3847",
      amount: cart.amount,
      onCreateTokenSuccess: token => {
        createCreditCardCharge(cart.email, cart.name, cart.amount, token);
      },
      onFormClosed: () => {}
    });
  };

  handleClick = e => {
    e.preventDefault();
    this.creditCardConfigure();
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
          <ion-icon name="card-outline"></ion-icon>
          <button
            id="credit-card"
<<<<<<< HEAD
            className="btn"
=======
            className="btn btn-outline-dark"
>>>>>>> 74acb61c6ee1b02f34194f0983fbce94022cd5c1
            type="button"
            onClick={this.handleClick}
          >
            Pay with Credit Card
          </button>
        </form>
      </div>
    );
  }
}

export default Checkout;
