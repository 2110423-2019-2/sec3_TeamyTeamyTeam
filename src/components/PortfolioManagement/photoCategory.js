import React, { Component } from "react";
import Photo from "./photo";

class PhotoCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxNumberOfPhoto: 2,
    };
    this.increaseNumberOfPhoto = this.increaseNumberOfPhoto.bind(this);
  }

  increaseNumberOfPhoto() {
    let { maxNumberOfPhoto } = this.state;
    maxNumberOfPhoto =
      this.props.photoList.length - 2 > 2
        ? maxNumberOfPhoto + 2
        : this.props.photoList.length;
    this.setState({ maxNumberOfPhoto });
    console.log(maxNumberOfPhoto);
  }

  render() {
    const { category, photoList } = this.props;
    return (
      <div className="container-fluid mb-5">
        <h1>{category}</h1>
        <div className="card-columns">
          {photoList
            .filter((photo, index) => index < this.state.maxNumberOfPhoto)
            .map((photo, index) => (
              <Photo key={index.toString()} imgLink={photo} />
            ))}
          {photoList.length > this.state.maxNumberOfPhoto ? (
            <div className="mb-3">
              <button
                className="btn btn-purple btn-block d-inline-block"
                style={{ minHeight: "220px", borderRadius: "0" }}
                onClick={this.increaseNumberOfPhoto}
              >
                See more +{photoList.length - this.state.maxNumberOfPhoto}
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default PhotoCategory;
