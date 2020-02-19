import React, { Component } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";

class JobOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      style: "Graduation",
      date: new Date(),
      time: "Morning",
      location: "",
      photographer: this.props.match.params.name
    };
  }

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

  onSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/api/offer", {
        title: this.state.title,
        portfolioName: this.state.photographer,
        employerName: this.props.appState.email,
        style: this.state.style,
        date: this.state.date,
        time: this.state.time,
        location: this.state.location,
        progress: "wait-photographer"
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div className="section container">
        <div className="columns is-centered">
          <div className="column is-half">
            <form>
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
                <div class="form-row">
                  <div class="form-group col-md-6">
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
              </div>

              <div className="form-group">
                <div class="form-row"> 
                    <div class="form-group col-md-6">
                        <div><label>Date</label></div>
                        <DatePicker
                            className="form-control"
                            selected={this.state.date}
                            name="date"
                            onChange={this.handleDateChange}
                            required
                         />
                    </div>
                    <div class="form-group col-md-6"> 
                        <div><label>Time</label></div>
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
              </div>

              <div className="form-group">
                <label>Location</label>

                <input
                  className="form-control"
                  type="Telephone number"
                  name="location"
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="form-group form-check">
                <input
                  className="form-check-input"
                  checked={this.state.isChecked}
                  onChange={this.onCheck}
                  type="checkbox"
                  name="isChecked"
                  required
                />
                <lable>
                  I have read and agree to {}
                  <a href="/">Term of Service</a>
                </lable>
              </div>

              <div className="field is-grouped">
                <input
                  type="submit"
                  className="btn btn-outline-primary"
                  onClick={this.onSubmit}
                />
                <input
                  type="reset"
                  className="btn btn-outline-secondary mx-3"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default JobOffer;
