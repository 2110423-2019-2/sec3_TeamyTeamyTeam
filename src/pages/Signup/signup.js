import React, { Component } from "react";
import { Radio } from "react-bootstrap";

export default class SignUp extends Component {
    render() {
        return (
            <section className=" container">
                <div className="columns is-centered">
                <div className="column is-half">
                    <form>
                    <div className="field">
                        <label className="label">Fullname</label>

                        <input className="input" type="Fullname" name="Fullname" />

                    </div>

                    <div className="field">
                        <label className="label">Username</label>

                        <input className="input" type="Username" name="Username" />

                    </div>

                    <div className="field">
                        <label className="label">Password</label>

                        <input className="input" type="Password" name="Password" />

                    </div>

                    <div className="field">
                        <label className="label">Comfimed Password</label>

                        <input className="input" type="Comfimed Password" name="Comfimed Password" />

                    </div>

                    <div className="field">
                        <label className="label">Email</label>

                        <input className="input" type="email" name="email" />

                    </div>

                    <div className="field">
                        <label className="label">Telephone number.</label>

                        <input className="input" type="Telephone number" name="Telephone number" />

                    </div>

                    <div className="field">
                        <input type="radio" value="option1" checked={true} />
                            <a> </a> I have read and agree to <a tabIndex >  Term of Service</a>
                    </div>

                    <div className="field is-grouped">

                        
                        <div className="control">
                        <button className="button is-link">Submit</button>
                        </div>
                        <div className="control">
                        <button className="button is-text">Cancel</button>
                        </div>
                        Already have registered <a href="/signup"> <a>  </a> Login? </a>
                    </div>
                    </form>
                </div>
                </div>
            </section>
    );
  }
}
    