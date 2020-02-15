/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import { Link } from "react-router-dom";

class PortfolioHeader extends Component {
  state = {};
  render() {
    return (
      <header className="header">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-10 mx-auto">
              <div className="row">
                <div className="col-md">
                  <img
                    className="img-fluid"
                    width="400px"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                    alt="Card image cap"
                  />
                </div>
                <div className="col-md">
                  <h1 className="font-weight-light">{this.props.name}</h1>
                  <span className="">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </span>
                  <form className="mt-3">
                    <Link to="../offer">
                      <button className="btn btn-outline-light">
                        Offer Job
                      </button>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default PortfolioHeader;
