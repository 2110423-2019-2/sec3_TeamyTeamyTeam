import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../components/home";
import Login from "../components/Login/login";
import SignUp from "../components/Signup/signup";
import Search from "../components/search/search";
import Portfolio from "../components/portfolio/portfolio";
import JobOffer from "../components/JobOffer/offer";

export default class Routing extends React.Component{
  constructor(props){
    super(props);
  }
  
  appState = this.props.appState;

  login = (username, uid) => {
    return this.props.login(username, uid)
  }
  render(){
    return (
      <Switch>
        <Route exact path="/home" component={(props) => <Home {...this.props} {...props}/>} />
        <Route path="/login" render={(props) => <Login {...this.props} {...props} />} />
        <Route exact path="/signup" component={(props) => <SignUp {...this.props} {...props}/>} />
        <Route exact path="/search" component={(props) => <Search {...this.props} {...props}/>} />
        <Route exact path="/portfolio/:name" render={(props) => <Portfolio {...this.props} {...props}/>} />
        <Route exact path="/offer" component={(props) => <JobOffer {...this.props} {...props}/>} />
      </Switch>
    );
  }
}
