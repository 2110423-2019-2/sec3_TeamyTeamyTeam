import React, { Component } from "react";
import Routing from "./routes/route";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import ScrollToTop from "./components/scrollToTop";
import Navbar from "./components/navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    const ionIconScript = document.createElement("script");

    ionIconScript.src = "https://unpkg.com/ionicons@5.0.0/dist/ionicons.js";
    ionIconScript.async = true;

    document.body.appendChild(ionIconScript);
  }

  login = (username, uid) => {
    this.setState({
      isLogin: true,
      email: username,
      password: uid
    });
  };
  logout = () => {
    this.setState({
      isLogin: false,
      email: "",
      password: ""
    });
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
