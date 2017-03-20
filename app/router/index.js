import React from 'react';
import {Route, Router, IndexRoute, browserHistory} from 'react-router';

import Main from 'Main';
import Polls from 'Polls';
import CreatePolls from 'CreatePolls';
import Home from 'Home';


export default (
  <Router history={browserHistory}>
    <Route path='/' component={Main} >
      <IndexRoute component={Home} ></IndexRoute>
      <Route path='/polls' component={Polls}></Route>
      <Route path='/createPolls' component={CreatePolls}></Route>
    </Route>
  </Router>
);
