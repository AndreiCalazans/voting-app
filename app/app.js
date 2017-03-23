import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory} from 'react-router';

// components
import router from 'router/index';

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
  <div>Hello</div>,
  document.getElementById('app')
);
