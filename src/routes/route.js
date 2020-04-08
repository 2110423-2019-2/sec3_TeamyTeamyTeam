import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../components/home";
import Login from "../components/UserManagement/signin";
import SignUp from "../components/UserManagement/signup";
import Search from "../components/Search/search";
import Portfolio from "../components/Portfolio/portfolio";
import JobOffer from "../components/JobManagement/createOffer";
import PhotoHis from "../components/JobManagement/jobHistory";
import ManagePortfolio from "../components/Portfolio/managePortfolio";
import Employer from "../components/UserManagement/Employer/employer";
import EditEmployerProfile from "../components/UserManagement/Employer/editEmployerProfile";
import Payment from "../components/Payment/payment";
import NotificationPage from "../components/Notification/notificationPage";
import Review from "../components/UserManagement/Employer/review";
import ReportProblem from "../components/ReportProblem/reportForm.js";
import ProposedOffer from "../components/JobManagement/jobOffer";
<<<<<<< HEAD
import Chat from "../components/Chat/chat";
=======
import Layout from "../components/chatservice/Layout";
>>>>>>> bbb3a3708530314d568e61f36d6efd8c6fc9807d

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
        <Route
          exact
          path="/report"
          render={props => <ReportProblem {...this.props} {...props} />}
        />

        <Route
          exact
          path="/offerID=:id"
          render={props => <ProposedOffer {...this.props} {...props} />}
        />

        <Route
          exact
          path="/chat"
<<<<<<< HEAD
          render={props => <Chat {...this.props} {...props} />}
        />

=======
          render={props => <Layout {...this.props} {...props} />}
        />
>>>>>>> bbb3a3708530314d568e61f36d6efd8c6fc9807d
      </Switch>
    );
  }
}
