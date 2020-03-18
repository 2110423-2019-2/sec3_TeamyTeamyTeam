/* eslint-disable no-sequences */
/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import "../stylesheets/home.css";
import Proptype from "prop-types";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: false,
      real_uid: ""
    };
    // eslint-disable-next-line no-unused-expressions
    this.tranfered_uid = this.props.tranfered_uid;
    // this.setUidValue()
  }

  render() {
    return (
      <div className="has-text-centered">
        <div className="bg">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12 text-center ">
                <h1>PHOMO matching system</h1>
                <p className="lead">
                  The best centralized platform to find and hire a photographer
                </p>
                {this.props.appState.isLogin ? (
                  <Link to="/search">
                    <button className="btn btn-lg btn-yellow shadow">
                      <i className="mr-3" style={{ fontSize: "24px" }}>
                        <ion-icon name="search-sharp"></ion-icon>
                      </i>
                      Let's match your preferred photographer!
                    </button>
                  </Link>
                ) : (
                  <div>
                    <Link to="/login">
                      <button className="btn btn-outline-light mx-3">
                        <i className="mr-2">
                          <ion-icon name="person-outline"></ion-icon>
                        </i>
                        Sign in
                      </button>
                    </Link>
                    <Link to="/signup">
                      <button className="btn btn-outline-light mx-3">
                        <i className="mr-2">
                          <ion-icon name="person-add-outline"></ion-icon>
                        </i>
                        Sign up
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.Proptype = {
  tranfered_uid: Proptype.string
};

export default Home;

// setUidValue() {
//   if (this.state.tranfered_uid !== '') {
//     console.log('In if function')
//     console.log(this.tranfered_uid)
//     this.setState({
//       islogin: true
//     })
//   }
//   console.log('Pass function')
// }
