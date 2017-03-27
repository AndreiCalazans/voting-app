import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
const Polls = React.createClass({
  getInitialState: function() {
    return {
      Polls: null
    }
  },
  componentWillMount: function() {
  axios.get('/allPolls',{}).then((res)=> {
      let allPolls = [...res.data];
      this.setState({Polls: allPolls})
    })
  },
  render() {
    var that = this;
    function renderAllPolls() {
      if (that.state.Polls) {
        return that.state.Polls.map((poll) => {
            return (
              <li key={poll._id} className="collection-item"><div><Link to={'/' + poll.question}>{poll.question}</Link><i className="material-icons secondary-content">{poll.name}</i></div></li>
            )
          });

      } else {
        return   <li className="collection-item"><div>Loading...!</div></li>
      }
    };
    return (
      <div className='row'>
        <ul className="collection with-header col s12 m10 offset-m1">
           <li className="collection-header"><h4>Polls</h4></li>
           {renderAllPolls()}

        </ul>
      </div>
    )
  }
});


export default Polls;
