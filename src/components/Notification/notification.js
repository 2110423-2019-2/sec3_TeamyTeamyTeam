import React, { Component } from "react";
import "../../stylesheets/notification.css";
import NotificationBox from "./notificationBox";
import axios from "axios";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UID: 0,
      numberOfUnreadNotification: 0,
      toTalnotification: 0,
      notifications: [],
      allUnreadNotify: []
    };
  }

  readNotify = e => {
    e.preventDefault();
    axios.put(
      "https://phomo-api.herokuapp.com/api/readNotify/" + this.props.appState.email,
      {}
    );
    console.log("read notification");
  };

  getNotify() {
    axios
      .get("https://phomo-api.herokuapp.com/api/notify/" + this.props.appState.email)
      .then(res => {
        console.log(res);
        //Retrieve notification's object
        let notifications = [];
        let numberOfUnreadNotification = 0;
        //จะกำหนดให้แสดงผล10อันล่าสุดเท่านั้น แต่ตัวnotiที่ยังไม่อ่านจะแสดงตามจริง
        let toTalnotification = res.data.data.length;
        for (let i = Math.max(toTalnotification-3, 0); i < toTalnotification ; i = i + 1) {
          notifications.push(res.data.data[i]);
          if (res.data.data[i].isRead == false) {
            numberOfUnreadNotification = numberOfUnreadNotification + 1;
          }
        }
        this.setState({
          toTalnotification: toTalnotification,
          numberOfUnreadNotification: numberOfUnreadNotification,
          notifications: notifications
        });
      })
      .catch(err => console.error(err));
    console.log("update notification");
  }

  componentDidMount() {
    //Retrieve notification's object
    this.getNotify();
    this.interval = setInterval(() => {
      this.getNotify();
    }, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={this.readNotify}
        >
          <ion-icon
            name="notifications-outline"
            style={{ marginTop: "3px", fontSize: "18px" }}
          ></ion-icon>
          {this.state.numberOfUnreadNotification > 0 ? (
            <span data-badge={this.state.numberOfUnreadNotification}></span>
          ) : (
            ""
          )}
        </a>
        <ul className="dropdown-menu noti-menu">
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
          <div
            className="d-flex flex-column-reverse overflow-auto"
            style={{ maxHeight: "400px" }}
          >
            {this.state.notifications.length > 0 ? (
              this.state.notifications.map(res => <NotificationBox res={res} />)
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
            <a href="/notifications" className="text-light">
              View All
            </a>
          </li>
        </ul>
      </li>
    );
  }
}

export default Notification;
