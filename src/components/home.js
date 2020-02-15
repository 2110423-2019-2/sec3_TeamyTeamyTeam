/* eslint-disable no-sequences */
/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'
import '../stylesheets/home.css'
import Proptype from "prop-types"

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      islogin: false,
      real_uid: ''
    }
    // eslint-disable-next-line no-unused-expressions
    this.tranfered_uid = this.props.tranfered_uid
    // this.setUidValue()
  }


  render() {
    return (
      console.log(this.state),
      <div className="Home">
        <div className="has-text-centered">
          <div className="bg">
            <div className="container h-100">
              <div className="row h-100 align-items-center">
                <div className="col-12 text-center ">
                  <h1 className="font-weight-bold white-text">
                    PHOMO matching system
                  </h1>
                  <p className="lead">
                    The best centralized platform to find and hire a
                    photographer
                  </p>
                  <div style={{ marginTop: '5vh', marginBottom: '2vh' }}>
                    <a href="/login">
                      <button
                        className="btn btn-outline-light"
                        style={{ margin: '2vh' }}
                      >
                        Sign in
                      </button>
                    </a>
                    <a href="/signup">
                      <button
                        className="btn btn-outline-light"
                        style={{ margin: '2vh' }}
                      >
                        Sign up
                      </button>
                    </a>
                  </div>
                  <div>
                    <a href="/search">Login as guest</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}



Home.Proptype = {
  tranfered_uid: Proptype.string,
}

export default Home


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