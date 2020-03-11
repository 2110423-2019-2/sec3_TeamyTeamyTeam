import React, { Component } from "react";
import axios from "axios";

// //////////////// refactor ใหม่หมด ////////////////// //
class PhotoHis extends Component { 
  constructor(props) {
    super(props);
    this.getResult = this.getResult.bind(this);
    this.state = {
       historyResult: []
    };
  }

  getResult() {
    console.log("this.props.email",localStorage.getItem("email")) // ควรจะเป็น this.props.appState.email
    //This function is where Back-end operates e.g. fetching photographer data from server
    let history = []; // use next sprint to match real case
    //Use this.state.keyword to query correct photographers
    axios
      .get("http://localhost:9000/api/offer/"+ localStorage.getItem("email")) // ควรจะเป็น this.props.appState.email
      .then(res => {
        console.log(res.data.data);
        //historyResult = res.data.data;
        //console.log(historyResult)
        console.log([ {  title: 'Title1', style: 'Graduation', portfolioName: 'Otto', meetUpTime: '2/2/2020', actDate: 'Full day', location:'123456', progress:'In progress' } ])
        this.setState( {historyResult: [ {  title: 'Title1', style: 'Graduation', portfolioName: 'Otto', meetUpTime: '2/2/2020', actDate: 'Full day', location:'123456', progress:'In progress' } ] })

          // {  title: 'Title2', style: 'Wedding', portfolioName: 'Ton', meetUpTime: '1/1/2020', actDate: 'Half day morning', location:'123456', progress:'Cancelled' },
          // { title: 'Title3', style: 'Portrait', portfolioName: 'Jane', meetUpTime: '17/10/2019', actDate: 'Half day evening', location:'123456', progress:'Finished' },
          // {  title: 'Title4', style: 'Graduation', portfolioName: 'Otto', meetUpTime: '16/9/2019', actDate: 'Full day', location:'123456', progress:'Finished' }

      })
      .catch(err => console.error(err));
  }

  renderTableData() {
    return this.state.historyResult.map((hist) => {
       const { title, style, portfolioName, actDate, meetUpTime, location, progress} = hist //destructuring
       return (
          <tr key={title}>
            <th scope="row">{title}</th>
             <td>{title}</td>
             <td>{style}</td>
             <td>{portfolioName}</td>
             <td>{actDate}</td>
             <td>{meetUpTime}</td>
             <td>{location}</td>
             <td>{progress}</td>
          </tr>
       )
    })
 }

  render() {
    return (
      <div className="section container">
        
        <div className="columns is-centered">
        <div class="table-responsive">
            <table class="table" id="history" responsive="lg">
                <thead class="thead-dark">
                     <li> <button className="btn btn-outline-dark" type="submit"
                     onClick={this.getResult}> View history </button>
                     </li>
                    <tr>
                        <th scope="col">Number</th>
                        <th scope="col">Job title</th>
                        <th scope="col">Style</th>
                        <th scope="col">Employer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Location</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                  {this.renderTableData()}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default PhotoHis;
