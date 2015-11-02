import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import { selectedQuery, moviesByQuery } from './movies';

function version(state = 0, action) {
  return state;
}

const rootReducer = combineReducers({
  version,
  moviesByQuery,
  selectedQuery,
});

export default rootReducer;
