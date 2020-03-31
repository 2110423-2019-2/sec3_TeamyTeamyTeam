import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios' ;
class EditEmployerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.appState.name,
      interest: this.props.appState.interest,
      email: this.props.appState.email,
      phoneNo: this.props.appState.phoneNo
    };
  }
 
  // getResult {
  //   axios.put("http://localhost:9000/user/", {
  //      if (this.state.name[0] != "") {
  //        firstName = this.state.name[0];
  //      } if (this.state.name[1] != "") {
  //        lastName = this.state.name[1];
  //      } if (this.state.interest != "") {
  //        interest? = this.state.interest;
  //      } if (this.state.email != "") {
  //        email = this.state.email;
  //      } if (this.state.phoneNo != "") {
  //        phoneNo = this.state.phoneNo;
  //      }
  //   }).then(res =>{
  //      
  //   })
  // }
  render() {
    return (
      <div className="section container">
        <div className="columns is-centered">
          <div className="column is-half">
            <form>
                <div className="has-text-centered" style={{paddingBottom:"5vh"}}>
                    <h3>Edit Profile</h3>
                </div>
                <div className="form-group">
                    <label>Edit Name</label>
                    <input className="form-control"/>
                </div>

                <div className="form-group">
                    <label>Edit interest</label>
                    <input className="form-control"/>
                </div>

                <div className="form-group">
                    <label>Edit email</label>
                    <input className="form-control"/>
                </div>

                <div className="form-group">
                    <label>Edit phone number</label>
                    <input className="form-control"/>
                </div>
                <div className="has-text-centered">
                    <Link to="/employer">
                        <input type="submit" className="btn btn-outline-primary" onClick={this.getResult}  />
                        <input
                            type="reset"
                            className="btn btn-outline-secondary mx-3"
                            value="Cancel"
                        />   
                    </Link>
                </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditEmployerProfile;
