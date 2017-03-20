import React from 'react';
import {Link} from 'react-router';
const Nav = React.createClass({
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper teal valign-wrapper">
            <a href="#" className="col s-2 brand-logo left">  <img className='valign logoImg center-align' src={require('VotingLogo.png')} alt=""/></a>
            <ul id="nav-mobile" className="col s-4">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/polls'>Polls</Link></li>
              <li><Link to='/createPolls'>Create Polls</Link></li>
            </ul>
            <ul id="nav-mobile" className="right">
              <li><Link>Sign in</Link></li>
              <li><Link>Login</Link></li>
            </ul>

          </div>
        </nav>
      </div>
    )
  }
})

export default Nav;
