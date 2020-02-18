import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../components/home";
import Login from "../components/Login/login";
import SignUp from "../components/Signup/signup";
import Search from "../components/search/search";
import Portfolio from "../components/portfolio/portfolio";
import JobOffer from "../components/JobOffer/offer";

export default class Routing extends React.Component {
  constructor(props) {
    super(props);
  }

  appState = this.props.appState;

  login = (username, uid) => {
    return this.props.login(username, uid);
  };
  render() {
    return (
      <Switch>
        <Route exact path="/home" component={() => <Home />} />
        <Route path="/login" render={() => <Login {...this.props} />} />
        <Route exact path="/signup" component={() => <SignUp />} />
        <Route exact path="/search" component={() => <Search />} />
        <Route
          exact
          path="/portfolio/:name"
          render={props => <Portfolio {...props} />}
        />{" "}
        />
        <Route exact path="/offer" component={() => <JobOffer />} />
      </Switch>
    );
  }
}
