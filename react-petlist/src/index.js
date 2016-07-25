import React from 'react';
import ReactDOM from 'react-dom';
import Test from 'components/Test';
import 'css/index.css';

const dest = document.getElementById('content');

// Parent compenent for filter options and search results
var DisplayBox = React.createClass({
  getInitialState: function() {
    return {url: "/static/search.json"};
  },
  handleServiceRadioBtn: function(e) {
    // Changes url for ResultList when radio button is clicked
    this.setState({url: "/static/search.json?service=" + e.target.value});
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

// Parent component to load and render the list of search results
var ResultList = React.createClass({
  loadResults: function(url) {
    // AJAX request to API to load data
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data.search});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    // Load unfiltered data on initial pageload
    this.loadResults(this.props.url);
  },
  componentWillReceiveProps: function(nextProps) {
    // Load filtered data when Url is changed
    if (nextProps.url !== this.props.url) {
      this.loadResults(nextProps.url);
    }
  },
  render: function () {
      var resultNodes = this.state.data.map(function(result) {
        return (
          <Result data={result} key={result.pet.id}>
          </Result>
        );
      });
      return (
          <div className="resultList">
            {resultNodes}
          </div>
    );
  }
});

// Compenent for individual search results
var Result = React.createClass({
    formatUserName: function(first, last) {
      // Formats username to display the first name with a capital first
      // letter and only the first letter of the last name.
      return first[0].toUpperCase() + first.slice(1) + ' '
       + last[0].toUpperCase() + '.';
    },
    truncateDescription: function(description) {
      // Truncates descriptions longer then 48 characters. If 48th character is
      // in the middle of a word, the entire word is left out.
      if (description.length <= 48) {
        return description;
      } else if (description[48] != ' ') {
        var shortString = description.substring(0, 48);
        return shortString.substring(0, shortString.lastIndexOf(' ')) + '...';
      } else {
        console.log('hey');
        return description.substring(0, 48) + '...';
      }
    },
    render: function() {
      var username = this.formatUserName(this.props.data.user.first, this.props.data.user.last);
      var description = this.truncateDescription(this.props.data.description);
      return (
        <div className="result">
          <div className="resultTitle">
            {this.props.data.title}
          </div>
          <span className="resultUser">
            {username}
          </span>
          <span className="resultPetName">
            {this.props.data.pet.name}
          </span>
          <div className="resultDescription">
            {description}
          </div>
        </div>
      );
    }
  });

ReactDOM.render(
  <DisplayBox />,
  dest
);

window.React = React; // enable debugger
