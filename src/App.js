import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Routing from "./routes/route";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import $ from "jquery";
// import MdHeart from "react-ionicons/lib/MdHeart";

import ScrollToTop from "./components/scrollToTop";
import Navbar from "./components/navbar";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <ScrollToTop />
        <Routing />
      </div>
    );
  }
}

export default App;
