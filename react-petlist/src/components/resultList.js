import React from 'react';
import Result from 'components/result';

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
  formatUrl: function(originalUrl) {
    // Uses regex to replace non-alphanumeric characters or underscores with
    // dashes, and remove double dashes.
    return originalUrl.replace(/[^a-zA-Z0-9_]/g, "-").replace(/(\-)\1+/g, "-");
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
      var url = this.formatUrl(this.props.url);
      var resultNodes = this.state.data.map(function(result) {
        return (
          <Result data={result} key={result.pet.id}>
          </Result>
        );
      });
      return (
          <div className="resultList">
            <div className="urlBox">You are searching:
              <span className="url"> {url} </span>
            </div>
            {resultNodes}
          </div>
    );
  }
});

module.exports = ResultList;
