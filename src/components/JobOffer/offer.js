import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";


class JobOffer extends Component {
    constructor(props){
        super(props);
        this.state={
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
        })
        console.log(this.state.date);
    };

    onSubmit = e => {
        e.preventDefault();
          axios
            .post("http://localhost:9000/api/offer",{
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
    }

    render() {
        return (
            <div className=" container">
                <div className="columns is-centered">
                <div className="column is-half">
                    <form>
                    <div className="field">
                        <label className="label">Job title</label>


                        <input className="input" type="Fullname" name="title" onChange={this.handleChange}/>

                    </div>

                    <div className="field">
                        <label className="label">Style</label>
                        <div class="form-row">
                            <div class="form-group col-md-6">

                                <select id="inputState" class="form-control" name="style" onChange={this.handleChange}>
                                    <option selected value = "Graduation">Graduation</option>
                                    <option value = "Wedding">Wedding</option>
                                    <option value = "Potrait">Potrait</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Date</label>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <DatePicker selected={this.state.date} name = "date" onChange={this.handleDateChange}/>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Time</label>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <select id="inputState" class="form-control" name="time" onChange={this.handleChange}>
                                    <option selected value = "Morning">Morning</option>0
                                    <option value = "Afternoon">Afternoon</option>
                                    <option value = "Evening">Evening</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Location</label>


                        <input className="input" type="Telephone number" name="location" onChange={this.handleChange}/>


                    </div>

                    <div className="field">
                        <input type="radio" value="option1" checked={true} />
                            <a> </a> I have read and agree to <a tabIndex >  Term of Service</a>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                        <button className="button is-link" onClick={this.onSubmit} >Submit</button>
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