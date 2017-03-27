import React from 'react';


export var Poll = React.createClass({
  componentWillMount: function() {
    console.log(this.props.params);
  },
  render() {
    return (
      <div>
        {this.props.params.question}
      </div>
    )
  }
});


export default Poll;
