import React, { Component } from "react";
import UploadedPhoto from "./uploadedPhoto";
import "../../stylesheets/portfolio.css";
import { storage } from "../../firebase";

class ManagePortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.match.params.name,
      photoLists: [
        "https://images.pexels.com/photos/1800994/pexels-photo-1800994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
      ], //เก็บjsonของรูป
      isUploading: false,
      progress: 0
    };

    this.handleAddPhoto = this.handleAddPhoto.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    //ดึงรูปมาจากdatabase
  }

  handleAddPhoto(e) {
    e.preventDefault();
    if (!this.state.isUploading) {
      document.getElementById("uploader").click();
    }
  }

  handleChange(e) {
    let photoFile = e.target.files[0];
    if (photoFile) {
      var uploadTask = storage
        .ref()
        .child("images/" + photoFile.name)
        .put(photoFile);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
          this.setState({ isUploading: true });
        },
        error => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log("File available at", downloadURL);
            let { photoLists } = this.state;
            photoLists.push(downloadURL);
            this.setState({ isUploading: false });
            this.setState({ photoLists });
            //append list ใน database ของ photographer นั้น ๆ
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="section container">
        <h1>
          <ion-icon name="images-outline"></ion-icon> Manage Portfolio
        </h1>
        <div className="row">
          {this.state.photoLists.map(img => (
            <UploadedPhoto key={img} tag={"Wedding"} imgLink={img} />
          ))}
          <div className="col-lg-3 col-md-4 col-xs-4 ">
            <button
              type="file"
              className="w-100 mx-auto my-auto btn btn-lg btn-yellow"
              style={{ height: "180px", borderRadius: "0px" }}
              onClick={this.handleAddPhoto}
            >
              {this.state.isUploading ? (
                this.state.progress + "%"
              ) : (
                <div>
                  Add Photo
                  <ion-icon
                    style={{ margin: "0.5rem" }}
                    name="add-circle-outline"
                  ></ion-icon>
                </div>
              )}
            </button>

            <input
              type="file"
              id="uploader"
              style={{ display: "none" }}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ManagePortfolio;
