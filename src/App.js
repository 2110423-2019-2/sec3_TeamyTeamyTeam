import React, { Component } from "react";
import Routing from "./routes/route";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";

import ScrollToTop from "./components/scrollToTop";
import Navbar from "./components/navbar";
import cookie from 'react-cookies';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      email: "-",
      uid: "-",
    };
  }

  

  loadStorage() {
    var isLogin = false;
    if(localStorage.getItem("isLogin") == "true") isLogin = true
    this.setState({
      isLogin: isLogin,
      email: localStorage.getItem("email"),
      uid: localStorage.getItem("uid")
    })
  }

  storeStorage(isLogin, email, uid, token) {
    localStorage.setItem("isLogin", isLogin);
    localStorage.setItem("email", email);
    localStorage.setItem("uid", uid);
  }


  componentDidMount() {
    const ionIconScript = document.createElement("script");

    ionIconScript.src = "https://unpkg.com/ionicons@5.0.0/dist/ionicons.js";
    ionIconScript.async = true;

    document.body.appendChild(ionIconScript);
    
    this.loadStorage();
    console.log(this.state);
  }

  login = (username, uid, token) => {
    this.setState({
      isLogin: true,
      email: username,
      uid: uid,
    });
    this.storeStorage(true, username);
  };
  logout = () => {
    this.setState({
      isLogin: false,
      email: "-",
      uid: "-",
    });
    this.storeStorage(false, "-", "-");
  };

  render() {
    return (
      <div>
        <Navbar
          appState={this.state}
          login={this.login.bind(this)}
          logout={this.logout.bind(this)}
        />
        <ScrollToTop />
        <Routing
          appState={this.state}
          login={this.login.bind(this)}
          logout={this.logout.bind(this)}
        />
      </div>
    );
  }
}

export default App;
