import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchResultCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photographerName: this.props.name,
      profilePic:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      portfolioLink: "/portfolio/" + this.props.name
    };
  }

  render() {
    return (
      <div className="col-md-4 mb-5">
        <div className="card">
          <img
            className="card-img-top"
            src={this.state.profilePic}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{this.state.photographerName}</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <Link to={this.state.portfolioLink} className="btn btn-primary">
              See {this.state.photographerName}'s Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResultCard;
