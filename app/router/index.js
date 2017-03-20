import React from 'react';
import {Route, Router, IndexRoute, browserHistory} from 'react-router';

import Home from 'Home';
import Polls from 'Polls';
import CreatePolls from 'CreatePolls';



export default (
  <Router history={browserHistory}>
    <Route path='/' component={Home} >
      <IndexRoute ></IndexRoute>
      <Route path='/polls' component={Polls}></Route>
      <Route path='/createPolls' component={CreatePolls}></Route>
    </Route>
  </Router>
);
