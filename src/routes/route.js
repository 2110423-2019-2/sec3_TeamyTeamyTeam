import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../components/home";
import Login from "../components/Login/login";
import SignUp from "../components/Signup/signup";
import Search from "../components/search/search";
import Portfolio from "../components/portfolio/portfolio";
import JobOffer from "../components/JobOffer/offer";
import OfferProgress from "../components/offerProgress/offerProgress";
import PhotoHis from "../components/History/photoHis";

export default class Routing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={(props) => <Home {...this.props} {...props}/>} />
        <Route path="/login" render={(props) => <Login {...this.props} {...props} />} />
        <Route exact path="/signup" component={(props) => <SignUp {...this.props} {...props}/>} />
        <Route exact path="/search" component={(props) => <Search {...this.props} {...props}/>} />
        <Route exact path="/portfolio/:name.:pid" render={(props) => <Portfolio {...this.props} {...props}/>} />
        <Route exact path="/offer/:name.:pid" component={(props) => <JobOffer {...this.props} {...props}/>} />
        <Route exact path="/offerProgress/:id.:type.:isAccept" component={(props) => <OfferProgress {...this.props} {...props}/>} />
        <Route path="/photoHis" render={(props) => <PhotoHis {...this.props} {...props}/>} />
      </Switch>
    );
  }
}
