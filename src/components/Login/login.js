/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
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
    e.preventDefault();
    if (!e.target.checkValidity()) {
      this.setState({ displayErrors: true });
      return;
    }
    this.setState({ displayErrors: false });
    axios
      .get(
        "http://localhost:9000/api/login/" +
          this.state.email +
          "." +
          this.state.password
      )
      .then(res => {
        console.log(res);
        const email = res.data.data[0].email;
        const uid = res.data.data[0]._id;
        this.props.login(email, uid);
        this.setState({ redirect: true });
      })
      .catch(err => console.error(err));
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
        </div>
      </section>
    );
  }
}

export default LoginForm;
