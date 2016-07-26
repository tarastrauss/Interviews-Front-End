import React from 'react';

// Component for individual search results
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

module.exports = Result;
