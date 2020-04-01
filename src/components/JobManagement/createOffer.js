import React, { Component } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

class JobOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      style: "Graduation",
      date: new Date(),
      time: "Morning",
      location: "",
      photographer: this.props.match.params.name,
      displayErrors: false,
      isChecked: false,
      redirect: false
    };
  }

  getOfferLink = () => {
    return "../portfolio/" + this.props.photographer;
  };

  handleChange = e => {
    //ตรวจค่าของ name ใน Onchange และ set ค่าตามไปเรื่อยๆ
    const { name, value } = e.target;
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({
      [name]: value
    });
    // console.log(this.state);
  };

  handleDateChange = date => {
    this.setState({
      date: date
    });
    console.log(this.state.date);
  };

  handleCheck = () => {
    this.setState({ isChecked: !this.state.isChecked });
  };

  onSubmit = e => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      this.setState({ displayErrors: true });
      return;
    }
    this.setState({ displayErrors: false });
    axios
      .post("http://localhost:9000/api/offer", {
        title: this.state.title,
        portfolioName: this.state.photographer, // portfolioName == portfolioID
        employerID: this.props.appState.uid,
        employerEmail: this.props.appState.email,
        style: this.state.style,
        actDate: this.state.date, // data_tag in server !!!
        meetUpTime: this.state.time, // meetUpTime เวลาที่มาเจอกัน
        location: this.state.location,
        progress: "wait photographer reply",
        optionalRequest: "", // Text_block สำหรับการคุยคร่าวๆ
        isReply: true
      })
      .then(res => {
        console.log(res);
        this.setState({redirect: true})
      })
      .catch(err => console.error(err));
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div className="container my-5 w-50">
        <form
          onSubmit={this.onSubmit}
          noValidate
          className={this.state.displayErrors ? "displayErrors" : ""}
        >
          <div className="form-group">
            <label>Job title</label>

            <input
              className="form-control"
              type="Fullname"
              name="title"
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Style</label>
            <div class="form-group">
              <select
                id="inputState"
                class="form-control"
                name="style"
                onChange={this.handleChange}
                required
              >
                <option selected value="Graduation">
                  Graduation
                </option>
                <option value="Wedding">Wedding</option>
                <option value="Potrait">Potrait</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-auto">
              <div>
                <label>Date</label>
              </div>
              <DatePicker
                className="form-control"
                selected={this.state.date}
                name="date"
                minDate={new Date()}
                shouldCloseOnSelect={false}
                onChange={this.handleDateChange}
                required
              />
            </div>
            <div class="form-group col">
              <div>
                <label>Time</label>
              </div>
              <select
                id="inputState"
                class="form-control"
                name="time"
                onChange={this.handleChange}
                required
              >
                <option selected value="Half Day Morning">
                  Half Day Morning
                </option>
                <option value="Half Day Evening">Half Day Evening</option>
                <option value="Full Day">Full Day</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              className="form-control"
              name="location"
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Wages</label>
            <input
              className="form-control"
              name="location"
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group form-check">
            <input
              className="form-check-input"
              checked={this.state.isChecked}
              onChange={this.handleCheck}
              type="checkbox"
              name="isChecked"
              required
            />
            <lable
              className={
                this.state.isChecked
                  ? "form-check-label"
                  : "form-check-label notChecked"
              }
            >
              I have read and agree to {}
              <a href="/">Term of Service</a>
            </lable>
          </div>

          <div className="field is-grouped">
            <Link to= {this.getOfferLink()}>
              <button
                type="submit"
                className="btn btn-outline-primary"
                onSubmit = {this.onSubmit}
              >Submit</button>
            </Link>
            <Link to={this.getOfferLink()}>
              <button className="btn btn-outline-secondary mx-3">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default JobOffer;
