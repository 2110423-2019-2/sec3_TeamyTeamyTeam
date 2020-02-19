import React, { Component } from "react";
import SearchResultCard from "./search-result-card";
import axios from "axios";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeKeyword = this.onChangeKeyword.bind(this);
    this.state = {
      searchResult: [],
      inputKeyword: "", //inputKeyword and keyword are for a Category text display purpose
      keyword: "",
      isSubmit: false //Check if is user clicked on the submit button for a Category text display purpose
    };
  }

  onChangeKeyword(e) {
    this.setState({ inputKeyword: e.target.value });
  }

  getResult() {
    //This function is where Back-end operates e.g. fetching photographer data from server
    let searchResult = [];
    //Use this.state.keyword to query correct photographers
    axios
      .get("http://localhost:9000/api/portfolio")
      .then(res => {
        console.log(res.data.data);
        searchResult = res.data.data;
        this.setState({ isSubmit: true });
        this.setState({ searchResult: searchResult });
      })
      .catch(err => console.error(err));
  }

  handleSubmit(e) {
    //Operate when we click on submit button to get the search keyword
    e.preventDefault();
    if (this.state.inputKeyword !== "") {
      this.setState({ keyword: this.state.inputKeyword });
      this.getResult();
    }
  }

  render() {
    let numberOfResultText =
      this.state.searchResult.length > 0
        ? "Found " +
          this.state.searchResult.length +
          " Photographer in " +
          this.state.keyword +
          " Category"
        : "There are no photographer in " + this.state.keyword + " category.";
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
              value={this.state.inputKeyword}
              onChange={this.onChangeKeyword}
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
        <p
          className="lead text-center mb-3"
          style={{
            visibility:
              this.state.searchResult.length >= 0 && this.state.isSubmit
                ? "visible"
                : "hidden"
          }}
        >
          {numberOfResultText}
        </p>
        {/* Results show here */}
        <div className="row">
          {this.state.searchResult.map(card => (
            <SearchResultCard key={card._id} name={card.portfolioName} />
          ))}
        </div>
      </div>
    );
  }
}
