import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotificationBox extends Component {
  constructor(props) {
    super(props);
    this.handleRead = this.handleRead.bind(this);
    this.state = {
      type: "",
      sender: "Alexander Wang", //userID
      message: "Your job is accepted",
      date: "Dec 12, 2019",
      isRead: false
    };
  }

  handleRead() {
    this.setState({ isRead: true });
  }

  render() {
    const { sender, message, date, isRead } = this.state;
    return (
      <li
        className={isRead ? "notification-box" : "notification-box bg-gray"}
        onClick={this.handleRead}
      >
        <Link to="#" className="nav-link">
          <div className="row">
            <div className="col-lg-3 col-sm-3 col-3 text-center my-auto">
              <img
                src="https://randomuser.me/api/portraits/women/11.jpg"
                className="w-50 rounded-circle "
              />
            </div>
            <div className="col-lg-8 col-sm-8 col-8">
              <strong className="text-primary">{sender}</strong>
              <div className="text-dark">{message}</div>
              <small className="text-dark">{date}</small>
            </div>
          </div>
        </Link>
      </li>
    );
  }
}

export default NotificationBox;
