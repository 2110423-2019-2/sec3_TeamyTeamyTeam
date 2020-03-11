import React, { Component } from "react"; 

class Employer extends Component{
    constructor(props) {
        super(props);
        this.state = {
          name: "Otto",
          numberOfJob :2,
          style: [{s:"Graduation"},{s:"Portrait"},{s:"Wedding"}],
          date: new Date(),
          time: "Full day",
          location: "123456",
          photographer: "0",
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
            <div>
            <div className="container h-100 has-text-centered">
                <div className="row"
                style={{
                    height:"100vh"
                  }}>
                    <div className="col-6 h-100"
                    style={{
                        padding:"10vh"
                      }}>
                        <div style={{height:"auto", maxWidth:"100%", paddingBottom:"5vh"}}>
                            <img src="https://cdn.pixabay.com/photo/2020/03/08/11/21/british-4912211_1280.jpg" class="img-fluid"/>
                        </div>
                        <h3>Interest</h3>
                            {this.renderStyle()}
                    </div>
                    <div className="col-md-6 ml-auto"
                    style={{
                        padding:"10vh"
                      }}>
                        <h1>{this.state.name}</h1>
                        
                        {this.state.numberOfJob}
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
export default Employer;