import React from 'react';
import axios from 'axios';



var Results = React.createClass({
  getInitialState: function() {
    return {
      results: null
    }
  },
  componentWillMount:function() {
    axios.get('/poll/'+this.props.question, {}).then((res) => {
      this.setState({results: res.data[0].options});
    }, (res) => {
      console.log('error', res);
    })
  },
  render() {
    var that = this;
    function renderResults() {
      if (that.state.results) {
        let counter = 0;
        return that.state.results.map((each) => {

          return (
            <li key={counter++}>{each.value+ ' = ' + each.vote}</li>
          )
        })
      } else {
        return (
          <div>Loading</div>
        )
      }
    };
    return (
      <div>
        These are the result for the question {this.props.question}
        and these are the results
        <ul>
          {renderResults()}
        </ul>
      </div>
    )
  }
});

export default Results;
