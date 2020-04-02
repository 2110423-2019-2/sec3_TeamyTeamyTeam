import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../components/home";
import Login from "../components/UserManagement/signin";
import SignUp from "../components/UserManagement/signup";
import Search from "../components/search/search";
import Portfolio from "../components/portfolio/portfolio";
import JobOffer from "../components/JobManagement/createOffer";
import PhotoHis from "../components/JobManagement/jobHistory";
import ManagePortfolio from "../components/portfolio/managePortfolio";
import Employer from "../components/UserManagement/Employer/employer";
import EditEmployerProfile from "../components/UserManagement/Employer/editEmployerProfile";
import Payment from "../components/payment/payment";
import NotificationPage from "../components/Notification/notificationPage";
import Review from "../components/UserManagement/Employer/review";

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
          path="/signin"
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
          path="/profile/:displayname"
          render={props => <Employer {...this.props} {...props} />}
        />
        <Route
          exact
          path="/editEmployerProfile"
          render={props => <EditEmployerProfile {...this.props} {...props} />}
        />
        <Route
          exact
          path="/payment"
          render={props => <Payment {...this.props} {...props} />}
        />
        <Route
          exact
          path="/notifications"
          render={props => <NotificationPage {...this.props} {...props} />}
        />
        <Route
          exact
          path="/review"
          render={props => <Review {...this.props} {...props} />}
        />
      </Switch>
    );
  }
}
