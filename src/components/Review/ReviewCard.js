import React, { Component } from "react";

import "../../stylesheets/review.css";

class ReviewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      reviewer: "I dunno who?",
      review: "Good Job",
      rating: 3.7,
    };
    this.generateStar = this.generateStar.bind(this);
  }

  generateStar() {
    const fullStar = Math.floor(this.state.rating);
    const halfStar = Math.round(this.state.rating - fullStar);
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
    return (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="card my-auto">
          <div className="card-body">
            <p
              className="text-review text-center text-truncate"
              style={{ fontSize: "2rem" }}
            >
              "{this.state.review}"
            </p>
            <p className="text-center">
              {this.generateStar().map((star) => star)}
            </p>
            <p className="text-secondary text-right">{this.state.reviewer}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewCard;
