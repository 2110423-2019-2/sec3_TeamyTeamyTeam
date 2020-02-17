import React, { Component } from "react";
import Routing from "./routes/route";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
// import MdHeart from "react-ionicons/lib/MdHeart";

import ScrollToTop from "./components/scrollToTop";
import Navbar from "./components/navbar";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      email: "",
      password: ""
    }
  }
  login = (username, uid) => {
    this.setState({
      isLogin: true,
      email: username,
      password: uid
    })
  }
  logout = () => {
    this.setState({
      isLogin: false,
      email: "",
      password: ""
    })
  }
  render() {
    return (
      <div>
        <Navbar appState = {this.state} login = {this.login.bind(this)} logout = {this.logout.bind(this)}/>
        <ScrollToTop />
        <Routing appState = {this.state} login = {this.login.bind(this)} logout = {this.logout.bind(this)}/>
      </div>
    );
  }
}

export default App;
