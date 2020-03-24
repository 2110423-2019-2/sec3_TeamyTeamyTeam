import React, { Component } from "react";
class UploadedPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.img.id,
      name: this.props.img.name,
      url: this.props.img.url,
      tag: this.props.img.tag,
      ref: this.props.img.ref
    };
    // this.handleEdit = this.handleEdit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { photo } = this.props;
    if (photo !== nextProps.photo) {
      return true;
    }
    return false;
  }

  // handleEdit(e) {}

  // handleChange(e) {
  //   const { name, value } = e.target;
  //   this.setState({
  //     [name]: value
  //   });
  //   console.log(value);
  //   e.preventDefault();
  // }

  render() {
    return (
      <div className="col-lg-3 col-md-4 col-xs-4 ">
        {/* Delete Modal */}
        {/* <div
          className="modal fade"
          id="deleteModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
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
                  data-dismiss="modal"
                  onClick={() => document.getElementById("deleteIMG").click()}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div> */}
        {/* End Delet Modal, Edit Modal */}
        <div
          className="modal fade"
          id="editModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="editModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">
                  Edit photo's tags
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
                <form>
                  <div class="form-group">
                    <label for="exampleFormControlSelect1">Tags</label>
                    <select
                      class="form-control"
                      id="tagSelection"
                      name="tag"
                      onChange={this.handleChange}
                    >
                      <option>Graduation</option>
                      <option>Wedding</option>
                      <option>Landscape</option>
                      <option>Portrait</option>
                    </select>
                  </div>
                </form>
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
                  className="btn btn-success"
                  onClick={this.handleEdit}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* End Edit Modal */}
        <div
          className="managePhoto text-center"
          style={{
            backgroundImage: 'url("' + this.props.img.url + '")'
          }}
        >
          <div className="manageOverlay w-100 h-100 d-flex flex-column align-items-center justify-content-center">
            <div class="p-2">
              {this.state.name} /{" "}
              <span
                className="badge badge-secondary"
                style={{ backgroundColor: "#ffa135" }}
              >
                {this.state.tag}
              </span>
            </div>
            <div class="p-2">
              <button
                className="btn btn-outline-light mr-3"
                data-toggle="modal"
                data-target="#editModal"
              >
                <ion-icon name="color-wand-outline"></ion-icon>Edit
              </button>
              <button
                className="btn btn-outline-danger"
                // data-toggle="modal"
                // data-target="#deleteModal"
                onClick={() =>
                  this.props.onDelete(this.state.id, this.state.ref)
                }
              >
                <ion-icon name="trash-outline"></ion-icon>Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadedPhoto;
