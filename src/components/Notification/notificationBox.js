import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotificationBox extends Component {
  constructor(props) {
    super(props);
    this.handleRead = this.handleRead.bind(this);
    this.state = {
      isReply: this.props.res.isReply,
      sender: this.props.res.email, //userID
      message: this.props.res.content,
      date: "Dec 12, 2019",
      isRead: false
    };
  }

  handleAcceptJob(){

  }

  handleDeclineJob(){

  }

  handleRead() {
    this.setState({ isRead: true });
  }

  render() {
    const { sender, message, date, isRead, isReply } = this.state;
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
              <div className="text-dark">
                  <div>
                    <button
                      className="btn btn-sm btn-success mr-2"
                      onClick={this.handleAcceptJob}
                    >
                      Accept Offer
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={this.handleDeclineJob}
                    >
                      Decline Offer
                    </button>
                  </div>
                  {message}
              </div>
              <small className="text-dark">{date}</small>
            </div>
          </div>
        </Link>
      </li>
    );
  }
}

export default NotificationBox;
