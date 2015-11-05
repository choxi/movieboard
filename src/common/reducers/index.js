// import { combineReducers } from 'redux';
// import { routerStateReducer } from 'redux-router';
// import { selectedQuery, moviesByQuery } from './movies';
//
// function version(state = 0, action) {
//   return state;
// }
//
// const rootReducer = combineReducers({
//   version,
//   moviesByQuery,
//   selectedQuery,
// });
//
// export default rootReducer;

import * as MovieActions from '../actions/movies.js'
import merge from 'lodash/object/merge'
import paginate from './paginate'
import { routerStateReducer as router } from 'redux-router'
import { combineReducers } from 'redux'

function version(state = 0, action) {
  return state;
}

// Updates an entity cache in response to any action with response.entities.
function entities(state = { movies: {} }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action

  if (type === MovieActions.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

const defaultMovieQuery = MovieActions.queries.discover();
function selectedMovieQuery(state = defaultMovieQuery, action) {
  if(action.type == MovieActions.SELECT_MOVIE_QUERY) {
    return action.query
  } else {
    return state
  }
}

const pagination = combineReducers({
  moviesByQuery: paginate({
    mapActionToKey: action => action.key,
    types: [
      MovieActions.MOVIE_GET_REQUEST,
      MovieActions.MOVIE_GET_SUCCESS,
      MovieActions.MOVIE_GET_FAILURE,
    ]
  })
})

const rootReducer = combineReducers({
  entities,
  selectedMovieQuery,
  pagination,
  errorMessage,
  router
})

export default rootReducer
