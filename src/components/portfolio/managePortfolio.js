import React, { Component } from "react";
import UploadedPhoto from "./uploadedPhoto";
import "../../stylesheets/portfolio.css";

class ManagePortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.match.params.name,
      photoLists: [] //เก็บjsonของรูป
    };

    this.handleAddPhoto = this.handleAddPhoto.bind(this);
  }

  componentDidMount() {
    //ดึงรูปมาจากdatabase
  }

  handleAddPhoto(e) {
    e.preventDefault();
    document.getElementById("uploader").click();
  }

  render() {
    return (
      <div className="section container">
        <h1>
          <ion-icon name="images-outline"></ion-icon> Manage Portfolio
        </h1>
        <div className="row">
          <UploadedPhoto
            photoID={99}
            tag={"Wedding"}
            imgLink="https://images.pexels.com/photos/1800994/pexels-photo-1800994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          />
          <UploadedPhoto
            photoID={99}
            tag={"Wedding"}
            imgLink="https://images.pexels.com/photos/1800994/pexels-photo-1800994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          />
          <UploadedPhoto
            photoID={99}
            tag={"Wedding"}
            imgLink="https://images.pexels.com/photos/1800994/pexels-photo-1800994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          />
          <UploadedPhoto
            photoID={99}
            tag={"Wedding"}
            imgLink="https://images.pexels.com/photos/1800994/pexels-photo-1800994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          />
          <UploadedPhoto
            photoID={99}
            tag={"Wedding"}
            imgLink="https://images.pexels.com/photos/1800994/pexels-photo-1800994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          />
          <div className="col-lg-3 col-md-4 col-xs-4 ">
            <button
              type="file"
              className="w-100 mx-auto my-auto btn btn-lg btn-primary"
              style={{ height: "180px", borderRadius: "0px" }}
              onClick={this.handleAddPhoto}
            >
              Add Photo
              <ion-icon
                style={{ margin: "0.5rem" }}
                name="add-circle-outline"
              ></ion-icon>
            </button>
            <input type="file" id="uploader" style={{ display: "none" }} />
          </div>
        </div>
      </div>
    );
  }
}

export default ManagePortfolio;
