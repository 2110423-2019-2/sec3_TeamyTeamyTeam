import React, { Component } from 'react';

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
       <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.apiResponse}</p>
    </div>   
    );
  }
}

export default Home ;
