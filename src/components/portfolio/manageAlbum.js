import React, { Component } from "react";
import UploadedPhoto from "./uploadedPhoto";
import { storage } from "../../firebase";

class manageAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.album.id,
      name: this.props.album.name,
      photoLists: this.props.album.photoLists,
      lastUploadedImg: {
        id: 0,
        name: "",
        url: "",
        tag: "",
        ref: ""
      },
      newName: "",
      uploadProgress: 0,
      isUploading: false,
      isDeleting: false,
      isChangingName: false
    };
    this.imgToBeUpload = this.imgToBeUpload.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.imgInfoChange = this.imgInfoChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeAlbumName = this.changeAlbumName.bind(this);
  }
  // Function ที่ Get ตัวของ URL ทั้งหมด

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

  uploadImage() {
    let { photoLists, lastUploadedImg } = this.state;
    var uploadTask = storage
      .ref()
      .child(
        "images/users/" +
          lastUploadedImg.name +
          "_photoID=" +
          this.state.lastUploadedImg.id +
          "_albumID=" +
          this.state.id
      )
      .put(lastUploadedImg.ref);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const uploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ uploadProgress });
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
              "_photoID=" +
              this.state.lastUploadedImg.id +
              "_albumID=" +
              this.state.id
          };
          this.setState({ lastUploadedImg });
          photoLists.push(lastUploadedImg);
          this.setState({ photoLists });
          this.setState({ isUploading: false });
          //เพิ่มรูปลงdatabaseของuserนั้น ๆ
        });
      }
    );
  }

  imgToBeUpload(e) {
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
    document.getElementById("imgInfoButton" + this.state.id).click();
  }

  handleDelete(id, ref) {
    this.setState({ isDeleting: true });
    let desertRef = storage.ref().child(ref);
    // Delete the file
    desertRef
      .delete()
      .then(() => {
        const photoLists = this.state.photoLists.filter(img => img.id !== id);
        this.setState({ photoLists });
        this.setState({ isDeleting: false });
      })
      .catch(function(error) {
        console.log(error);
        this.setState({ isDeleting: false });
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    e.preventDefault();
  }

  changeAlbumName() {
    this.setState({ name: this.state.newName });
    this.setState({ isChangingName: false });
    //แก้ชื่อalbumในserver/database
  }

  render() {
    return (
      <div className="mb-3">
        <div class="d-flex align-items-center">
          <div class="bd-highlight">
            <h3>
              {this.state.isChangingName ? (
                <input
                  autoFocus
                  type="text"
                  name="newName"
                  maxLength="20"
                  className="form-control"
                  value={this.state.newName}
                  onChange={this.handleChange}
                  onBlur={this.changeAlbumName}
                />
              ) : (
                <span
                  style={{ cursor: "text" }}
                  onDoubleClick={e => {
                    e.stopPropagation();
                    this.setState({ newName: this.state.name });
                    this.setState({ isChangingName: true });
                  }}
                >
                  {this.state.name}
                </span>
              )}
            </h3>
          </div>
          <div class="bd-highlight">
            <a
              href="#"
              className="text-danger"
              onClick={() => this.props.onDelete(this.state.id)}
            >
              <h5>
                <ion-icon name="trash-outline"></ion-icon>
              </h5>
            </a>
          </div>
        </div>

        {/* imgInfo Modal */}
        <div
          className="modal fade"
          id={"imgInfoModal_" + this.state.id}
          data-backdrop="static"
          tabindex="-1"
          role="dialog"
          aria-labelledby={"imgInfoModalLabel_" + this.state.id}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id={"imgInfoModalLabel_" + this.state.id}
                >
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
                  className="btn"
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
          id={"imgInfoButton" + this.state.id}
          data-toggle="modal"
          data-target={"#imgInfoModal_" + this.state.id}
          style={{ display: "none" }}
        >
          <ion-icon name="trash-outline"></ion-icon>Delete
        </button>
        {/* imgInfo Modal */}

        <div className="row">
          {this.state.photoLists.map(img => (
            <UploadedPhoto
              key={img.id.toString()}
              img={img}
              albumID={this.state.id}
              onDelete={this.handleDelete}
              isDeleting={this.state.isDeleting}
            />
          ))}
          <div className="col-lg-3 col-md-4 col-xs-4 ">
            <button
              type="file"
              className="w-100 mx-auto my-auto btn btn-lg btn-purple"
              style={{ height: "180px", borderRadius: "0px" }}
              onClick={() => {
                if (!this.state.isUploading) {
                  document.getElementById("uploader" + this.state.id).click();
                }
              }}
            >
              {this.state.isUploading ? (
                <div
                  class="spinner-border"
                  style={{ color: "#ffffff" }}
                  role="status"
                ></div>
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
              id={"uploader" + this.state.id}
              style={{ display: "none" }}
              onChange={this.imgToBeUpload}
            />
          </div>
        </div>
        {this.props.hasSeperateLine ? <hr /> : ""}
      </div>
    );
  }
}

export default manageAlbum;
