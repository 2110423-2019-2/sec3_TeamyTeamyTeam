import React, { Component } from "react";
import "../../../stylesheets/review.css";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "A",
      Rating: 0,
      ReviewMsg: ""
    };
  }

  componentDidMount() {
    document.getElementById("launchModal").click();
  }

  handleChange(event) {
    this.setState({
      Rating: event.target.value
    });
  }

  render() {
    return (
      <div className="section container">
        <div className="columns is-centered">
          <button
            type="button"
            id="launchModal"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#modalLoginAvatar"
            style={{ visibility: "hidden" }}
          >
            Launch demo modal
          </button>
          <div
            class="modal fade"
            id="modalLoginAvatar"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
          >
            <div
              class="modal-dialog cascading-modal modal-avatar modal-sm"
              role="document"
            >
              <div class="modal-content">
                <div class="modal-header">
                  <div className="has-text-centered">
                    <div className="container h-100">
                      <div className="row h-100 align-items-center">
                        <div className="col-12 text-center ">
                          <h1>Review</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-body text-center mb-1">
                  <h5 class="mt-1 mb-2">{this.state.Name}</h5>
                  <div class="md-form ml-0 mr-0">
                    <form class="rating">
                      <label>
                        <input
                          type="radio"
                          name="stars"
                          value="1"
                          onChange={() => this.handleChange}
                        />
                        <span class="icon">★</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="stars"
                          value="2"
                          onChange={() => this.handleChange}
                        />
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="stars"
                          value="3"
                          onChange={() => this.handleChange}
                        />
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="stars"
                          value="4"
                          onChange={() => this.handleChange}
                        />
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="stars"
                          value="5"
                          onChange={() => this.handleChange}
                        />
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                      </label>
                    </form>
                  </div>
                  <div className="form-group">
                    <label>Write review for {this.state.Name}</label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                  <div class="text-center mt-4">
                    <button className="btn btn-purple mx-3">
                      <i className="mr-2"></i>Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
