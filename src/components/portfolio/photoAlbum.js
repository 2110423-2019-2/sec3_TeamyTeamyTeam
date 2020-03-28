import React, { Component } from "react";
import Photo from "./photo";

class PhotoCategory extends Component {
  render() {
    const { category, photoList } = this.props;
    return (
      <div className="container-fluid mb-5">
        <h1>{category}</h1>
        <div className="card-columns">
          {photoList.map(photo => (
            <Photo imgLink={photo} />
          ))}
        </div>
        <button className="col-sm-12 mt-3 btn btn-outline-primary">
          See more
        </button>
      </div>
    );
  }
}

export default PhotoCategory;
