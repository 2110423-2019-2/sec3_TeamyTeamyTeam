import React, { Component } from "react"; 

class Employer extends Component{
    constructor(props) {
        super(props);
        this.state = {
          name: "Otto",
          numberOfJob :2,
          style: "Graduation",
          date: new Date(),
          time: "Full day",
          location: "123456",
          photographer: "0",
        };
      }

    render(){
        return(
            <div>
            <div className="container h-100 has-text-centered">
                <div className="row"
                style={{
                    height:"100vh"
                  }}>
                    <div className="col-6 h-100"
                    style={{
                        background:"orange",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        padding:"10vh"
                      }}>
                        <h3>Interest</h3>
                            <div>{this.state.style}</div>
                    </div>
                    <div className="col-md-6 ml-auto"
                    style={{
                        background:"lightblue",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        padding:"10vh"
                      }}>
                        <h1>{this.state.name}</h1>
                        <h3>Interest</h3>
                            <div>{this.state.style}</div>
                        {this.state.numberOfJob}
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
export default Employer;