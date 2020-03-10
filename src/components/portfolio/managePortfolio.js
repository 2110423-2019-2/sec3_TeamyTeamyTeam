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
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAddPhoto = this.handleAddPhoto.bind(this);
  }

  componentDidMount() {
    //ดึงรูปมาจากdatabase
  }

  handleAddPhoto(e) {
    e.preventDefault();
    document.getElementById("uploader").click();
  }

  handleDelete(e) {
    e.preventDefault();
    window.location.reload(false);
    //ลบรูปตามid
  }

  handleEdit(e) {
    console.log("Edit");
    //แก้tagของรูป
  }

  render() {
    return (
      <div className="section container">
        <h1>
          <ion-icon name="images-outline"></ion-icon> Manage Portfolio
        </h1>
        <div className="row">
          <UploadedPhoto
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
          />
          <UploadedPhoto
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
          />
          <UploadedPhoto
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
          />
          <UploadedPhoto
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
          />
          <UploadedPhoto
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
          />
          <UploadedPhoto
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
          />
          <UploadedPhoto
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
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
