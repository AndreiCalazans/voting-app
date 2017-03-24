import React from 'react';
import Nav from 'Nav';

const Home = React.createClass({
  render() {
    return (
      <div>
        <Nav></Nav>
        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Modal Header</h4>
            <p>A bunch of text</p>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
        {this.props.children}
      </div>
    )
  }
});


export default Home;
