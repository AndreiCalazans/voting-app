import React from 'react';
import Nav from 'Nav';

const Home = React.createClass({
  render() {
    return (
      <div>
        <Nav></Nav>
      
        {this.props.children}
      </div>
    )
  }
});


export default Home;
