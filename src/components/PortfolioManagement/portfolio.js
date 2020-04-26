import React, { Component } from "react";
import PortfolioHeader from "./portfolioHeader";
import PhotoCategory from "./photoCategory";
import ReviewCard from "../Review/ReviewCard";
import { Link } from "react-router-dom";
import axios from "axios"
import "../../stylesheets/portfolio.css";

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photographerName: this.props.match.params.name,
      pid: '',
      profilePic:'',
      portfolioLink: "/portfolio/" + this.props.name,
      photoList: [],
      rating: 0,
      reviewList: [],
      headerCoverImage:
        "https://images.pexels.com/photos/590029/pexels-photo-590029.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      email: '',
      albumlist: [] 
    };
    this.getPortfolio = this.getPortfolio.bind(this)
  }

  componentDidMount() {
    //Fetch photographer data in this function and then update the state
    //Write something to fetch data e.g. profile's pic, and photos
    // this.setState({profilePic: });
    // this.setState({headerCoverImage: });
    //photoList Sample

    console.log(' From search  >>>>>>',this.props.match.params.name)
    console.log('Print Personal nick id should be == "5e67e17e6726591834031203" ',this.props.location.state)
    if (this.props.match.params.name == "users"){
      axios
      .get("http://localhost:9000/api/portfolio/" + localStorage.email)
      .then((res) => {
        console.log('getPortfolio()',res.data.data)
        this.setState({albumlist: res.data.data.albums})
      }).then( () =>{
        this.fetchPersonalData(localStorage.email)
      })
    } else {
      this.getPortfolio()
    }
    
  }


  async getPortfolio(){
    await this.setState({pid:this.props.location.state._id})
    var tempEmail ;
    await axios
    .get("http://localhost:9000/api/portfolio/id/" + this.state.pid)
    .then((res) => {
      console.log('getPortfolio()',res.data.data)
      this.setState({albumlist: res.data.data.albums})
      tempEmail = res.data.data.email;
    })

    await this.fetchPersonalData(tempEmail);
  }

  async fetchPersonalData(email){
    console.log('Use fetchPersonalData')
    var tempPortfolioName;
    // Get profile in portfolio
    await axios
    .get("http://localhost:9000/api/user/" + email )  
    .then((res) => {
      console.log('getUser()',res.data.data[0])
      var resData = res.data.data[0] ;
      // setstate data 
      this.setState({
        profilePic: resData.profileImage,
        email: email ,
        
      })
      tempPortfolioName = resData.displayName
    })

    // Get rating in Review 
    await axios
    .get("http://localhost:9000/api/review/" + tempPortfolioName )  
    .then((res) => {
      console.log('Get rating in Review',res.data.data)
      var tempReviewArray = [] ;
      if (res.data.data.length == 0){
        this.setState({
          rating: 0,
          reviewList: []
        })
      }else {
        let sum ;
        for (let iter in res.data.data) {
          tempReviewArray.push(iter.rating)
          sum += iter.rating
        }
          this.setState({
            rating: sum / (tempReviewArray.length - 1),
            reviewList: tempReviewArray
          })
      }
      })


    // Get Picture from album
    if (this.state.albumlist){
      var Photolist = []
      for (let album_id of this.state.albumlist){
        await axios
          .get("http://localhost:9000/api/album/" + album_id)
          .then((res) => {
            console.log('Get Picture from album portfolio',res.data.data[0].imageURLs);
            for ( let iter of res.data.data[0].imageURLs) {
              console.log(iter)
              Photolist.push(iter.url)
            }
            console.log('Photolist',Photolist)
            
          })
          .catch((err) => console.error(err));
      }
      this.setState({ photoList: Photolist });
    }else{
      this.setState({ photoList: [] });
    }
    console.log('album list',this.state.albumlist)
  }


  render() {
    return (
      <div>
        <div className="some-container">
          {
            (() => {
                if ( localStorage.email == this.state.email)
                    return <a href={this.state.photographerName + "/" + "edit"}>
                              <button
                                className="btn btn-md btn-primary position-fixed m-3"
                                style={{ right: "0", bottom: "0" }}
                              >
                                <ion-icon name="settings-outline"></ion-icon> Edit Portfolio
                              </button>
                            </a>
                else
                    return <span>Three</span>
            })()
          }
        </div>

        <PortfolioHeader
          key={this.state.photographerName}
          name={this.state.photographerName}
          profilePic={this.state.profilePic}
          headerCoverImage={this.state.headerCoverImage}
          rating={this.state.rating}
          totalReview={this.state.reviewList.length}
        />
        {this.state.reviewList.length > 0 ? (
          <div
            className="container-fluid my-4"
            style={{ height: "230px", maxHeight: "230px" }}
          >
            <h1>Reviews</h1>
            <div className="row flex-row flex-nowrap overflow-auto">
              {this.state.reviewList.map((review, index) => (
                <ReviewCard key={index.toString()} />
              ))}
            </div>
          </div>
        ) : null}
        <div className="container-fluid my-4">
          <div className="row">
            {/* If there is more than 1 category we have to map this */}
            <PhotoCategory
              key={1}
              category="Photo"
              photoList={this.state.photoList}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;
