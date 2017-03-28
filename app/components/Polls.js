import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {connect} from 'react-redux';
const Polls = React.createClass({
  getInitialState: function() {
    return {
      Polls: null,
      filter: 'normal'
    }
  },
  componentWillMount: function() {
  axios.get('/allPolls',{}).then((res)=> {
      let allPolls = [...res.data];
      this.setState({Polls: allPolls})
    })
  },
  handleFilter: function(e) {
    this.setState({
      filter: e.target.innerText
    })
    var items = document.querySelectorAll('.filter').forEach((each)=> {
      each.classList.remove('selected');
    });
    e.target.classList.add('selected');
  },
  handleDeletePoll: function(quest) {
    var that = this;
    axios.post('/delete', {question: quest}).then((res) => {
      that.setState(that.state);
    }, (res) => {
      console.log(res);
    })
  },
  render() {
    var that = this;
    function renderAllPolls() {
      if (that.state.Polls) {
        let polls = that.state.Polls;
        if(that.state.filter === 'Recent'){
          let recentOrder = [];
          for (var i = polls.length ; i > 0 ; i-- ){
            recentOrder.push(polls[i - 1])
          }
          polls = recentOrder;
        } else if (that.state.filter === 'Yours') {
          polls = polls.filter((each) => {
            return each.name === that.props.user.name;
          });
        }
        return polls.map((poll) => {
          function deleteBtn() {
            if(that.props.user.isLogged && that.props.user.name === poll.name) {
              return (
                <i onClick={() => {that.handleDeletePoll(poll.question)}} className="fa fa-trash-o" aria-hidden="true"></i>
              )
            }
          };
            return (
              <li key={poll._id} className="collection-item">
                <div>
                  <Link to={'/' + poll.question}>{poll.question}?</Link>
                  <i className="material-icons secondary-content">
                    {deleteBtn()}
                
                    {poll.name}
                  </i>
                </div>
              </li>
            )
          });

      } else {
        return   <li className="collection-item"><div>Loading...!</div></li>
      }
    };
    function renderFilter() {
      if (that.props.user.isLogged) {
        return (
          <div className='right-align '><a className='filter' onClick={that.handleFilter} >All</a>/
          <a className='filter' onClick={that.handleFilter} >Recent</a>/
          <a className='filter' onClick={that.handleFilter} >Yours</a>
        </div>
      )
      }else {
        return (
          <div className='right-align'><a className='filter' onClick={that.handleFilter} >All</a>/
          <a className='filter' onClick={that.handleFilter} >Recent</a>
        </div>
        )
      }
    };
    return (
      <div className='row'>
        <ul className="collection with-header col s12 m10 offset-m1">
           <li className="collection-header">
             <h4>Polls </h4>
               {renderFilter()}
           </li>
           {renderAllPolls()}

        </ul>
      </div>
    )
  }
});


export default connect((state) =>{return state;})(Polls);
