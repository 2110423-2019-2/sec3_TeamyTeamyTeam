import React, { Component } from "react";
import axios from "axios"
import { Redirect } from "react-router-dom";
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
      acceptOffer: false,
      isRedirect: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(this.state.totalFees, this.state.currency);
  }
  
  handlePenalty = () => {
    //rejectOffer get ผ่าน put get ไม่ผ่าน Post
    var isGet;
    axios
    .get("https://phomo-api.herokuapp.com/api/penalty/" + this.state.employerEmail)
    .then(console.log(this.state.keyword))
    .then((res) => {
      console.log(res.data.data);
      isGet = res.data.data;
      if (!isGet){
      //Post
      axios
      .post("https://phomo-api.herokuapp.com/api/penalty/" + this.state.employerEmail,{
        email: this.state.employerEmail,
        hibitScore: 1000,
        cancelJob: 0,
        acceptJob: 0,
        rejectOffer: 1
      }).catch((err) => console.error(err));

    }else{
      // Put
      axios
      .put("https://phomo-api.herokuapp.com/api/penalty/" + this.state.employerEmail,{
        email: this.state.employerEmail,
        hibitScore: isGet.hibitScore,
        cancelJob: isGet.cancelJob,
        acceptJob: isGet.acceptJob,
        rejectOffer: isGet.rejectOffer +1
      })
      .catch((err) => console.error(err));

    }
    console.log("Handle Penalty Complete")
    })
    .catch((err) => console.error(err));
  }

  loadoffer = () => {
    axios
      .get("https://phomo-api.herokuapp.com/api/offerid/"+this.props.match.params.id)
      .then(res => {
        const offer = res.data.data[0]
        console.log(res)
        this.setState({
          jobTitle: offer.title,
          style: offer.style,
          date: offer.actDate,
          time: offer.meetUpTime,
          location: offer.location
        })
      })
      .catch(err => console.error(err));
  }

  handleAcceptJob = () => {
    console.log(this.props.match.params.id)
    console.log("accept")
    axios
      .post("https://phomo-api.herokuapp.com/api/photographerAccept",{
        id: this.props.match.params.id,
        fee: this.state.totalFees
      })
      .then(res => {
        setTimeout(() => window.location.href = "/", 1000)
      })
      .catch(err => console.error(err));
  }

  handleDeclineJob = () => {
    console.log(this.props.match.params.id)
    axios
      .post("https://phomo-api.herokuapp.com/api/declineOffer",{
        id: this.props.match.params.id,
        isPhotographer: true
      })
      .then(res => {
        this.handlePenalty()
        window.location.href = "/"
      })
      .catch(err => console.error(err));
  }

  componentDidMount(){
    this.loadoffer()
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
                {/* <button className="btn btn-danger mr-3" onClick = {this.DeclineJob}  >Decline</button> */}
                <button className="btn btn-danger mr-3"  onClick={this.handleDeclineJob}>Decline</button>
                <button className="btn btn-purple" onClick={this.handleAcceptJob}>Accept and Propose</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProposedOffer;
