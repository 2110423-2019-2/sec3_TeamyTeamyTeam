import React, { Component } from "react";
import auth from "../Login/Firebase/index";
class SignUp extends Component {
  constructor() {
    super();

    // eslint-disable-next-line react/no-direct-mutation-state
    // state ของตัว ค่าที่รับจาก Firebase uid เป็น unique id ที่ ใช้ในการทำงานร่วมกับ Firebase และเป็น state ที่เราจะเกิดไว้
    this.state = {
      isChecked: false,
      email: "",
      password: "",
      currentUser: null,
      message: ""
    };
  }

  onCheck = e => {
    this.setState({ isChecked: !this.state.isChecked });
  };

  onChange = e => {
    //ตรวจค่าของ name ใน Onchange และ set ค่าตามไปเรื่อยๆ
    const { name, value } = e.target;
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({
      [name]: value
    });
    // console.log(this.state);
  };
  // ทำการส่งตัวของ การ Login ไปให้กับตัวของ Firebase และ Firebase จะเป็นผู้จัดการที่เหลือให้
  onSubmit = e => {
    e.preventDefault();

    if (this.state.isChecked) {
      const { email, password } = this.state;
      auth
        .createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
          // Handle Errors here.
          this.setState({
            message: error.message
          });
        });
    }
  };
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user
        });
      }
    });
  }
  render() {
    return (
      <section className="section container">
        <div className="columns is-centered">
          <div className="column is-half">
            <form onSubmit={this.onSubmit}>
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
                  className="input"
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
                />
              </div>

              <div className="form-group">
                <input
                  type="checkbox"
                  checked={this.state.isChecked}
                  onChange={this.onCheck}
                  name="isChecked"
                  required
                />
                {} I have read and agree to
                <a> Term of Service</a>
              </div>
              <button className="btn btn-outline-primary">Submit</button>
              <button className="btn btn-outline-secondary mx-3">Cancel</button>
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
