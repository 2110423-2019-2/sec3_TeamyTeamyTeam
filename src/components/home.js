/* eslint-disable no-sequences */
/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import "../stylesheets/home.css";
import Proptype from "prop-types";
import { Link } from "react-router-dom";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";

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
                <Image
                  cloudName="teamyteam"
                  publicId="https://res.cloudinary.com/teamyteam/image/upload/v1582038467/samples/animals/three-dogs.jpg"
                  width="300"
                />
                <h1 className="font-weight-bold white-text">
                  PHOMO matching system
                </h1>
                <p className="lead">
                  The best centralized platform to find and hire a photographer
                </p>
                <Link to="/login">
                  <button className="btn btn-outline-light mx-3">
                    Sign in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="btn btn-outline-light mx-3">
                    Sign up
                  </button>
                </Link>
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
