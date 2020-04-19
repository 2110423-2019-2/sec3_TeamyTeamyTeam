import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Employer extends Component {
  constructor(props) {
    super(props);
    //this.renderStyle = this.renderStyle.bind(this);
    this.getData = this.getData.bind(this);
    this.state = {
      name: this.props.appState.name,
      numberOfJob: 2, // from history that has the same employer's name
      style: [{ s: "Graduation" }, { s: "Portrait" }, { s: "Wedding" }], // default, can edit
      email: localStorage.getItem("email"), // from sign up, can edit
      phone: localStorage.getItem("phoneNo"), // from sign up, can edit
      firstRegister: "1/1/2019", //date of first register
      latestOffer: "11/3/2020", //date of the latest offer base on photographers' history
      image: ''

    };
  }

  async getData(){
      var EmployeeResult = {}
      let res = await axios.get("http://localhost:9000/api/user/"+ localStorage.getItem("email"))
      let offerStatus = await axios.get("http://localhost:9000/api/offer/"+ localStorage.getItem("email"))
    
      EmployeeResult = res.data;

      const {firstName  , email ,phoneNo, profileImage} = EmployeeResult.data[0];
      const numberOfJob = offerStatus.data.data.length
      //gen date
      const firstRegis = EmployeeResult.timestamp.substring(8,10)+'/'+EmployeeResult.timestamp.substring(5,7)+'/' +EmployeeResult.timestamp.substring(0,4)
      // lastestOffer get lastdate
      const lastestOffer= offerStatus.data.timestamp;
      if (lastestOffer != "No Offer") {
        console.log('Yes Offer',lastestOffer.substring(8,10)+'/'+lastestOffer.substring(5,7)+'/' +lastestOffer.substring(0,4)) 
        this.setState({latestOffer: lastestOffer.substring(8,10)+'/'+lastestOffer.substring(5,7)+'/' +lastestOffer.substring(0,4)})
      } else {
        console.log('No Offer',lastestOffer)
        this.setState({latestOffer:'No Offer'})
      }

      this.setState({name: firstName ,numberOfJob:numberOfJob, email:email, phone:phoneNo ,firstRegister: firstRegis,image:profileImage})

      console.log('res',this.state.image)
      // console.log("numberOfJob",numberOfJob)
      // console.log('offerStatus',offerStatus.data)
      //image base :: "https://firebasestorage.googleapis.com/v0/b/phomo-image.appspot.com/o/newUser.png?alt=media&token=331b27aa-d46b-464e-a10f-8f0af4e40792"

  };

  componentDidMount(){
    this.getData()
  }

  generateRender(){
    var image = this.state.image.toString()
    return (
      <div className="container">
        <div className="row">
          <div className="col-6 " style={{ padding: "10vh" }}>
            <div>
              <div className="img-round">
                <img
                  className="img-fluid"
                  src= {image}
                />
              </div>
            </div>
          </div>

          <div
            className="col-lg-6 h-100 has-text-left"
            style={{ padding: "10vh" }}
          >
            <dt>
              <div
                class="col"
                style={{
                  fontSize: "30px",
                  fontStyle: "oblique",
                  paddingBottom: "5vh",
                }}
              >
                {this.state.name}
                <Link to="/editEmployerProfile">
                  <button
                    className="btn btn-outline-light mx-3"
                    style={{ fontSize: "10px", marginLeft: "5vh" }}
                  >
                    Edit
                  </button>
                </Link>
              </div>
            </dt>
            <dt class="col-sm-6">Email:</dt>
            <dd class="col-sm-6" style={{ paddingBottom: "2vh" }}>
              {this.state.email}
            </dd>
            <dt class="col-sm-6">Telephone number:</dt>
            <dd class="col-sm-6" style={{ paddingBottom: "2vh" }}>
              {this.state.phone}
            </dd>
            <dt class="col-sm-6">Number of job offer:</dt>
            <dd class="col-sm-6" style={{ paddingBottom: "2vh" }}>
              {this.state.numberOfJob}
            </dd>
            <dt class="col-sm-6">Register on:</dt>
            <dd class="col-sm-6" style={{ paddingBottom: "2vh" }}>
              {this.state.firstRegister}
            </dd>
            <dt class="col-sm-6">Latest job offer:</dt>
            <dd class="col-sm-6" style={{ paddingBottom: "2vh" }}>
              {this.state.latestOffer}
            </dd>
            <Link to="/editEmployerProfile">
              <button className="btn btn-outline-dark"> Edit Profile</button>
            </Link>
          </div>
        </div>
      </div>
    );



  }



  render() {
    return (
      <div> 
      {this.generateRender()}
    </div>   
    );
  }
}
export default Employer;
