import React from 'react';
import Nav from 'Nav';

const Home = React.createClass({
  handleSideBar: function() {
      if (document.getElementById('side-bar').style.left == '0px') {
        document.getElementById('side-bar').style.left = '-100%';
      }
  },
  render() {
    return (
      <div>
        <Nav></Nav>
        <div className='childrenContainer' onClick={this.handleSideBar}>

          {this.props.children}
        </div>
      </div>
    )
  }
});


export default Home;
