import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

function version(state = 0, action) {
  return state;
}

const rootReducer = combineReducers({
  version : version,
  router : routerStateReducer
});

export default rootReducer;
