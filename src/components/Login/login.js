/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import auth from "./Firebase/index";
import Home from "../home";
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
      message: ""
    };
  }

  onChange = e => {
    //ตรวจค่าของ name ใน username และ set ค่าตามไปเรื่อยๆ
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };
  // ทำการส่งตัวของ การ crete Signup ไปให้กับตัวของ Firebase และ Firebase จะเป็นผู้จัดการที่เหลือให้
  onSubmit = e => {
    this.setState({ displayErrors: false });
    const { email, password } = this.state;
    auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.setState({
          currentUser: res.user,
          uid: res.user.uid
        });
        //console.log(res.user.uid)
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  };

  logout = e => {
    // จัดการกับการทำงานของ login out
    e.preventDefault();
    auth.signOut().then(response => {
      this.setState({
        currentUser: null,
        uid: ""
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
    const { message, currentUser, uid } = this.state;
    //ถ้ามีการ login สำเร็จเราก็จะไปที่หน้่า Logout
    if (currentUser) {
      return (
        //อันนี้จะเป็นส่วนที่ เราอยากจะส่ง state ไปให้กับ Home ให้ Home อัพเดทค่า และใช้ state นี้ในการทำการทำงานต่อ ผ่าน UID ได้
        <div>
          <h1>
            <p>Hello {currentUser.email}</p>
            <button onClick={this.logout}>Logout</button>
          </h1>
          <Home tranfered_uid={uid} />
          {/* บอกว่าเราจะส่งหน้า render ของ Home ไป(อันนี้เรายังไม่ได้แก้ให้ Code มันทำวานได้ แค่ให้เห็น state */}
        </div>
      );
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
              Cancel
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
      </section>
    );
  }
}

export default LoginForm;
