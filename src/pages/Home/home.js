import React, { Component } from 'react';
import "./home.css"

class Home extends Component {
  constructor(props) {
      super(props)
      this.state = { apiResponse: "" }
  }

  callAPI() {
      fetch("http://localhost:9000/")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }))
          .then(res => console.log(this.setState.apiResponse));
  }

  componentWillMount() {
      this.callAPI();
  }
  
  
  render   () {
    return (
      <div className = "Home">
        <div className="has-text-centered">
          <div class="bg">
            <div class="container h-100">
              <div class="row h-100 align-items-center">
                <div class="col-12 text-center ">
                  <h1 class="font-weight-bold white-text">PHOMO matching system</h1>
                  <p class="lead">The best centralized platform to find and hire a photographer</p>
                  <div style={{marginTop:"5vh", marginBottom:"2vh"}}>
                    <a href="/login" ><button className="btn btn-outline-dark" style={{margin:"2vh"}}>Sign in</button></a>
                    <a href="/signup"><button className="btn btn-outline-dark" style={{margin:"2vh"}}>Sign up</button></a>
                  </div>
                  <div>
                    <a href="/search">Login as guest</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="App-intro">{this.state.apiResponse}</p>
        </div>
      </div>
    );
  }
}

export default Home ;