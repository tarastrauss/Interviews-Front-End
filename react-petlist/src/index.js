import React from 'react';
import ReactDOM from 'react-dom';
import Test from 'components/Test';
import InlineCss from "react-inline-css";

const dest = document.getElementById('content');

var DisplayBox = React.createClass({
  // Parent compenent for filter options and search results
  getInitialState: function() {
    return {url: "/static/search.json"};
  },
  handleBoardingCheck: function(e) {
    if (e.target.checked) {
      this.setState({url: "/static/search.json?service=boarding"});
    }
  },
  handleSittingCheck: function(e) {
    if (e.target.checked) {
      this.setState({url: "/static/search.json?service=sitting"});
    }
  },
  render: function() {
    return (
      <InlineCss stylesheet={`
          & .filterForm {
            color: #4A4E4E;
            text-align: center;
            box-shadow: 5px 5px 5px grey;
          }
          & hr {
            width: 90%;
          }
          & .filterForm {
            height: 70px;
            background-color: #CBD1D1;
            padding: 2px 0 2px 0;
          }
          & .optionLabel {
            display: inline-block;
            text-align: left;
          }
          & .smallerLabel {
            font-size: 12px;
            color: #778786;
          }
          & input {
            margin: 0 8px 0 15px;
            vertical-align: top;
          }
          & .filterDescription {
            vertical-align: top;
            margin-right: 20px;
          }
      `}>
        <div className="displayBox">
          <form className="filterForm" >
            <hr></hr>
            <span className="filterDescription"> Looking for: </span>
            <input type="radio" name="service" onChange={this.handleBoardingCheck} />
            <label className="optionLabel"> Boarding <div className="smallerLabel"> at Hosts home </div>
            </label>
            <input type="radio" name="service" onChange={this.handleSittingCheck} />
            <label className="optionLabel">
              Sitting <div className="smallerLabel"> at my home </div>
            </label>
            <hr></hr>
          </form>
          <ResultList url={this.state.url} />
        </div>
      </InlineCss>
    );
  }
});

var ResultList = React.createClass({
  // Parent compenent to load and render the list of search results
  loadResults: function() {
    // AJAX request to API to load data
    console.log(this.props.url);
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(data);
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
  componentWillMount: function() {
    // Load unfiltered data on initial pageload
    this.loadResults();
  },
  shouldComponentUpdate: function (nextProps, nextState) {
    // Update component when URL changes
    return (this.props.url !== nextProps.url);
  },
  componentDidUpdate: function() {
    // Load new results when component updates
    this.loadResults();
  },
  render: function () {
      var resultNodes = this.state.data.map(function(result) {
        return (
          <Result data={result} key={result.pet.id}>
          </Result>
        );
      });
      return (
        <InlineCss stylesheet={`
          & .resultList {
            margin-top: 20px;
          }
        `}>
          <div className="resultList">
            {resultNodes}
          </div>
        </InlineCss>
    );
  }
});

var Result = React.createClass({
    // Compenent for individual search results
    formatUserName: function(first, last) {
      // Formats username to display the first name with a capital first
      // letter and only the first letter of the last name.
      return first[0].toUpperCase() + first.slice(1) + ' '
       + last[0].toUpperCase() + '.';
    },
    truncateDescription: function(description) {
      if (description.length < 48) {
        return description;
      } else if (description[48] != ' ') {
        var shortString = description.substring(0, 47);
        return shortString.substring(0, shortString.lastIndexOf(' ')) + '...';
      } else {
        return (description.substring(0, 47) + '...');
      }
    },
    render: function() {
      var username = this.formatUserName(this.props.data.user.first, this.props.data.user.last);
      var description = this.truncateDescription(this.props.data.description);
      return (
        <InlineCss stylesheet={`
          & .result {
            margin-top: 20px;
            font-size: 14px;
          }
          & .resultTitle {
            color: #3FBFB8;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          & .resultUser {
            color: #4A4E4E;
          }
          & .resultDescription {
            color: #4A4E4E;
            margin-top: 2px;
          }
          & .resultPetName {
            color: #4A4E4E;
            font-style: italic;
            margin-left: 5px;
            background-color: #DCDEDE;
            padding: 2px 4px 2px 4px;
            border-radius: 5px;
          }
        `}>
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
        </InlineCss>
      );
    }
  });

ReactDOM.render(
  <DisplayBox />,
  dest
);

window.React = React; // enable debugger
