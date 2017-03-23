import React from 'react';
import { startLogin} from '../actions/actions';
import {connect} from 'react-redux';
import axios from 'axios';
import {browserHistory} from 'react-router';
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
      dispatch(actions.currentUser(this.refs.name.value));
      browserHistory.push('/');
    }, (res) => {
      console.log('no good');
    });
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
            <input className="btn waves-effect waves-light right" type="button" name="signUpwithFacebook" value='Sign up with facebook' />
          </div>

        </form>
      </div>
    )
  }
});

export default connect()(Signup);
