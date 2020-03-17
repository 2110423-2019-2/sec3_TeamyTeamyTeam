import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../components/home";
import Login from "../components/Login/login";
import SignUp from "../components/Signup/signup";
import Search from "../components/search/search";
import Portfolio from "../components/Portfolio/portfolio";
import JobOffer from "../components/JobOffer/offer";
import OfferProgress from "../components/offerProgress/offerProgress";
import PhotoHis from "../components/History/photoHis";
import ManagePortfolio from "../components/Portfolio/managePortfolio";
import Employer from "../components/Employer/employer";
import EditEmployerProfile from "../components/Employer/editEmployerProfile";

export default class Routing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={props => <Home {...this.props} {...props} />}
        />
        <Route
          path="/login"
          render={props => <Login {...this.props} {...props} />}
        />
        <Route
          exact
          path="/signup"
          component={props => <SignUp {...this.props} {...props} />}
        />
        <Route
          exact
          path="/search"
          component={props => <Search {...this.props} {...props} />}
        />
        <Route
          exact
          path="/portfolio/:name"
          render={props => <Portfolio {...this.props} {...props} />}
        />
        <Route
          exact
          path="/offer/:name"
          component={props => <JobOffer {...this.props} {...props} />}
        />
        <Route
          exact
          path="/offerProgress/:id.:type.:isAccept"
          component={props => <OfferProgress {...this.props} {...props} />}
        />
        <Route
          path="/history"
          render={props => <PhotoHis {...this.props} {...props} />}
        />
        <Route
          exact
          path="/portfolio/:name/edit"
          render={props => <ManagePortfolio {...this.props} {...props} />}
        />
        <Route
          exact
          path="/employer"
          render={props => <Employer {...this.props} {...props} />}
        />
        <Route
          exact
          path="/editEmployerProfile"
          render={props => <EditEmployerProfile {...this.props} {...props} />}
        />
      </Switch>
    );
  }
}
