import React from 'react';
import { startLogin} from '../actions/actions';
import {connect} from 'react-redux';
import axios from 'axios';
import {browserHistory} from 'react-router';
import FacebookLogin from 'react-facebook-login';
import * as actions from 'actions/actions';
const Signup = React.createClass({
  handleSignUp: function(e) {
    const {dispatch} = this.props
    e.preventDefault();
    axios.post('/signup', {
      email: this.refs.email.value,
      password: this.refs.password.value,
      name: this.refs.name.value
    }).then((res) =>{
      console.log(res);
      dispatch(actions.isLogged());
      dispatch(actions.currentUser(res.data.user.name , res.data.user.email));
      dispatch(actions.flashMsg(res.data.messages));
      browserHistory.push('/');
    }, (res) => {
      dispatch(actions.flashMsg('User already exists, change email'));
    });
  },
  responseFacebook: function(res) {
    const {dispatch} = this.props;
    dispatch(actions.isLogged());
    dispatch(actions.currentUser(res.name, res.email));
    dispatch(actions.flashMsg('welcome, you are logged in'));
    axios.post('/signupWithFacebook', {
      user: res
    }).then((res) => {
      console.log(res);
    }, (res) => {
      dispatch(actions.flashMsg('Oops!, something is wrong, try again'));

    });
    browserHistory.push('/');
  },
  render() {
    var that = this;
    function renderMessage() {
      var messages = that.props.messages || 0;
      var dispatch = that.props.dispatch;

      if (messages.length > 0) {
        setTimeout(() => {
          that.refs.dialogue.classList.add('hide');
          dispatch(actions.deleteMsg());
        },2000);

        return (
          <div ref='dialogue' className="dialogue ">
            <p>{messages}</p>
          </div>
        )
      }
    };
    return (
      <div className='row'>
        {renderMessage()}
        <form className='col s12 m10 offset-m1' action="">
          <h1>Sign Up</h1>
          <div className="row input-field">
            <input type="text" ref='name' placeholder='Name' className="validate"/>
            <label htmlFor="name">Name</label>
          </div>
          <div className="row input-field">
            <input id='email' type="email" ref='email' placeholder='Email' className="validate"/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="row input-field">
            <input type="password" ref='password' placeholder='Password' className="validate"/>
            <label htmlFor="password">Password</label>
          </div>
          <div className="row input-field btn-box">
            <input onClick={this.handleSignUp} className="btn waves-effect waves-light" type="submit" name="action"/>
            <FacebookLogin
              appId="1087835221322773"
              autoLoad={false}
              fields="name,email"
              callback={this.responseFacebook}
              cssClass="btn waves-effect waves-light right"
              icon="fa-facebook"
          />

          </div>

        </form>
      </div>
    )
  }
});

export default connect((state) => {
  return state;
})(Signup);
