import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  onSingout = e => {
    this.props.logout();
  };

  userManagement = isLogin => {
    if (isLogin)
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <p className="nav-link">{this.props.appState.email}</p>
          </li>
          <li className="nav-item">
            <p className="nav-link" onClick={this.onSingout}>
              Sign out
            </p>
          </li>
        </ul>
      );
    else
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Sign in
            </Link>
          </li>
          <span className="navbar-text d-none d-lg-block">/</span>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">
              Sign up
            </Link>
          </li>
        </ul>
      );
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <Link className="navbar-brand" style={{ minHeight: "0" }} to="#">
          PHOMO
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">
                Search
              </Link>
            </li>
          </ul>
          {this.userManagement(this.props.appState.isLogin)}
        </div>
      </nav>
    );
  }
}
