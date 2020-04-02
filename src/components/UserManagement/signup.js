import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { Redirect } from "react-router";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    // eslint-disable-next-line react/no-direct-mutation-state
    // state ของตัว ค่าที่รับจาก Firebase uid เป็น unique id ที่ ใช้ในการทำงานร่วมกับ Firebase และเป็น state ที่เราจะเกิดไว้
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmedPassword: "",
      userType: "Employer",
      displayName: "",
      telNo: "",
      birthDate: new Date().toString().substr(4, 11),
      gender: "Not specify",
      selectedDate: new Date(),
      displayErrors: false,
      redirect: false
    };
  }

  onCheck = () => {
    this.setState({ isChecked: !this.state.isChecked });
  };

  onChange = e => {
    //ตรวจค่าของ name ใน Onchange และ set ค่าตามไปเรื่อยๆ
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleDateChange = selectedDate => {
    this.setState({
      selectedDate
    });
    const birthDate = selectedDate.toString().substr(4, 11);
    this.setState({
      birthDate
    });
  };

  onSubmit = e => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      this.setState({ displayErrors: true });
      return;
    } else if (this.state.password !== this.state.confirmedPassword) {
      window.alert("Password doesn't match");
      return;
    }
    this.setState({ displayErrors: false });
    console.log("success!");
    axios
      .post("http://localhost:9000/api/user", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.email,
        password: this.state.password,
        nationalID: "-",
        gender: this.state.gender,
        birthDate: this.state.birthDate,
        isPhotographer: this.state.userType === "Photographer",
        displayName: this.state.displayName,
        phoneNo: this.state.telNo,
        introduction: "-",
        profileImage:
          "https://firebasestorage.googleapis.com/v0/b/phomo-image.appspot.com/o/newUser.png?alt=media&token=331b27aa-d46b-464e-a10f-8f0af4e40792",
        portfolioID: "-",
        avgRating: -1
      })
      .then(res => {
        console.log(res);
        this.setState({ redirect: true });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div className="container my-5 w-50">
        <form
          onSubmit={this.onSubmit}
          noValidate
          className={this.state.displayErrors ? "displayErrors" : ""}
        >
          <div className="form-group">
            <label>First name</label>

            <input
              className="form-control"
              type="text"
              name="firstName"
              onChange={this.onChange}
              pattern="[a-zA-Z]+"
              maxlength="20"
              required
            />
          </div>

          <div className="form-group">
            <label>Last name</label>

            <input
              className="form-control"
              type="text"
              name="lastName"
              onChange={this.onChange}
              pattern="[a-zA-Z]+"
              maxlength="20"
              required
            />
          </div>

          <div class="form-row">
            <div class="form-group col-auto">
              <div>
                <label>Birth Date</label>
              </div>
              <DatePicker
                className="form-control"
                selected={this.state.selectedDate}
                name="selectedDate"
                dateFormat="dd/MM/yyyy"
                shouldCloseOnSelect={false}
                showYearDropdown
                dropdownMode="select"
                maxDate={new Date()}
                onChange={this.handleDateChange}
                required
              />
            </div>
            <div class="form-group col">
              <div>
                <label>Gender</label>
              </div>
              <select
                id="gender"
                class="form-control"
                name="gender"
                onChange={this.onChange}
                required
              >
                <option selected value="Not specify">
                  Willingly not to specify
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              className="form-control"
              type="email"
              name="email"
              onChange={this.onChange}
              pattern=".+[@].+[.][a-zA-z]+"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              className="form-control"
              type="password"
              name="password"
              onChange={this.onChange}
              pattern="\S+"
              minlength="8"
              maxlength="20"
              required
            />
          </div>

          <div className="form-group">
            <label>Comfimed Password</label>

            <input
              className="form-control"
              type="password"
              name="confirmedPassword"
              onChange={this.onChange}
              pattern="\S+"
              minlength="8"
              maxlength="20"
              required
            />
          </div>

          <div className="form-group">
            <label for="userTypeSelect">User Type</label>
            <select
              class="form-control"
              name="userType"
              id="userTypeSelect"
              onChange={this.onChange}
            >
              <option>Employer</option>
              <option>Photographer</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              {this.state.userType == "Photographer"
                ? "Portfolio's Name"
                : "Display Name"}
            </label>

            <input
              className="form-control"
              type="text"
              name="displayName"
              onChange={this.onChange}
              pattern="[a-zA-Z0-9]+"
              maxlength="20"
              required
            />
          </div>

          <div className="form-group">
            <label>Telephone number.</label>

            <input
              className="form-control"
              type="Telephone number"
              name="telNo"
              onChange={this.onChange}
              required
              pattern="\d+"
              minlength="10"
              maxlength="10"
            />
          </div>

          <div className="form-group form-check">
            <input
              className="form-check-input"
              checked={this.state.isChecked}
              onChange={this.onCheck}
              type="checkbox"
              name="isChecked"
              required
            />
            <lable
              className={
                this.state.isChecked
                  ? "form-check-label"
                  : "form-check-label notChecked"
              }
            >
              I have read and agree to {}
              <a href="/">Term of Service</a>
            </lable>
          </div>
          <input type="submit" className="btn btn-outline-primary" />
          <input type="reset" className="btn btn-outline-secondary mx-3" />
          <p>
            Already registered? <a href="/login">Sign in</a>
          </p>
        </form>
      </div>
    );
  }
}

export default SignUp;
