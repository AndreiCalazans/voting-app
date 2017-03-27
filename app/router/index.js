import React from 'react';
import {Route, Router, IndexRoute, browserHistory} from 'react-router';

import Main from 'Main';
import Polls from 'Polls';
import CreatePolls from 'CreatePolls';
import Home from 'Home';
import SignUp from 'SignUp';
import Login from 'Login';
var store = require('configureStore').configure();
import axios from 'axios';
import * as actions from '../actions/actions';
import WrongPg from 'WrongPg';



export default (
  <Router history={browserHistory}>
    <Route path='/'  component={Main} >
      <IndexRoute component={Home} ></IndexRoute>
      <Route path='/polls' component={Polls}></Route>
      <Route path='/createPolls'  component={CreatePolls}></Route>
      <Route path='/signup' component={SignUp}></Route>
      <Route path='/login' component={Login}></Route>
      <Route path='/*' component={WrongPg}></Route>
    </Route>
  </Router>
);
