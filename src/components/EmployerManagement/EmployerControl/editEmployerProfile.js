import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../stylesheets/employer.css";
import { storage } from "../../../firebase";

class EditEmployerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.appState.name,
      profilePic:
        "",
      email: this.props.appState.email,
      phoneNo: this.props.appState.phoneNo,
      newPhoneNo: "",
      newProfilePic: null,
      updateSuccess: false,
      isUploading: false,
      uploadSuccess: false,
    };
    this.onChange = this.onChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.imgToBeUpload = this.imgToBeUpload.bind(this);
    this.UpdateProfile = this.UpdateProfile.bind(this);
  }

  componentDidMount(){
    axios.get("https://phomo-api.herokuapp.com/api/user/"+ localStorage.getItem("email"))
    .then( (res) => {
      console.log(res.data.data[0])
      this.setState({profilePic:res.data.data[0].profileImage})
    })
  }


  onChange(e) {
    //ตรวจค่าของ name ใน username และ set ค่าตามไปเรื่อยๆ
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    this.setState({ updateSuccess: false });
  }

  imgToBeUpload(e) {
    let newProfilePic = e.target.files[0];
    if (newProfilePic) {
      this.setState({ newProfilePic });
      this.setState({ profilePic: URL.createObjectURL(newProfilePic) });
    }
    this.setState({ updateSuccess: false });
  }

  uploadImage() {
    this.setState({ uploadSuccess: false });
    var uploadTask = storage
      .ref()
      .child(
        "/profilePic/" + "user" //userคือตามuserที่login
      )
      .put(this.state.newProfilePic);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        this.setState({ isUploading: true });
        document.getElementById("uploader").disabled = true;
        document.getElementById("phoneNoInput").disabled = true;
        document.getElementById("updateBTN").disabled = true;
        document.getElementById("resetBTN").disabled = true;
      },
      (error) => {
        this.setState({ isUploading: false });
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.setState({ profilePic: downloadURL });
          this.setState({ newProfilePic: null });
          this.setState({ isUploading: false });
          this.setState({ uploadSuccess: true });
          document.getElementById("uploader").disabled = false;
          document.getElementById("phoneNoInput").disabled = false;
          document.getElementById("updateBTN").disabled = false;
          document.getElementById("resetBTN").disabled = false;
        }).then( () => {
          console.log('this.state.newPhoneNo',this.state.newPhoneNo)
          if (this.state.newPhoneNo == ""){
            console.log("True >>>>>>> ")
            axios.put("https://phomo-api.herokuapp.com/api/user/" + localStorage.email , {
              imageUrl : this.state.profilePic,
              newPhoneNo : this.props.appState.phoneNo
            });
  
          }else{
            console.log("False >>>>>>> ")
            axios.put("https://phomo-api.herokuapp.com/api/user/" + localStorage.email , {
              imageUrl : this.state.profilePic,
              newPhoneNo : this.state.newPhoneNo
            })
          }
        })
      }
    );
  }

  UpdateProfile() {
    if (
      this.state.newPhoneNo != "" ||
      this.state.newProfilePic != null ||
      !this.state.isUploading
    ) {
      if (this.state.newProfilePic != null) {
        this.uploadImage();
      } else this.setState({ uploadSuccess: true });

      // this.state.newName = this.state.newName != "" ? this.state.newName : this.state.name;
      // this.state.newPhoneNo = this.state.newPhoneNo != "" ? this.state.newPhoneNo : this.state.phoneNo;
      //เอาcommentด้านบนออกด้วย
      //newName ถ้าไม่เป็น empty string ก็จะเปลี่ยนในdatabaseตาม this.state.newName แต่ถ้าempty ก็เอาชื่อเดิม กับnewPhoneNo ก็เหมือนกัน
      //ยกเว้นprofilePic ที่ส่งค่าของ this.state.profilePicไป ไม่ใช่ this.state.newProfilePic
      this.setState({ updateSuccess: true });
    }
  }

  render() {
    return (
      <div className="container-fluid w-50 my-5 ">
        <h1 className="text-purple">
          <ion-icon name="person-outline"></ion-icon> Edit Profile
        </h1>
        <div
          style={{
            visibility:
              this.state.updateSuccess && this.state.uploadSuccess
                ? "visible"
                : "hidden",
            marginBottom:
              this.state.updateSuccess && this.state.uploadSuccess
                ? "1rem"
                : "-45px",
          }}
        >
          <div className="alert alert-success fade show" role="alert">
            Your profile was updated.
          </div>
        </div>

        <div
          className="change-profile-pic mx-auto"
          onClick={() => document.getElementById("uploader").click()}
          style={{
            backgroundImage: 'url("' + this.state.profilePic + '")',
          }}
        >
          <div className="change-profile-pic-overlay  w-100 h-100 d-flex flex-column align-items-center justify-content-center">
            <div className="p-2">
              <span>
                <ion-icon name="color-wand-outline"></ion-icon> Change Profile
                Picture
              </span>
            </div>
          </div>
        </div>
        <input
          type="file"
          id="uploader"
          style={{ display: "none" }}
          onChange={this.imgToBeUpload}
        />
        <form>
          <div className="form-group">
            <label>Phone number</label>
            <input
              id="phoneNoInput"
              className="form-control"
              name="newPhoneNo"
              value={this.state.newPhoneNo}
              onChange={this.onChange}
            />
          </div>
          <div className="text-right">
            <button
              type="button"
              id="updateBTN"
              className="btn btn-purple"
              onClick={this.UpdateProfile}
            >
              {this.state.isUploading ? (
                <div className="spinner-border" role="status"></div>
              ) : (
                <div>Update</div>
              )}
            </button>
            <Link to="/profile/sth">
              <input
                type="reset"
                id="resetBTN"
                className="btn btn-secondary ml-3"
                value="Cancle"
              />
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default EditEmployerProfile;
