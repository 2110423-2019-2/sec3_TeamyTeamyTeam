import React, { Component } from "react";
import auth from "../Login/Firebase/index";
class SignUp extends Component {
  constructor() {
    super();

    // eslint-disable-next-line react/no-direct-mutation-state
    // state ของตัว ค่าที่รับจาก Firebase uid เป็น unique id ที่ ใช้ในการทำงานร่วมกับ Firebase และเป็น state ที่เราจะเกิดไว้
    this.state = {
      email: "",
      password: "",
      currentUser: null,
      message: ""
    };
  }

  onChange = e => {
    //ตรวจค่าของ name ใน Onchange และ set ค่าตามไปเรื่อยๆ
    const { name, value } = e.target;
    //console.log(e.target.name)
    //console.log(e.target.value)
    this.setState({
      [name]: value
    });
    console.log(this.state);
  };
  // ทำการส่งตัวของ การ Login ไปให้กับตัวของ Firebase และ Firebase จะเป็นผู้จัดการที่เหลือให้
  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      this.setState({
        message: error.message
      });
    });
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
      <section className=" container">
        <div className="columns is-centered">
          <div className="column is-half">
            <form onSubmit={this.onSubmit}>
              <div className="field">
                <label className="label">Fullname</label>

                <input className="input" type="Fullname" name="Fullname" />
              </div>

              <div className="field">
                <label className="label">Username</label>

                <input className="input" type="Username" name="Username" />
              </div>

              <div className="field">
                <label className="label">Password</label>

                <input
                  className="input"
                  type="password"
                  name="password"
                  onChange={this.onChange}
                />
              </div>

              <div className="field">
                <label className="label">Comfimed Password</label>

                <input
                  className="input"
                  type="Comfimed Password"
                  name="Comfimed Password"
                />
              </div>

              <div className="field">
                <label className="label">Email</label>

                <input
                  className="input"
                  type="email"
                  name="email"
                  onChange={this.onChange}
                />
              </div>

              <div className="field">
                <label className="label">Telephone number.</label>

                <input
                  className="input"
                  type="Telephone number"
                  name="Telephone number"
                />
              </div>

              <div className="field">
                <input type="radio" value="option1" checked={true} />
                <a> </a> I have read and agree to
                <a tabIndex> Term of Service</a>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link" onClick={this.handleClick}>
                    Submit
                  </button>
                </div>
                <div className="control">
                  <button className="button is-text">Cancel</button>
                </div>
                Already have registered
                <a href="/signup">
                  <a> Login? </a>
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default SignUp;
