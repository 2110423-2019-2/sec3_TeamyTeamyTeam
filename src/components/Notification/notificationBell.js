import React, { Component } from "react";
import "../../stylesheets/notification.css";

class NotificationBell extends Component {
  state = {};

  render() {
    return (
      <li className="nav-item dropdown" style={{ marginLeft: "-5px" }}>
        <a
          className="nav-link text-light"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <ion-icon name="notifications-outline"></ion-icon>
        </a>
        <ul className="dropdown-menu">
          <li className="head text-light bg-dark">
            <div className="row">
              <div className="col-lg-12 col-sm-12 col-12">
                <span>Notifications (3)</span>
                {/* <a href="" className="float-right text-light">
                  Mark all as read
                </a> */}
              </div>
            </div>
          </li>
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
          <li className="notification-box bg-gray">
            <div className="row">
              <div className="col-lg-3 col-sm-3 col-3 text-center">
                <img
                  src="https://randomuser.me/api/portraits/women/50.jpg"
                  className="w-50 rounded-circle"
                />
              </div>
              <div className="col-lg-8 col-sm-8 col-8">
                <strong className="text-primary">David John</strong>
                <div>Lorem ipsum dolor sit amet, consectetur</div>
                <small className="text-dark">27.11.2015, 15:00</small>
              </div>
            </div>
          </li>
          <li className="notification-box">
            <div className="row">
              <div className="col-lg-3 col-sm-3 col-3 text-center">
                <img
                  src="https://randomuser.me/api/portraits/men/16.jpg"
                  className="w-50 rounded-circle"
                />
              </div>
              <div className="col-lg-8 col-sm-8 col-8">
                <strong className="text-primary">David John</strong>
                <div>Lorem ipsum dolor sit amet, consectetur</div>
                <small className="text-dark">27.11.2015, 15:00</small>
              </div>
            </div>
          </li>
          <li className="footer bg-dark text-center">
            <a href="" className="text-light">
              View All
            </a>
          </li>
        </ul>
      </li>
    );
  }
}

export default NotificationBell;
