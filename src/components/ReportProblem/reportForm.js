import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router";

class ReportProblem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      email: "",
      firstname: "",
      lastname: "",
      message: "",
      redirect: false
    };
  }

  onChange = e => {
    //ตรวจค่าของ name ใน username และ set ค่าตามไปเรื่อยๆ
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/api/report",this.state)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
    this.setState({ redirect: true });
  }


  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
        <div className="container my-5 w-50">
        <h1 className="text-purple"><ion-icon name="alert-outline"></ion-icon>Report your problem</h1>
        <form onSubmit = {this.onSubmit}>
          <div className="form-group">
            <label>Problem title</label>

            <input
              className="form-control"
              name="title"
              onChange={this.onChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <div class="form-group">
              <input
                className="form-control"
                name="email"
                onChange={this.onChange}
                required
              /> 
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-6">
              <div>
                <label>First name</label>
              </div>
              <input
                className="form-control"
                name="firstname"
                onChange={this.onChange}
                required
              /> 
            </div>
            <div class="form-group col-6">
              <div>
                <label>Last name</label>
              </div>
              <input
                className="form-control"
                name="lastname"
                onChange={this.onChange}
                required
              /> 
            </div>
          </div>

          <div className="form-group">
            <label>Your message</label>
            <textarea
              className="form-control"
              name="message"
              onChange={this.onChange}
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
              <button
                type="submit"
                className="btn btn-outline-primary"
              >Submit</button>
              <button className="btn btn-outline-secondary mx-3">Cancel</button>
          </div>
        </form>
      </div>
        
    );
  }
}

export default ReportProblem;
