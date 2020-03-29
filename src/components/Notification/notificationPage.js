import React, { Component } from "react";
import NotificationBox from "./notificationBox";

class NotificationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [
        {
          isReply: true,
          email: "admin@phomo.com",
          content: "messages from this person.",
          redirectLink: ""
        },
        {
          isReply: false,
          email: "admin2@phomo.com",
          content: "messages 2 from this person.",
          redirectLink: ""
        },
        {
          isReply: false,
          email: "admin3@phomo.com",
          content: "messages 3 from this person.",
          redirectLink: ""
        }
      ]
    };
  }

  componentDidMount() {
    //fetch noti ทั้งหมด
  }

  render() {
    return (
      <div className="container-fluid mt-5" style={{ maxWidth: "700px" }}>
        <h1 className="mb-3" style={{ color: "#613bea" }}>
          <ion-icon name="notifications-outline"></ion-icon> Notifications
        </h1>
        <div className="d-flex flex-column-reverse">
          {this.state.notifications.map(res => (
            <NotificationBox res={res} />
          ))}
        </div>
      </div>
    );
  }
}

export default NotificationPage;
