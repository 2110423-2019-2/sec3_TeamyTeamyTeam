/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import { Link } from "react-router-dom";

class PortfolioHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingStar: [],
    };
  }

  getOfferLink = () => {
    return "/offer/" + this.props.name;
  };

  generateStar() {
    const fullStar = Math.floor(this.props.rating);
    const halfStar = Math.round(this.props.rating - fullStar);
    const emptyStar = 5 - fullStar - halfStar;
    console.log(fullStar, halfStar, emptyStar);
    let ratingStar = [];
    for (let i = 0; i < fullStar; i++) {
      ratingStar.push(
        <ion-icon
          key={i.toString()}
          style={{ color: "#ffa135" }}
          name="star"
        ></ion-icon>
      );
    }
    for (let j = 0; j < halfStar; j++) {
      ratingStar.push(
        <ion-icon
          key={(fullStar + j).toString()}
          style={{ color: "#ffa135" }}
          name="star-half"
        ></ion-icon>
      );
    }
    for (let k = 0; k < emptyStar; k++) {
      ratingStar.push(
        <ion-icon
          key={(fullStar + halfStar + k).toString()}
          name="star-outline"
        ></ion-icon>
      );
    }
    console.log(ratingStar);
    return ratingStar;
  }

  render() {
    const { name, profilePic, headerCoverImage, totalReview } = this.props;
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
          backgroundRepeat: "no-repeat",
          marginTop: "-54px",
        }}
      >
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-10 mx-auto">
              <div className="row">
                <div className="col-md-4">
                  <div className="img-round">
                    <img className="img-fluid" src={profilePic} alt={name} />
                  </div>
                </div>
                <div className="col-md-8 my-auto">
                  <h1 className="font-weight-light">{name}</h1>
                  {totalReview > 0 ? (
                    <h5>
                      {this.generateStar().map((star) => star)} (
                      <a href="/" className="text-light">
                        {totalReview}
                      </a>
                      )
                    </h5>
                  ) : null}
                  <span className="">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </span>
                  <form className="mt-3">
                    <Link to={this.getOfferLink()}>
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
