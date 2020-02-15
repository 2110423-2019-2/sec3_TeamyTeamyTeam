import React, { Component } from "react";
import PortfolioHeader from "./portfolio-header";
import PhotoCategory from "./photo-category";
import "../../stylesheets/portfolio.css";

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photographerName: this.props.match.params.name,
      profilePic:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      portfolioLink: "/portfolio/" + this.props.name,
      photoList: [],
      headerCoverImage:
        "https://images.pexels.com/photos/590029/pexels-photo-590029.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
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
        <PortfolioHeader
          name={this.state.photographerName}
          profilePic={this.state.profilePic}
          headerCoverImage={this.state.headerCoverImage}
        />
        <div className="container-fluid my-4">
          <div className="row">
            {/* If there is more than 1 category we have to map this */}
            <PhotoCategory category="Photo" photoList={this.state.photoList} />
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;
