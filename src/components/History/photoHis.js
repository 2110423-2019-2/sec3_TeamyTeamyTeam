import React, { Component } from "react";
import axios from "axios";

class PhotoHis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        { id: 1, title: 'Title1', style: 'Graduation', name: 'Otto', date: '2/2/2020', time: 'Full day', location:'123456', status:'In progress' },
        { id: 2, title: 'Title2', style: 'Wedding', name: 'Ton', date: '1/1/2020', time: 'Half day morning', location:'123456', status:'Cancelled' },
        { id: 3, title: 'Title3', style: 'Portrait', name: 'Jane', date: '17/10/2019', time: 'Half day evening', location:'123456', status:'Finished' },
        { id: 4, title: 'Title4', style: 'Graduation', name: 'Otto', date: '16/9/2019', time: 'Full day', location:'123456', status:'Finished' },
     ]
    };
  }

  renderTableData() {
    return this.state.history.map((hist, index) => {
       const { id, title, style, name, date, time, location, status} = hist //destructuring
       return (
          <tr key={id}>
            <th scope="row">{id}</th>
             <td>{title}</td>
             <td>{style}</td>
             <td>{name}</td>
             <td>{date}</td>
             <td>{time}</td>
             <td>{location}</td>
             <td>{status}</td>
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
