import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';
import * as actions from '../actions/actions';
// import $ from 'jquery';



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
  handleSideBar: function() {
      if (document.getElementById('side-bar').style.left == '0px') {
        document.getElementById('side-bar').style.left = '-100px';
      }
  },
  toggleModal: function() {
    this.refs.modal.classList.toggle('hide');
  },
  handleSideBar: function() {
    if(this.refs.side.style.left == '0px') {
      this.refs.side.style.left = '-100%';

    }else {
      this.refs.side.style.left = 0;
    }
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
          <ul id="" className="right">
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
            <Link to='/' className="col s-2 brand-logo left">  <img className='valign logoImg center-align' src={require('VotingLogo.png')} alt=""/></Link>

            <ul id="nav-mobile" className="hide-on-small-only">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/polls'>Polls</Link></li>
              <li><Link to='/createPolls'>Create Polls</Link></li>
              {renderUserControls()}
            </ul>
            <div className="barsContainer hide-on-med-and-up">
              <i className="hide-on-med-and-up fa fa-bars fa-2x" onClick={this.handleSideBar} aria-hidden="true"></i>
            </div>




          </div>
        </nav>
        <div onClick={this.handleSideBar} className="side-container">
          <ul ref='side' id="side-bar" className="hide-on-med-and-up">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/polls'>Polls</Link></li>
            <li><Link to='/createPolls'>Create Polls</Link></li>
            {renderUserControls()}
          </ul>
        </div>
      </div>
    )
  }
})

export default connect(
  (state) => {
    return state;
  }
)(Nav);
