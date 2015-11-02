import {
  SELECT_QUERY,
  INVALIDATE_QUERY,
  MOVIES_GET, MOVIES_GET_REQUEST, MOVIES_GET_SUCCESS, MOVIES_GET_FAILURE,
  queryKey
} from '../actions/movies';

function movies(state = {
  error: {},
  isFetching: false,
  didInvalidate: false,
  movies: []
}, action) {
  switch (action.type) {
  case INVALIDATE_QUERY:
    return Object.assign({}, state, {
      didInvalidate: true
    });
  case MOVIES_GET_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });
  case MOVIES_GET_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      movies: action.movies,
      lastUpdated: action.receivedAt
    });
  case MOVIES_GET_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false
    });
  default:
    return state;
  }
}

export function selectedQuery(state, action) {
  console.log('selectedQuery', state, action)
  const defaultState = {
    key: '/discover/movie',
    path: '/discover/movie',
    params: {}
  };

  switch (action.type) {
  case SELECT_QUERY:
    return action.query;
  default:
    return state || defaultState;
  }
}

export function moviesByQuery(state = { }, action) {
  switch (action.type) {
  case INVALIDATE_QUERY:
  case MOVIES_GET_REQUEST:
  case MOVIES_GET_SUCCESS:
    let moviesArray = [];
    if(action.req && action.req.data){
      moviesArray = action.req.data.results;
    }
    return Object.assign({}, state, {
      [action.query.key]: movies(state[action.query.key], {
        type: action.type,
        query: action.query,
        movies: moviesArray,
        receivedAt: Date.now()
      })
    });

  case MOVIES_GET_FAILURE:
    return Object.assign({}, state, {
      [action.query.key]: movies(state[action.query.key], {
        type: action.type,
        query: action.query,
        movies: [],
        receivedAt: Date.now(),
        error : {
          status: action.error.status,
          statusText : action.error.statusText
        }
      })
    });

  default:
    return state;
  }
}
