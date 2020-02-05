import React, { Component } from "react";

class SearchPage extends Component {

  
    handleChange = event => {
      this.setState({ filter: event.target.value });
    };
  
    render() {
      const { filter, data } = this.state;
      const lowercasedFilter = filter.toLowerCase();
      const filteredData = data.filter(item => {
        return Object.keys(item).some(key =>
          item[key].toLowerCase().includes(lowercasedFilter)
        );
      });
  
      return (
        <div>
          <input value={filter} onChange={this.handleChange} />
          {filteredData.map(item => (
            <div key={item.email}>
              <div>
                {item.fname} {item.lname} - {item.gender} - {item.email}
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
  
export default SearchPage;