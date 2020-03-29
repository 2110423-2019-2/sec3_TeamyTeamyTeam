import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class NotificationBox extends Component {
  constructor(props) {
    super(props);
    this.handleRead = this.handleRead.bind(this);
    this.state = {
      isReply: this.props.res.isReply,
      sender: this.props.res.email, //userID
      message: this.props.res.content,
      date: "Dec 12, 2019",
      isRead: false,
      redirectLink: this.props.res.redirectLink
    };
  }

  handleAcceptJob() {
    axios
      .get(
        "http://localhost:9000/api/replyNotify/" +
          this.state.redirectLink +
          "." +
          "true"
      )
      .then(res => {})
      .catch(err => console.error(err));
  }

  handleDeclineJob() {
    axios
      .get(
        "http://localhost:9000/api/replyNotify/" +
          this.state.redirectLink +
          "." +
          "false"
      )
      .then(res => {})
      .catch(err => console.error(err));
  }

  handleRead() {
    this.setState({ isRead: true });
  }

  render_reply = () => {
    if (this.state.isReply == true) {
      return (
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
      );
    } else return <div></div>;
  };

  render() {
    const { sender, message, date, isRead, isReply } = this.state;

    return (
      <div className="bd-highlight mb-3">
        <li
          className={
            isRead
              ? "notification-box rounded"
              : "notification-box rounded isRead"
          }
          onClick={this.handleRead}
        >
          <Link to="#" className="nav-link">
            <div className="row ">
              <div className="col-lg-3 col-sm-3 col-3 text-center my-auto">
                <img
                  src="https://randomuser.me/api/portraits/women/11.jpg"
                  className="w-50 rounded-circle "
                />
              </div>
              <div className="col-lg-8 col-sm-8 col-8">
                <strong className="" style={{ color: "#613bea" }}>
                  {sender}
                </strong>

                <div className="text-dark">
                  {message}
                  {this.state.isReply ? (
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
                  ) : (
                    ""
                  )}
                </div>

                <small className="text-dark">{date}</small>
              </div>
            </div>
          </Link>
        </li>
      </div>
    );
  }
}

export default NotificationBox;
