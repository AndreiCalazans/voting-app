import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router , browserHistory} from 'react-router'
// components
import routes from 'router/index';

//App css
require('app.scss');

var store = require('configureStore').configure();


//
// ReactDOM.render(
//   <Provider store={store}>
//     {router}
//   </Provider>,
//   document.getElementById('app')
// );
ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory}></Router>
  </Provider>,
  document.getElementById('app')
);
