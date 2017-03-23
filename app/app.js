import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory} from 'react-router';

// components
import router from 'router/index';

//App css
require('app.scss');



ReactDOM.render(
  router,
  document.getElementById('app')
);
