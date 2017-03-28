import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import axios from 'axios';
const CreatePolls = React.createClass({
  getInitialState: function(){
    return {
      quantity:2
    };
  },
  componentWillMount: function() {
    var {user} = this.props;
    // if (!user.isLogged) {
    //   browserHistory.push('/login')
    // }
  },
  addOption: function() {
    var current = this.state.quantity + 1;
    this.setState({
      quantity: current
    });
  },
  removeOption: function() {
    var current = this.state.quantity - 1;
    if (current > 1) {
      this.setState({
        quantity: current
      });
    } else {
      alert("Minimum 2 options");
    }
  },
  handlePollCreate:function(e) {
    e.preventDefault();
    let question = this.refs.question.value;
    if (question.match(/[\?]/g)) {
      question.match(/[\?]/g).forEach((value)=> {
        question = question.replace(value, '');
      })
    };

    var email = this.props.user.email;
    var name = this.props.user.name;
    let inputs = {
      createdBy: email,
      name: name,
      question: question,
      options: []
    };
    for (var i = 0 ; i < this.state.quantity ; i++) {
      let option = 'option' + i;
      inputs.options.push({value: this.refs[option].value, vote: 0});
    };
    axios.post('/createPoll', inputs).then((res)=>{
      // create msg to say that poll was created then redirect to poll page to see it
      // push to the page of the poll
      browserHistory.push('/polls');
    }, (res) => {
      // send msg that something went wrong
      console.log(res);
    });

  },
  render() {
    var that = this;
    function renderOptions() {
      var quantity = that.state.quantity;
      var arrayOfquant = [];
      for (var i = 0 ; i < quantity ; i++) {
        arrayOfquant.push(i);
      };
        return arrayOfquant.map((each) => {
          return (

            <div key={each} className="row input-field">
              <input type="text" ref={'option' + each} placeholder='Option' className="validate"/>
              <label htmlFor="option">Option</label>
            </div>
          )
        });
    };

    return (
      <div className='row'>
        <form className='col s8 offset-s2' action="">
          <h1>Create your own Poll</h1>
          <div className="row input-field">
            <input type="text" ref='question' placeholder='Question' className="validate"/>
            <label htmlFor="name">Question</label>
          </div>
          {renderOptions()}
          <div className="row input-field center-align">
            <input onClick={this.addOption}  className="btn option-btn waves-effect waves-light" type='button' name="action" value='Add more options'/>
            <input onClick={this.removeOption}  className="btn option-btn waves-effect waves-light" type='button' name="action" value='Remove an option'/>
          </div>
          <hr/>
          <div className="row input-field center-align">
            <input onClick={this.handlePollCreate}  className="btn waves-effect waves-light" type="submit" name="action" value='Create Poll'/>
          </div>


        </form>
      </div>
    )
  }
});


export default connect((state) => {return state})(CreatePolls);
