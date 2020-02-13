import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../components/home";
import Login from "../components/Login/login";
import SignUp from "../components/Signup/signup";
import Search from "../components/search/search";
import Portfolio from "../components/portfolio/portfolio";
import JobOffer from "../components/JobOffer/offer";

export default () => (
  <Switch>
    <Route exact path="/home" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/portfolio/:name" component={Portfolio} />
    <Route exact path="/offer" component={JobOffer} />
  </Switch>
);
