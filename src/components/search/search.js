import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchResultCard from "./search-result-card";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    searchResult: []
  };

  getResult(keyword) {
    let searchResult = [];
    for (let i = 0; i < 5; i++) {
      searchResult.push({
        id: i,
        name: i,
        tag: keyword
      });
    }
    this.photographerFound();
    this.setState({ searchResult });
  }

  handleSubmit(e) {
    e.preventDefault();
    let keyword = document.getElementById("inputSearch").value;
    if (keyword !== "") {
      this.getResult(keyword);
    }
  }

  photographerFound() {
    return this.state.searchResult.length > 0
      ? "Found " + this.state.searchResult.length + " Photographers"
      : "";
  }

  render() {
    return (
      <div className="container my-5">
        <form method="post">
          <div className="input-group mb-3">
            <input
              type="search"
              className="form-control"
              placeholder="Seach photographers"
              aria-label="Seach photographers"
              aria-describedby="basic-addon2"
              id="inputSearch"
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-dark"
                type="submit"
                onClick={this.handleSubmit}
              >
                Search
              </button>
            </div>
          </div>
        </form>
        {/* <form method="post" className="form-search">
          <div className="form-label-group form-row">
            <input
              type="text"
              id="inputSearch"
              className="form-control col-md-10"
              placeholder="Search"
              required
            />
            <label htmlFor="inputSearch" className="col-md-10">
              Search
            </label>
            <button
              type="submit"
              className="btn btn-outline-dark col-md-2"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </div>
        </form> */}
        <p className="lead text-center mb-4">{this.photographerFound}</p>
        {/* Results show here */}
        <div className="row">
          {this.state.searchResult.map(card => (
            <SearchResultCard key={card.id} name={card.name} />
          ))}
        </div>
      </div>
    );
  }
}
