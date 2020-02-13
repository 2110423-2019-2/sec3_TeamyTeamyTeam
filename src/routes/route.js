import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import SignUp from "../pages/Signup/signup";
import Search from "../components/search/search";
import Portfolio from "../components/portfolio/portfolio";
import JobOffer from "../pages/JobOffer/offer";

export default () => (
  <Switch>
    <Route exact path="/home" component={Home} />
    {<Route exact path="/login" component={Login} /> }
    {<Route exact path="/signup" component={SignUp} /> }
    <Route exact path="/search" component={Search} />
    <Route exact path="/portfolio/:name" component={Portfolio} />
    <Route exact path="/offer" component={JobOffer}/>
  </Switch>
);
