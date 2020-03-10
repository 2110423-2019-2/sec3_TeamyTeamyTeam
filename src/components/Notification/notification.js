import React, { Component } from "react";
import "../../stylesheets/notification.css";
import NotificationBox from "./notificationBox";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UID: 0,
      numberOfUnreadNotification: 0,
      toTalnotification: 0,
      notifications: []
    };
  }

  componentDidMount() {
    //Retrieve notification's object
    let toTalnotification = 15; //จำนวนnotiทั้งหมดของusers
    let numberOfUnreadNotification = 15; //จำนวนnotiที่ยังไม่ได้อ่าน
    this.setState({ numberOfUnreadNotification });
    //จะกำหนดให้แสดงผล10อันล่าสุดเท่านั้น แต่ตัวnotiที่ยังไม่อ่านจะแสดงตามจริง
    let notifications = [];
    for (let i = 0; i < Math.min(toTalnotification, 10); i += 1) {
      notifications.push("");
    }
    this.setState({ notifications });
  }

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
        >
          <ion-icon name="notifications-outline"></ion-icon>
          {this.state.numberOfUnreadNotification > 0 ? (
            <span data-badge={this.state.numberOfUnreadNotification}></span>
          ) : (
            ""
          )}
        </a>
        <ul className="dropdown-menu">
          <li className="head text-light bg-dark">
            <div className="row">
              <div className="col-lg-12 col-sm-12 col-12">
                <span>
                  Notifications ({this.state.numberOfUnreadNotification})
                </span>
                {/* <a href="" className="float-right text-light">
                  Mark all as read
                </a> */}
              </div>
            </div>
          </li>
          <div className="overflow-auto" style={{ maxHeight: "400px" }}>
            {this.state.notifications.length > 0 ? (
              this.state.notifications.map(() => <NotificationBox />)
            ) : (
              <div className="text-center m-3">
                <span>
                  <ion-icon
                    name="notifications-off-outline"
                    style={{ color: "#c9c4c2", fontSize: "36px" }}
                  ></ion-icon>
                </span>
              </div>
            )}
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
