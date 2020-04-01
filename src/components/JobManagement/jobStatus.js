import React, { Component } from "react";

class JobStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobID: "0",
      statusCode: 6,
      photographer: "phomo",
      employer: "Nick",
      title: "Chill out at Chula",
      style: "Portrait",
      //   date: new Date().toString().substr(4, 11),
      date: "Jan 10 2019",
      time: "Full day",
      location: "Chulalongkorn",
      totalFees: 299,
      currency: "$"
    };
    this.getStatusMessageEmployer = this.getStatusMessageEmployer.bind(this);
    this.getStatusMessagePhotographer = this.getStatusMessagePhotographer.bind(
      this
    );
  }

  getStatusMessagePhotographer() {
    const { statusCode } = this.state;
    switch (statusCode) {
      case 2:
        return (
          <div>
            <h2>
              <span class="badge badge-yellow">Pending</span>
            </h2>
            <small>
              Wait for {this.state.employer} to accept your proposed fees.
            </small>
            <h1>
              <ion-icon
                name="cash-outline"
                style={{ opacity: "0.5" }}
              ></ion-icon>
            </h1>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>
              <span class="badge badge-yellow">Pending</span>
            </h2>
            <small>
              Wait for {this.state.employer} to pay the 30% of total fees
              deposit.
            </small>
            <h1>
              <ion-icon
                name="cash-outline"
                style={{ opacity: "0.5" }}
              ></ion-icon>
            </h1>
          </div>
        );
      case 4:
        if (new Date().toString().substr(4, 11) !== this.state.date) {
          return (
            <div>
              <h2>
                <span class="badge badge-yellow">Waiting</span>
              </h2>
              <small>
                The appointed date is {this.state.date} at {this.state.location}
              </small>
              <h1>
                <ion-icon
                  style={{ opacity: "0.5" }}
                  name="hourglass-outline"
                ></ion-icon>
              </h1>
            </div>
          );
        } else {
          return (
            <div>
              <h2>
                <span class="badge badge-yellow">Appointed Day!</span>
              </h2>
              Meet <strong>{this.state.employer}</strong> at{" "}
              <strong>{this.state.location}</strong>
              <h1>
                <ion-icon
                  style={{ opacity: "0.5" }}
                  name="camera-outline"
                ></ion-icon>
              </h1>
            </div>
          );
        }
      case 5:
        return (
          <div>
            <h2>
              <span class="badge badge-yellow">Pending</span>
            </h2>
            <small>
              Wait for {this.state.employer} to pay for the rest fees.
            </small>
            <h1>
              <ion-icon
                name="cash-outline"
                style={{ opacity: "0.5" }}
              ></ion-icon>
            </h1>
          </div>
        );
      case 6:
        return (
          <div>
            <h2>
              <span class="badge badge-yellow">You get all the money!</span>
            </h2>
            <small>Upload your photos</small>
            <p>
              <button className="btn btn-light">
                <ion-icon
                  name="cloud-upload"
                  style={{ fontSize: "42px" }}
                ></ion-icon>
              </button>
            </p>
          </div>
        );
      case 7:
        return (
          <div>
            <h2>
              <span class="badge badge-info">All done!</span>
            </h2>
          </div>
        );
    }
  }

  getStatusMessageEmployer() {
    const { statusCode } = this.state;
    switch (statusCode) {
      case 1:
        return (
          <div>
            <h2>
              <span class="badge badge-yellow">Pending</span>
            </h2>
            <small>Wait for photographer to accept and propose fees</small>
            <h1>
              <ion-icon
                style={{ opacity: "0.5" }}
                name="hourglass-outline"
              ></ion-icon>
            </h1>
          </div>
        );
      case 2:
        return (
          <div>
            <h1>
              <ion-icon
                name="cash-outline"
                style={{ opacity: "0.5" }}
              ></ion-icon>
            </h1>
            <small>Photographer proposes total fees for this job</small>
            <h3>
              {this.state.currency} {this.state.totalFees}
            </h3>
            <button className="mr-3 btn btn-sm btn-outline-light">
              Accept
            </button>
            <button className="btn btn-sm btn-outline-warning">Decline</button>
          </div>
        );
      case 3:
        return (
          <div>
            <h1>
              <ion-icon
                name="cash-outline"
                style={{ opacity: "0.5" }}
              ></ion-icon>
            </h1>
            <small>
              To start shooting and ensure photographer, pay 30% of total fees
              before appointed date or this job will be dropped.
            </small>
            <h3>
              <span className="text-yellow">
                {this.state.currency} {this.state.totalFees * 0.3}
              </span>{" "}
              from {this.state.currency} {this.state.totalFees}
            </h3>
            <button className="mr-3 btn btn-sm btn-yellow">
              <strong>
                <ion-icon name="card-outline"></ion-icon> Pay via Credit Card
              </strong>
            </button>
          </div>
        );
      case 4:
        if (new Date().toString().substr(4, 11) !== this.state.date) {
          return (
            <div>
              <h2>
                <span class="badge badge-yellow">Waiting</span>
              </h2>
              <small>
                The appointed date is {this.state.date} at {this.state.location}
              </small>
              <h1>
                <ion-icon
                  style={{ opacity: "0.5" }}
                  name="hourglass-outline"
                ></ion-icon>
              </h1>
            </div>
          );
        } else {
          return (
            <div>
              <h2>
                <span class="badge badge-yellow">Appointed Day!</span>
              </h2>
              Meet <strong>{this.state.photographer}</strong> at{" "}
              <strong>{this.state.location}</strong>
              <h1>
                <ion-icon
                  style={{ opacity: "0.5" }}
                  name="camera-outline"
                ></ion-icon>
              </h1>
            </div>
          );
        }
      case 5:
        return (
          <div>
            <h1>
              <ion-icon
                name="cash-outline"
                style={{ opacity: "0.5" }}
              ></ion-icon>
            </h1>
            <small>
              Pay the rest fees for photographer to send you photos.
            </small>
            <h3>
              <span className="text-yellow">
                {this.state.currency}
                {this.state.totalFees - this.state.totalFees * 0.3}
              </span>
            </h3>
            <button className="mr-3 btn btn-sm btn-yellow">
              <strong>
                <ion-icon name="card-outline"></ion-icon> Pay via Credit Card
              </strong>
            </button>
          </div>
        );
      case 6:
        return (
          <div>
            <h2>
              <span class="badge badge-yellow">Waiting</span>
            </h2>
            <small>Wait for photographer to send you photos.</small>
            <h1>
              <ion-icon
                style={{ opacity: "0.5" }}
                name="hourglass-outline"
              ></ion-icon>
            </h1>
          </div>
        );
      case 7:
        return (
          <div>
            <h2>
              <span class="badge badge-info">Here's your photo!</span>
            </h2>
            <small>Download them</small>
            <p>
              <button className="btn btn-light">
                <ion-icon
                  name="download"
                  style={{ fontSize: "42px" }}
                ></ion-icon>
              </button>
            </p>
          </div>
        );
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row my-5">
          <div className="col-md-4 my-auto text-center">
            <h1 className="text-purple">
              <ion-icon name="analytics-outline"></ion-icon> Job Status
            </h1>
          </div>
          <div className="col-md-8 bg-purple text-light rounded">
            <div className="row">
              <div className="col-md p-3">
                <p>
                  <strong>Job's title: </strong>
                  {this.state.title}
                </p>
                <p>
                  <strong>Style: </strong>
                  {this.state.style}
                </p>
                <p>
                  <strong>Shoot date: </strong>
                  {this.state.date}
                </p>
                <p>
                  <strong>Time: </strong>
                  {this.state.time}
                </p>
                <p>
                  <strong>Location: </strong>
                  {this.state.location}
                </p>
                <p>
                  <strong>Fees: </strong>
                  {this.state.totalFees}
                  {this.state.currency}
                </p>
              </div>
              <div
                className="col-auto my-3"
                style={{ borderLeft: "2px solid white" }}
              ></div>
              <div className="col-md p-3 text-center my-auto">
                {this.getStatusMessagePhotographer()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JobStatus;
