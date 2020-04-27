import React, { Component } from "react";
import Script from "react-load-script";
import { publicKey } from "./keys";
import axios from "axios"
let OmiseCard;

export class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offer: this.props.offer,
      mode: this.props.mode
    }
  }

  pay30 = (id) => {
    console.log("pay30")
    axios
      .post("https://phomo-api.herokuapp.com/api/pay30",{
        id: id,
      })
      .then(res => console.res(res))
      .catch(err => console.error(err));
    window.location.href = "/history"
  }

  pay70 = (id) => {
    console.log("pay70")
    axios
      .post("https://phomo-api.herokuapp.com/api/pay70",{
        id: id,
      })
      .then(res => console.res(res))
      .catch(err => console.error(err));
    window.location.href = "/history"
  }

  componentDidMount(){
    console.log(this.state)
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
    const id = this.state.offer
    const mode = this.state.mode
    OmiseCard.open({
      frameDescription: "Invoice #3847",
      amount: cart.amount,
      onCreateTokenSuccess: token => {
        createCreditCardCharge(cart.email, cart.name, cart.amount, token);
        if(mode == 30) this.pay30(id)
        else if(mode == 70) this.pay70(id)
        console.log("success")
      },
      onFormClosed: () => {console.log("off")}
    });
  };

  checkoutCreditCard = e => {
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
          <ion-icon name="card-outline" size="large" style={{marginRight:"2vh"}}></ion-icon>
          <button
            id="credit-card"
            className="btn btn-outline-dark"
            type="button"
            onClick={this.checkoutCreditCard}
          >
            Pay with Credit Card
          </button>
        </form>
      </div>
    );
  }
}

export default Checkout;
