import React, { Component } from "react";


class JobOffer extends Component {
    
    
    
    
    
    
    render() {
        return (
            <section className=" container">
                <div className="columns is-centered">
                <div className="column is-half">
                    <form>
                    <div className="field">
                        <label className="label">Job title</label>

                        <input className="input" type="Fullname" name="Fullname" />

                    </div>

                    <div className="field">
                        <label className="label">Employer's name</label>

                        <input className="input" type="Username" name="Username" />

                    </div>

                    <div className="field">
                        <label className="label">Style</label>

                        <input className="input" type="Password" name="Password" />

                    </div>

                    <div className="field">
                        <label className="label">Date</label>

                        <input className="input" type="Comfimed Password" name="Comfimed Password" />

                    </div>

                    <div className="field">
                        <label className="label">Time</label>

                        <input className="input" type="email" name="email" />

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
            </section>
    );
  }
}
    
export default JobOffer ; 