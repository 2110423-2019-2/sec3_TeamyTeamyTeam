import React, { Component } from "react"; 

class Employer extends Component{
    constructor(props) {
        super(props);
        this.state = {
          name: "Otto Otto",
          numberOfJob :2, // from history that has the same employer's name
          style: [{s:"Graduation"},{s:"Portrait"},{s:"Wedding"}], // can edit
          email:"123@gmail.com", // can edit
          phone:"08x-xxx-xxxx", // can edit
          firstRegister:"1/1/2019", //date of first register
          latestOffer:"11/3/2020" //date of the latest offer base on photographers' history
        };
      }

      renderStyle() {
        return this.state.style.map((style, index) => {
           const {s} = style //destructuring
           return (
              <div>{s}</div>
           )
        })
     }

    render(){
        return(
            <div className="container h-100 has-text-centered">
                <div className="row" style={{height:"100vh"}}>
                    <div className="col-6 h-100" style={{padding:"10vh"}}>
                        <div style={{height:"auto", maxWidth:"100%", paddingBottom:"5vh", overflow:"hidden", position:"relative"}}>
                            <img src="https://cdn.pixabay.com/photo/2020/03/08/11/21/british-4912211_1280.jpg" class="img-fluid full-width rounded mx-auto d-block"/>
                        </div>
                        <p>Interest</p>
                            {this.renderStyle()}
                    </div>
                    <div className="col-6 h-100 has-text-left" style={{padding:"10vh"}}>
                        <p>{this.state.name}</p>
                        <p>Email: {this.state.email}</p>
                        <p>Telephone number: {this.state.phone}</p>
                        <p>Number of job offer: {this.state.numberOfJob}</p>
                        <p>Register on: {this.state.firstRegister}</p>
                        <p>Latest job offer: {this.state.latestOffer}</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default Employer;