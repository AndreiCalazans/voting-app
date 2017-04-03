import React from 'react';

import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

const Home = React.createClass({
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
    var that = this;
    function renderMainBtn() {
      if(that.props.user.isLogged) {
        return (
          <Link style={{color: 'white'}} to='/createPolls'>Create Poll</Link>
        )
      }else {
        return (
          <Link style={{color: 'white'}} to='/signup'>Sign Up</Link>
        )
      }
    };
    return (
      <div>
        {renderMessage()}
        <div className="main cyan lighten-4">
          <div className='introContainer col s12'>
            <h1 className='center-align'>VoteFast</h1>
            <img className='responsive-img center-align' src={require('VotingLogo.png')} alt=""/>
          </div>
          <div className="subTitle col s12">
            <p >Create custom polls with live results!</p>

            <button className='btn waves-effect waves-light'>{renderMainBtn()}</button>

          </div>
        </div>
        <div className="underBox col s12 row">
          <div className="box col s12 m4">
            <div className="card-image center-align">
              <div>
                <i className="fa fa-bolt fa-5x " aria-hidden="true"></i>
              </div>
              <span className="card-title">Live results</span>
            </div>
            <div className="card-content">
              <p>Live graphs show your poll results immediately in an easy to understand format</p>
            </div>
          </div>
          <div className="box col s12 m4">
            <div className="card-image center-align">
              <div>

                <i className="fa fa-globe fa-5x" aria-hidden="true"></i>
              </div>
              <span className="card-title">Works Everywhere</span>
            </div>
            <div className="card-content">
              <p>Traditional desktop computers now represent only 30%
              of internet traffic. Your poll must work on the tablets, smart phones,
            netbooks and notebooks that your visitors are using. Our responsive designs do just that.</p>
            </div>
          </div>
          <div className="box col s12 m4">
            <div className="card-image center-align">
              <div>
                <i className="fa fa-twitter fa-5x" aria-hidden="true"></i>
              </div>
              <span className="card-title">Social Integration</span>
            </div>
            <div className="card-content">
              <p>Free integrated Twitter or traditional tweets allow your poll votes to provide immediate feedback and
              discuss results. Social share buttons encourage your poll votes to help spread the word.</p>
            </div>
          </div>
        </div>
        <footer>
          <p className='center-align'>Made by <a href="">Andrei Calazans</a></p>
        </footer>
      </div>
    )
  }
});

export default connect((state) => {
  return state;
})(Home);
