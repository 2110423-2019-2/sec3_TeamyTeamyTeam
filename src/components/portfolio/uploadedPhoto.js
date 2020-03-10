import React, { Component } from "react";
class UploadedPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   photoID: 99,
      //   date: ""
    };
  }

  render() {
    const { onDelete, onEdit } = this.props;
    return (
      <div className="col-lg-3 col-md-4 col-xs-4 ">
        <div
          className="modal fade"
          id="deleteModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">
                  Delete Photo
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this photo?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancle
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  //   data-dismiss="modal"
                  onClick={onDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="managePhoto text-center"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/1800994/pexels-photo-1800994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500")'
          }}
        >
          <div className="manageOverlay w-100 h-100 d-flex align-items-center justify-content-center">
            <button className="btn btn-outline-light mr-3">
              <ion-icon name="color-wand-outline"></ion-icon>Edit
            </button>
            <button
              className="btn btn-outline-danger"
              data-toggle="modal"
              data-target="#deleteModal"
            >
              <ion-icon name="trash-outline"></ion-icon>Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadedPhoto;
