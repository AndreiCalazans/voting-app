import * as redux from 'redux';
import thunk from 'redux-thunk';

import { UserReducer } from 'reducers';

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    user: UserReducer
  });

  var store = redux.createStore( reducer, initialState , redux.compose(
    redux.applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  ));
  return store;
};
