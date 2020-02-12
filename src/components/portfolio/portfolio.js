import React, { Component } from "react";
// import { useParams, Link } from "react-router-dom";
import PortfolioHeader from "./portfolio-header";
import PhotoCategory from "./photo-category";
import "../../stylesheets/portfolio.css";

// const PhotographerName = () => {
//   let { name } = useParams();
//   return <p>{name}</p>;
// };

class Portfolio extends Component {
  state = {};

  render() {
    return (
      <div>
        <PortfolioHeader name={this.props.match.params.name} />
        <div className="container-fluid my-4">
          <div className="row">
            {/* <div className="col-md-3">
              <div className="card">
                <img
                  className="card-img-top"
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <PhotographerName />
                  </h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div> */}
            {/* <div className="col-md-9"> */}
            <PhotoCategory category="Portrait" />
            <PhotoCategory category="Landscape" />
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;
