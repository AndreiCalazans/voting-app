import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import * as actions from 'actions/actions';

const Login = React.createClass({
  handleLogIn: function(e) {
    console.log('hello');
    var {dispatch}  = this.props;
    e.preventDefault();
    axios.post('/login', {
      email: this.refs.email.value,
      password: this.refs.password.value
    }).then((res) =>{
      console.log(res);
      dispatch(actions.isLogged());
      dispatch(actions.currentUser(res.data.name));
      browserHistory.push('/');
    }, (res) => {
      console.log('no good');
    });
  },
  render() {
    return (
      <div className='row'>
        <form className='col s6 offset-s3' action="" >
          <h1>Login</h1>
          <div className="row input-field">
            <input type="email" ref='email' id='email' placeholder='Email' className="validate"/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="row input-field">
            <input type="password" ref='password' id='password' placeholder='Password' className="validate"/>
            <label htmlFor="password">Password</label>
          </div>
          <div className="row input-field">
            <input onClick={this.handleLogIn}  className="btn waves-effect waves-light" type="submit" name="action" />
            <input className="btn waves-effect waves-light right" type="button" name="loginWithFacebook" value='Log in with facebook' />
          </div>

        </form>
      </div>
    )
  }
});

export default connect()(Login);
