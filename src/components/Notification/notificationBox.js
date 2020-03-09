import React, { Component } from "react";

class NotificationBox extends Component {
  state = {};
  render() {
    return (
      <li className="notification-box">
        <div className="row">
          <div className="col-lg-3 col-sm-3 col-3 text-center my-auto">
            <img
              src="https://randomuser.me/api/portraits/women/11.jpg"
              className="w-50 rounded-circle "
            />
          </div>
          <div className="col-lg-8 col-sm-8 col-8">
            <strong className="text-primary">David John</strong>
            <div>Lorem ipsum dolor sit amet, consectetur</div>
            <small className="text-dark">27.11.2015, 15:00</small>
          </div>
        </div>
      </li>
    );
  }
}

export default NotificationBox;
