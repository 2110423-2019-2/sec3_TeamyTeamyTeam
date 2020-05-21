/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
class SearchResultCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photographerName: this.props.name,
      profilePic:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      portfolioLink: "/portfolio/" + this.props.name,
    };
  }

  componentDidMount() {
    console.log(this.state.photographerName)
    this.getPortfolio()
  }


  async getPortfolio(){
    var tempEmail ;
    console.log('this.props._id',this.props.pid)
    await axios
    .get("https://phomo-api.herokuapp.com/api/portfolio/id/" + this.props.pid)
    .then((res) => {
      console.log('getPortfolio()',res.data.data)
      tempEmail = res.data.data.email;
    })

    await this.fetchPersonalData(tempEmail);
  }

  async fetchPersonalData(email){
    console.log('Use fetchPersonalData')
    // Get profile in portfolio
    await axios
    .get("https://phomo-api.herokuapp.com/api/user/" + email )  
    .then((res) => {
      console.log('getUser()',res.data.data[0])
      var resData = res.data.data[0] ;
      // setstate data 
      console.log()
      this.setState({
        profilePic: resData.profileImage,
      })
    })
  }

  render() {
    return (
      <div className="col-md-4 mb-5">
        <div className="card">
          <img
            className="card-img-top"
            src={this.state.profilePic}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{this.state.photographerName}</h5>
            {/* <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p> */}
            {/* <Link
              to={this.state.portfolioLink}
              
              className="btn btn-primary mx-auto"
            >
              See {this.state.photographerName}'s Portfolio
            </Link> */}

            <Link to={{
              pathname: this.state.portfolioLink,
              state: {
                _id: this.props.pid
              }
            }}>See {this.state.photographerName}'s Portfolio</Link>

          </div>
        </div>
      </div>
    );
  }
}

export default SearchResultCard;
