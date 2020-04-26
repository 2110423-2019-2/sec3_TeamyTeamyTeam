import React, { Component } from "react";
import Routing from "./routes/route";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";

import ScrollToTop from "./components/scrollToTop";
import Navbar from "./components/navbar";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      email: "-",
      uid: "-",
      phoneNo: "-",
      isPhotographer: false,
      displayName: "-"
    };

    
  }

  

  loadStorage() {
    var isLogin = false;
    if(localStorage.getItem("isLogin") == "true") isLogin = true
    this.setState({
      isLogin: isLogin,
      email: localStorage.getItem("email"),
      uid: localStorage.getItem("uid"),
      phoneNo: localStorage.getItem("phoneNo"),
      isPhotographer: localStorage.getItem("isPhotographer"),
      displayName: localStorage.getItem("displayName")
    })
  }

  storeStorage(isLogin, email, uid, phoneNo, isPhotographer, displayName) {
    localStorage.setItem("isLogin", isLogin);
    localStorage.setItem("email", email);
    localStorage.setItem("uid", uid);
    localStorage.setItem("phoneNo", phoneNo)
    localStorage.setItem("isPhotographer", isPhotographer)
    localStorage.setItem("displayName", displayName)
  }


  componentDidMount() {
    const ionIconScript = document.createElement("script");

    ionIconScript.src = "https://unpkg.com/ionicons@5.0.0/dist/ionicons.js";
    ionIconScript.async = true;

    document.body.appendChild(ionIconScript);
    
    this.loadStorage();
    console.log(this.state);
  }

  login = (username, uid, phoneNo, isPhotographer, displayName) => {
    this.setState({
      isLogin: true,
      email: username,
      uid: uid,
      phoneNo: phoneNo,
      isPhotographer: isPhotographer,
      displayName: displayName
    });
    this.storeStorage(true, username, uid, phoneNo, isPhotographer, displayName);
  };
  logout = () => {
    this.setState({
      isLogin: false,
      email: "-",
      uid: "-",
      phoneNo: "-"
    });
    this.storeStorage(false, "-", "-", "-", false, "-");
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
