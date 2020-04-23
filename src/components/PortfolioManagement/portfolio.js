import React, { Component } from "react";
import PortfolioHeader from "./portfolioHeader";
import PhotoCategory from "./photoCategory";
import ReviewCard from "../Review/ReviewCard";
import { Link } from "react-router-dom";
import axios from "axios"
import "../../stylesheets/portfolio.css";

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photographerName: this.props.match.params.name,
      pid: '-',
      profilePic:
        "https://firebasestorage.googleapis.com/v0/b/phomo-image.appspot.com/o/newUser.png?alt=media&token=331b27aa-d46b-464e-a10f-8f0af4e40792",
      portfolioLink: "/portfolio/" + this.props.name,
      photoList: [],
      rating: 3.7,
      reviewList: [1, 2, 3, 4, 5, 6, 7],
      headerCoverImage:
        "https://images.pexels.com/photos/590029/pexels-photo-590029.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    };
  }

  componentDidMount() {
    //Fetch photographer data in this function and then update the state
    //Write something to fetch data e.g. profile's pic, and photos
    // this.setState({profilePic: });
    // this.setState({headerCoverImage: });
    //photoList Sample
    let photoList = [];
    photoList.push(
      "https://images.pexels.com/photos/1800994/pexels-photo-1800994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    );
    photoList.push(
      "https://images.pexels.com/photos/999515/pexels-photo-999515.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    );
    photoList.push(
      "https://images.pexels.com/photos/997512/pexels-photo-997512.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    );
    photoList.push(
      "https://images.pexels.com/photos/773371/pexels-photo-773371.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    );
    photoList.push(
      "https://images.pexels.com/photos/1553783/pexels-photo-1553783.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    );
    this.setState({ photoList });
  }


  render() {
    return (
      <div>
        <a href={this.state.photographerName + "/" + "edit"}>
          <button
            className="btn btn-md btn-primary position-fixed m-3"
            style={{ right: "0", bottom: "0" }}
          >
            <ion-icon name="settings-outline"></ion-icon> Edit Portfolio
          </button>
        </a>

        <PortfolioHeader
          key={this.state.photographerName}
          name={this.state.photographerName}
          profilePic={this.state.profilePic}
          headerCoverImage={this.state.headerCoverImage}
          rating={this.state.rating}
          totalReview={this.state.reviewList.length}
        />
        {this.state.reviewList.length > 0 ? (
          <div
            className="container-fluid my-4"
            style={{ height: "230px", maxHeight: "230px" }}
          >
            <h1>Reviews</h1>
            <div className="row flex-row flex-nowrap overflow-auto">
              {this.state.reviewList.map((review, index) => (
                <ReviewCard key={index.toString()} />
              ))}
            </div>
          </div>
        ) : null}
        <div className="container-fluid my-4">
          <div className="row">
            {/* If there is more than 1 category we have to map this */}
            <PhotoCategory
              key={1}
              category="Photo"
              photoList={this.state.photoList}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;
