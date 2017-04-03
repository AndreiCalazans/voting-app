import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import * as actions from 'actions/actions';
import FacebookLogin from 'react-facebook-login';

const Login = React.createClass({
  handleLogIn: function(e) {
    var {dispatch}  = this.props;
    e.preventDefault();
    axios.post('/login', {
      email: this.refs.email.value,
      password: this.refs.password.value
    }).then((res) =>{
      dispatch(actions.isLogged());
      dispatch(actions.currentUser(res.data.user.name, res.data.user.email));
      dispatch(actions.flashMsg(res.data.messages));
      browserHistory.push('/');
    }, (res) => {
      dispatch(actions.flashMsg('opps!, something is wrong, try again!'));
    });
  },
  responseFacebook: function(res) {
    const {dispatch} = this.props;

    dispatch(actions.isLogged());
    dispatch(actions.currentUser(res.name , res.email));
    dispatch(actions.flashMsg('welcome, you are logged in'));
    axios.post('/signupWithFacebook', {
      user: res
    }).then((res) => {

    }, (res) => {
      dispatch(actions.flashMsg('opps!, something is wrong, try again!'));

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
        <form className='col s12 m10 offset-m1' action="" >
          <h1>Login</h1>
          <div className="row input-field">
            <input type="email" ref='email' id='email' placeholder='Email' className="validate"/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="row input-field">
            <input type="password" ref='password' id='password' placeholder='Password' className="validate"/>
            <label htmlFor="password">Password</label>
          </div>
          <div className="row input-field btn-box">
            <input onClick={this.handleLogIn}  className="btn waves-effect waves-light" type="submit" name="action" />
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

export default connect((state) => {return state})(Login);
