import React, { Component } from "react";
import Routing from "./routes/route";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
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
