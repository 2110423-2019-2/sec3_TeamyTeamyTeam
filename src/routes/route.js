import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../components/home";
import Login from "../components/UserManagement/signin";
import SignUp from "../components/UserManagement/signup";
import Search from "../components/search/search";
import Portfolio from "../components/portfolio/portfolio";
import JobOffer from "../components/JobManagement/offer";
import OfferProgress from "../components/JobManagement/offerProgress";
import PhotoHis from "../components/JobManagement/jobHistory";
import ManagePortfolio from "../components/portfolio/managePortfolio";
import Employer from "../components/UserManagement/Employer/employer";
import EditEmployerProfile from "../components/UserManagement/Employer/editEmployerProfile";
import PaymentOmise from "../components/Payment/paymentOmise";

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
        <Route
          exact
          path="/payment"
          render={props => <PaymentOmise {...this.props} {...props} />}
        />
      </Switch>
    );
  }
}
