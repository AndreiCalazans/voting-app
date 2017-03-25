import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';
import * as actions from '../actions/actions';
const Nav = React.createClass({

  handleLogOut: function() {
    var {dispatch} = this.props;
    this.toggleModal();
  dispatch(actions.notLogged());
},
  componentWillMount: function() {
    var {dispatch} = this.props;
    // to check if someone was previously logged
      axios.get('/session' , {}).then((res)=>{
        dispatch(actions.isLogged());
        dispatch(actions.currentUser(res.data.name));
      }, (res) => {

      });

  },
  toggleModal: function() {
    this.refs.modal.classList.toggle('hide');
  },
  render() {
    var isLogged = this.props.user.isLogged;

    var that = this;
    function renderUserControls() {
      if (isLogged){
        return (
          <ul id="nav-mobile" className="right">
            <li><Link to='/' onClick={that.toggleModal}>Log out</Link></li>
          </ul>
        )
      } else {
        return (
          <ul id="nav-mobile" className="right">
            <li><Link to='/signup'>Sign up</Link></li>
            <li><Link to='/login'>Login</Link></li>
          </ul>
        )
      }
    };
    return (
      <div>
        <div className='hide' ref='modal'  id='logoutModal'>
          <p><strong>Are you sure you want to log out?</strong></p>
          <button className='btn' onClick={this.handleLogOut}>Yes</button>
          <button className='btn' onClick={this.toggleModal}>No</button>
        </div>
        <nav>
          <div className="nav-wrapper teal valign-wrapper">
            <a href="#" className="col s-2 brand-logo left">  <img className='valign logoImg center-align' src={require('VotingLogo.png')} alt=""/></a>
            <ul id="nav-mobile" className="col s-4">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/polls'>Polls</Link></li>
              <li><Link to='/createPolls'>Create Polls</Link></li>
            </ul>
            {renderUserControls()}
          </div>
        </nav>
      </div>
    )
  }
})

export default connect(
  (state) => {
    return state;
  }
)(Nav);
