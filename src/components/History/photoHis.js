import React, { Component } from "react";
import axios from "axios";

class PhotoHis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div className="section container">
        <div className="columns is-centered">
          
            <table class="table">
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
                    <tr>
                        <th scope="row">1</th>
                        <td>Title1</td>
                        <td>Graduation</td>
                        <td>Otto</td>
                        <td>2/2/2020</td>
                        <td>Full day</td>
                        <td>See detail</td>
                        <td>In progress</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Title2</td>
                        <td>Wedding</td>
                        <td>Ton</td>
                        <td>1/1/2020</td>
                        <td>Half day morning</td>
                        <td>See detail</td>
                        <td>Cancelled</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Title3</td>
                        <td>Portrait</td>
                        <td>Jane</td>
                        <td>27/10/2019</td>
                        <td>Half day evening</td>
                        <td>See detail</td>
                        <td>Finished</td>
                    </tr>
                </tbody>
            </table>
          
        </div>
      </div>
    );
  }
}

export default PhotoHis;
