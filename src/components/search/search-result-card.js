import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchResultCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Photographer's Name"
    };
  }

  render() {
    const portfilioLink = "/portfolio/" + this.props.name;
    return (
      <div className="col-md-4 mb-5">
        <div className="card">
          <img
            className="card-img-top"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{this.props.name}</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <Link to={portfilioLink} className="btn btn-primary">
              See {this.props.name}'s Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResultCard;
