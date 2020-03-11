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
    this.handleAcceptJob = this.handleAcceptJob.bind(this);
    this.handleDeclineJob = this.handleDeclineJob.bind(this);
  }

  getNotify() {
    axios
      .get("http://localhost:9000/api/notify/" + this.props.appState.email)
      .then(res => {
        console.log(res);
        //Retrieve notification's object
        let notifications = [];
        let numberOfUnreadNotification = 0;
        //จะกำหนดให้แสดงผล10อันล่าสุดเท่านั้น แต่ตัวnotiที่ยังไม่อ่านจะแสดงตามจริง
        let toTalnotification = res.data.data.length;
        for (let i = 0; i < Math.min(toTalnotification, 10); i += 1) {
          notifications.push(res.data.data[i]);
          if(res.data.data[i].isRead == false) {
            numberOfUnreadNotification = numberOfUnreadNotification + 1;
            axios.put("http://localhost:9000/api/readNotify/" + this.props.appState.email,{})
          }
        }
        this.setState({ 
          toTalnotification: toTalnotification,
          numberOfUnreadNotification: numberOfUnreadNotification,
          notifications: notifications 
        });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    //Retrieve notification's object
    this.getNotify();
  }

  handleAcceptJob() {
    //ถ้ากดaccept
    console.log("Accept");
  }

  handleDeclineJob() {
    //ถ้ากดdecline
    console.log("Decline");
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
          <span data-badge={this.state.numberOfUnreadNotification}></span>

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
              this.state.notifications.map(
                res => <NotificationBox res={res}
                type="offer"
                handleAcceptJob={this.handleAcceptJob}
                handleDeclineJob={this.handleDeclineJob}
              />)
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
