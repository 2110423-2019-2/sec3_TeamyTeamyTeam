import React, { Component } from "react";
import { Link } from "react-router-dom";

class PortfolioHeader extends Component {
  render() {
    const { name, profilePic, headerCoverImage } = this.props;
    const headerCoverImageCSS = "url(" + headerCoverImage + ")";
    return (
      <header
        className="header"
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), " +
            headerCoverImageCSS,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-10 mx-auto">
              <div className="row" style={{ marginTop: "-54px" }}>
                <div className="col-md">
                  <img
                    className="img-fluid"
                    width="400px"
                    src={profilePic}
                    alt={name}
                  />
                </div>
                <div className="col-md">
                  <h1 className="font-weight-light">{name}</h1>
                  <span className="">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </span>
                  <form className="mt-3">
                    <Link to="../offer">
                      <button className="btn btn-outline-light">
                        Offer {name} Job
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
