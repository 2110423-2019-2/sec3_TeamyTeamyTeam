import React, { Component } from "react";
import UploadedPhoto from "./uploadedPhoto";
import "../../stylesheets/portfolio.css";
import { storage } from "../../firebase";

class ManagePortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.match.params.name,
      photoLists: [], //เก็บjsonของรูป
      isUploading: false,
      progress: 0,
      lastUploadedImg: {
        id: -1,
        name: "",
        url: "",
        tag: "",
        ref: ""
      }
    };

    this.handleAddPhoto = this.handleAddPhoto.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.imgInfoChange = this.imgInfoChange.bind(this);
    // this.discardImage = this.discardImage.bind(this);
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

  imgInfoChange(e) {
    const { name, value } = e.target;
    this.setState({
      lastUploadedImg: {
        id: this.state.lastUploadedImg.id,
        name: [name] == "name" ? value : this.state.lastUploadedImg.name,
        url: this.state.lastUploadedImg.url,
        tag: [name] == "tag" ? value : this.state.lastUploadedImg.tag,
        ref: this.state.lastUploadedImg.ref
      }
    });
  }

  // discardImage() {
  //   let desertRef = storage.ref().child(this.state.lastUploadedImg.ref);
  //   // Delete the file
  //   desertRef
  //     .delete()
  //     .then(function() {})
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }

  uploadImage() {
    let { photoLists, lastUploadedImg } = this.state;
    var uploadTask = storage
      .ref()
      .child(
        "images/users/" +
          lastUploadedImg.name +
          "_" +
          this.state.lastUploadedImg.id
      )
      .put(lastUploadedImg.ref);
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
          lastUploadedImg = {
            id: this.state.lastUploadedImg.id,
            name: this.state.lastUploadedImg.name,
            url: downloadURL,
            tag: this.state.lastUploadedImg.tag,
            ref:
              "images/users/" +
              lastUploadedImg.name +
              "_" +
              this.state.lastUploadedImg.id
          };
          this.setState({ lastUploadedImg });
          photoLists.push(lastUploadedImg);
          this.setState({ photoLists });
          this.setState({ isUploading: false });
          //เพิ่มรูปลงdatabaseของuserนั้น ๆ
        });
      }
    );
    console.log(this.state.photoLists);
  }

  handleChange(e) {
    let photoFile = e.target.files[0];
    if (photoFile) {
      let imageID = this.state.photoLists[this.state.photoLists.length - 1]
        ? this.state.photoLists[this.state.photoLists.length - 1].id + 1
        : 1;
      this.setState({
        lastUploadedImg: {
          id: imageID,
          name: "Image #" + imageID,
          url: URL.createObjectURL(photoFile),
          tag: "Portrait",
          ref: photoFile
        }
      });
    }
    document.getElementById("imgInfoButton").click();
  }

  render() {
    return (
      <div className="mt-5 container">
        {/* imgInfo Modal */}
        <div
          className="modal fade"
          id="imgInfoModal"
          data-backdrop="static"
          tabindex="-1"
          role="dialog"
          aria-labelledby="imgInfoModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="imgInfoModalLabel">
                  Image Detials
                </h5>
              </div>
              <div className="modal-body">
                <div className="container my-auto">
                  <row>
                    <div
                      className="managePhoto mx-auto"
                      style={{
                        backgroundImage:
                          'url("' + this.state.lastUploadedImg.url + '")',
                        height: "200px",
                        width: "200px"
                      }}
                    ></div>
                  </row>
                  <row>
                    <form>
                      <div class="form-group">
                        <label for="name">Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          name="name"
                          value={this.state.lastUploadedImg.name}
                          aria-describedby="nameHelp"
                          onChange={this.imgInfoChange}
                        />
                        <small id="nameHelp" class="form-text text-muted">
                          Only use alphabet or number not more than 20
                          characters.
                        </small>
                      </div>
                      <div class="form-group">
                        <label for="tag">Tag</label>
                        <select
                          class="form-control"
                          id="tag"
                          name="tag"
                          onChange={this.imgInfoChange}
                        >
                          <option defaultValue>Portrait</option>
                          <option>Wedding</option>
                          <option>Graduation</option>
                          <option>Chaing Mai</option>
                          <option>Chula</option>
                        </select>
                      </div>
                    </form>
                  </row>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  id="modalDismiss"
                  className="btn btn-dangerous"
                  data-dismiss="modal"
                >
                  Discard
                </button>
                <button
                  type="reset"
                  className="btn btn-success"
                  onClick={this.uploadImage}
                  data-dismiss="modal"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn btn-outline-danger"
          id="imgInfoButton"
          data-toggle="modal"
          data-target="#imgInfoModal"
          style={{ display: "none" }}
        >
          <ion-icon name="trash-outline"></ion-icon>Delete
        </button>
        {/* imgInfo Modal */}
        <h1>
          <ion-icon name="images-outline"></ion-icon> Manage Portfolio
        </h1>
        <div className="row">
          {this.state.photoLists.map(img => (
            <UploadedPhoto key={img.id} tag={img.tag} url={img.url} />
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
