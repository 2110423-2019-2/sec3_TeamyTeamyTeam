import React, { Component } from "react";
import "../../stylesheets/notification.css";
import NotificationBox from "./notificationBox";

class Notification extends Component {
  state = {};

  render() {
    return (
      <li className="nav-item dropdown" style={{ marginLeft: "-5px" }}>
        <a
          className="nav-link"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          data-badge="10"
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
          <div className="overflow-auto" style={{ maxHeight: "400px" }}>
            <NotificationBox />
            <NotificationBox />
            <NotificationBox />
            <NotificationBox />
            <NotificationBox />
            <NotificationBox />
          </div>

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

export default Notification;
