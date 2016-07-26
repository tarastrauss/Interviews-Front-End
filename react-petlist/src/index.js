import React from 'react';
import ReactDOM from 'react-dom';
import Test from 'components/Test';
import 'css/index.css';
import ResultList from 'components/resultList';

const dest = document.getElementById('content');

// Parent component for filter options and search results
var DisplayBox = React.createClass({
  getInitialState: function() {
    return {url: "http://localhost:3000/static/search.json"};
  },
  handleServiceRadioBtn: function(e) {
    // Changes url for ResultList when radio button is clicked
    this.setState({url: "http://localhost:3000/static/search.json?service=" + e.target.value});
  },
  render: function() {
    return (
      <div className="displayBox">
        <div className="headerBox">
          <div className="logo"></div>
          <div className="header">Search for a Sitter!</div>
        </div>
        <form className="filterForm" onChange={this.handleServiceRadioBtn}>
          <hr></hr>
          <span className="filterDescription"> Looking for: </span>
          <input type="radio" name="service" value="boarding" />
          <label className="optionLabel">
            Boarding <div className="smallerLabel"> at Hosts home </div>
          </label>
          <input type="radio" name="service" value="sitting" />
          <label className="optionLabel">
            Sitting <div className="smallerLabel"> at my home </div>
          </label>
          <hr></hr>
        </form>
        <ResultList url={this.state.url} />
      </div>
    );
  }
});

ReactDOM.render(
  <DisplayBox />,
  dest
);

window.React = React; // enable debugger
