/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
class Photo extends Component {
  state = {};
  render() {
    return (
      <div className="mb-3">
        <a href={this.props.imgLink} target="_blank">
          <img
            className="img-fluid"
            src={this.props.imgLink}
            alt="Card image cap"
          />
        </a>
      </div>
    );
  }
}

export default Photo;
