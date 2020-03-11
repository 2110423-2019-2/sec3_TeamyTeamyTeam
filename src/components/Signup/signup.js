import React, { Component } from "react";
import auth from "../Login/Firebase/index";
import axios from "axios";
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
      telNo: "",
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
    // console.log(this.state);
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
        gender: "-",
        birthDate: "2000-01-01",
        isPhotographer: false,
        phoneNo: this.state.telNo,
        introduction: "-",
        profileImage: "-",
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
      <section className="section container">
        <div className="columns is-centered">
          <div className="column is-half">
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
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>

                <input
                  className="form-control"
                  type="email"
                  name="email"
                  onChange={this.onChange}
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
        </div>
      </section>
    );
  }
}

export default SignUp;
