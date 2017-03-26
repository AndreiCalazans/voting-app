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
      dispatch(actions.currentUser(res.data.name));
      browserHistory.push('/');
    }, (res) => {
      console.log('no good');
    });
  },
  responseFacebook: function(res) {
    const {dispatch} = this.props;
    console.log(res);
    dispatch(actions.isLogged());
    dispatch(actions.currentUser(res.name));
    axios.post('/signupWithFacebook', {
      user: res
    }).then((res) => {
      console.log(res);
    }, (res) => {
      console.log('problems');
    });
    browserHistory.push('/');
  },
  render() {
    return (
      <div className='row'>
        <form className='col s6 offset-s3' action="">
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
          <div className="row input-field">
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

export default connect()(Signup);
