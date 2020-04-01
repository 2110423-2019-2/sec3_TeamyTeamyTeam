import React, { Component } from "react";

class ProposedOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employer: "EmployerNo1",
      employerEmail: "admin@phomo.com",
      jobTitle: "Job Title",
      style: "Portrait",
      date: new Date().toString().substr(4, 11),
      time: "Full Day",
      location: "Chula",
      totalFees: 0,
      currency: "THB",
      acceptOffer: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(this.state.totalFees, this.state.currency);
  }

  render() {
    return (
      <div className="container" style={{ marginTop: "-54px" }}>
        <div className="row h-100 align-items-center">
          <div className="card w-auto mx-auto">
            <div className="card-body">
              <h5 className="card-title">
                <img
                  className="img-fluid mr-2"
                  src="https://firebasestorage.googleapis.com/v0/b/phomo-image.appspot.com/o/newUser.png?alt=media&token=331b27aa-d46b-464e-a10f-8f0af4e40792"
                  style={{ width: "50px", height: "50px" }}
                />
                {this.state.employer} offers you a job
              </h5>
              <p className="card-text font-weight-normal">
                Job's title: {this.state.jobTitle}
              </p>
              <p className="card-text font-weight-normal">
                Style: {this.state.style}
              </p>
              <p className="card-text font-weight-normal">
                Appointed Date: {this.state.date}
              </p>
              <p className="card-text font-weight-normal">
                Time: {this.state.time}
              </p>
              <p className="card-text font-weight-normal">
                Location: {this.state.location}
              </p>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="inputGroupSelect01">
                    Fees
                  </label>
                </div>
                <input
                  type="text"
                  name="totalFees"
                  className="form-control text-right"
                  value={this.state.totalFees}
                  pattern="\d+"
                  onChange={this.handleChange}
                ></input>
                <select
                  className="custom-select"
                  onChange={this.handleChange}
                  name="currency"
                  id="currencySelect"
                >
                  <option selected value="THB">
                    THB
                  </option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <div className="mx-auto text-center">
                <button className="btn btn-danger mr-3">Decline</button>
                <button className="btn btn-purple">Accept and Propose</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProposedOffer;
