/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import auth from "./Firebase/index";
import Home from "../home";
import axios from "axios";
import { Redirect } from "react-router";
class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    // eslint-disable-next-line react/no-direct-mutation-state
    // state ของตัว ค่าที่รับจาก Firebase uid เป็น unique id ที่ ใช้ในการทำงานร่วมกับ Firebase และเป็น state ที่เราจะเกิดไว้
    this.state = {
      displayErrors: false,
      email: "",
      password: "",
      currentUser: null,
      uid: "",
      message: "",
      redirect: false
    };
  }

  onChange = e => {
    //ตรวจค่าของ name ใน username และ set ค่าตามไปเรื่อยๆ
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    axios
      .get(
        "http://localhost:9000/api/user/" +
          this.state.email +
          "." +
          this.state.password
      )
      .then(res => {
        console.log(res);
        const email = res.data.data[0].email;
        const password = res.data.data[0].password;
        this.props.login(email, password);
        this.setState({ redirect: true });
      })
      .catch(err => console.error(err));
    e.preventDefault();
  };

  render() {
    const { message, currentUser, uid } = this.state;
    //ถ้ามีการ login สำเร็จเราก็จะไปที่หน้่า Logout
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <section className="section container">
        <div className="columns is-centered">
          <div className="column is-half">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Email</label>
                <div className="control">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    onChange={this.onChange}
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
        </div>
        <h3>
          Login test id: yolo@example.com
          <li> Password : 123456 </li>
        </h3>
        <h4>
          Hello {this.props.appState.email} {this.props.appState.password}
        </h4>
      </section>
    );
  }
}

export default LoginForm;
