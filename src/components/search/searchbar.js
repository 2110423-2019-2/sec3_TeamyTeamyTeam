import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  state = {};

  render() {
    const { onSubmit } = this.props;
    return (
      <form method="post" className="form-search">
        <div className="form-label-group">
          <input
            type="text"
            id="inputSearch"
            className="form-control"
            placeholder="Search"
            required
            autoFocus
          />
          <label htmlFor="inputSearch">Search</label>
          <button type="submit" className="btn btn-primary" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default SearchBar;
