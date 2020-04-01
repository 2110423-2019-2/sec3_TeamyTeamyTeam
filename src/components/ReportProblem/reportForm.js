import React, { Component } from "react";
import { Link } from "react-router-dom";

class ReportProblem extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleChange(event) {
    this.setState({
      
    });
  }


  render() {

    return (
        <div className="container my-5 w-50">
        <form>
          <div className="form-group">
            <label>Problem title</label>

            <input
              className="form-control"
              name="title"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <div class="form-group">
              <input
                className="form-control"
                name="email"
                required
              /> 
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-6">
              <div>
                <label>Full name</label>
              </div>
              <input
                className="form-control"
                name="fullname"
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
                required
              /> 
            </div>
          </div>

          <div className="form-group">
            <label>Your message</label>
            <textarea
              className="form-control"
              name="message"
              
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
            <Link to= "/">
              <button
                type="submit"
                className="btn btn-outline-primary"
                onSubmit = {this.onSubmit}
              >Submit</button>
            </Link>
            <Link to="/">
              <button className="btn btn-outline-secondary mx-3">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
        
    );
  }
}

export default ReportProblem;
