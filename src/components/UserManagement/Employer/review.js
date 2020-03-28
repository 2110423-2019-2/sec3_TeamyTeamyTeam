import React, { Component } from "react";
import "../../../stylesheets/review.css";


class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Name : "A",
        Rating : 0,
        ReviewMsg : ""
    };
  }

  handleChange(event) {
    this.setState({
      Rating: event.target.value
    });
  }


  render() {

    return (
      <div className="has-text-centered">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 text-center ">
              <form class="rating">
                <label>
                  <input type="radio"name="stars" value="1" onChange={() => this.handleChange} />
                  <span class="icon">★</span>
                </label>
                <label>
                  <input type="radio" name="stars" value="2" onChange={() => this.handleChange}/>
                  <span class="icon">★</span>
                  <span class="icon">★</span>
                </label>
                <label>
                  <input type="radio" name="stars" value="3" onChange={() => this.handleChange}/>
                  <span class="icon">★</span>
                  <span class="icon">★</span>
                  <span class="icon">★</span>   
                </label>
                <label>
                  <input type="radio" name="stars" value="4" onChange={() => this.handleChange}/>
                  <span class="icon">★</span>
                  <span class="icon">★</span>
                  <span class="icon">★</span>
                  <span class="icon">★</span>
                </label>
                <label>
                  <input type="radio" name="stars" value="5" onChange={() => this.handleChange}/>
                  <span class="icon">★</span>
                  <span class="icon">★</span>
                  <span class="icon">★</span>
                  <span class="icon">★</span>
                  <span class="icon">★</span>
                </label>
              </form>
              <div className="form-group">
                <label>Write review for {this.state.Name}</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
