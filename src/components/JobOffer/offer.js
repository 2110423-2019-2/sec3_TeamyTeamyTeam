import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class JobOffer extends Component {
    constructor(props){
        super(props);
        this.state={
            startDate: new Date()
        };
    }

    handleChange = date => {
        this.setState({
            startDate : date
        });
    };
    
    render() {
        return (
            <div className=" container">
                <div className="columns is-centered">
                <div className="column is-half">
                    <form>
                    <div className="field">
                        <label className="label">Job title</label>

                        <input className="input" type="Fullname" name="Fullname" />

                    </div>

                    <div className="field">
                        <label className="label">Style</label>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <input className="input" type="Comfimed Password" name="Comfimed Password" />
                            </div>
                            <div class="form-group col-md-6">
                                <select id="inputState" class="form-control">
                                    <option selected>Graduation</option>
                                    <option selected>Wedding</option>
                                    <option selected>Potrait</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Date</label>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <DatePicker selected={this.state.startDate} onChange={this.handleChange}/>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Time</label>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <select id="inputState" class="form-control">
                                    <option selected>Morning</option>
                                    <option selected>Afternoon</option>
                                    <option selected>Evening</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Location</label>

                        <input className="input" type="Telephone number" name="Telephone number" />

                    </div>

                    <div className="field">
                        <input type="radio" value="option1" checked={true} />
                            <a> </a> I have read and agree to <a tabIndex >  Term of Service</a>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                        <button className="button is-link" onClick={this.handleClick} >Submit</button>
                        </div>
                        <div className="control">
                        <button className="button is-text">Cancel</button>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
    );
  }
}
    
export default JobOffer ; 