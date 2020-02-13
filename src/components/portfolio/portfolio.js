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
            <PhotoCategory category="Portrait" />
            <PhotoCategory category="Landscape" />
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;
