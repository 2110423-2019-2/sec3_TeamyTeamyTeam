/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
// import auth from "./Firebase/index";
// import Home from "../home";
import axios from "axios";
import { Redirect } from "react-router";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayErrors: false,
      email: "",
      password: "",
      currentUser: null,
      uid: "",
      message: "",
      redirect: false,
    };
  }

  onChange = (e) => {
    //ตรวจค่าของ name ใน username และ set ค่าตามไปเรื่อยๆ
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      this.setState({ displayErrors: true });
      return;
    }
    this.setState({ displayErrors: false });
    axios
      .get(
        "https://phomo-api.herokuapp.com/api/login/" +
          this.state.email +
          "." +
          this.state.password
      )
      .then((res) => {
        console.log(res);
        const email = res.data.data[0].email;
        const uid = res.data.data[0]._id;
        const phoneNo = res.data.data[0].phoneNo;
        const isPhotographer = res.data.data[0].isPhotographer;
        const displayName = res.data.data[0].displayName
        this.props.login(email, uid, phoneNo, isPhotographer, displayName);
        this.setState({ redirect: true });
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { message, currentUser, uid } = this.state;
    //ถ้ามีการ login สำเร็จเราก็จะไปที่หน้่า Logout
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div className="container mt-5 w-50">
        <h1 className="text-purple">
          <ion-icon name="person-outline"></ion-icon> Sign in
        </h1>
        <form
          onSubmit={this.onSubmit}
          noValidate
          className={this.state.displayErrors ? "displayErrors" : ""}
        >
          <div className="form-group">
            <label>Email</label>
            <div className="control">
              <input
                className="form-control"
                type="email"
                name="email"
                onChange={this.onChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="control">
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={this.onChange}
                required
              />
            </div>
          </div>
          {message ? <p className="help is-danger">{message}</p> : null}
          <input type="submit" className="btn btn-outline-primary" />
          <input type="reset" className="btn btn-outline-secondary mx-3" />
          <p>
            Have any account yet? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    );
  }
}

export default LoginForm;
