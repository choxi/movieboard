import {keys} from 'lodash';
import moviedb from '../lib/moviedb';

export const SELECT_QUERY = 'SELECT_QUERY';
export const INVALIDATE_QUERY = 'INVALIDATE_QUERY';

export const MOVIES_GET = 'MOVIES_GET';
export const MOVIES_GET_REQUEST = 'MOVIES_GET_REQUEST';
export const MOVIES_GET_SUCCESS = 'MOVIES_GET_SUCCESS';
export const MOVIES_GET_FAILURE = 'MOVIES_GET_FAILURE';

function queryPayload({path, params}) {
  let key = queryKey({path, params});
  return {path, params, key}
}

export function queryKey({path, params = {}}) {
  let querystring = keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');

  if(querystring.length > 0) {
    return [path, querystring].join('?');
  } else {
    return path;
  }
}

export function selectQuery(query) {
  return {
    type: SELECT_QUERY,
    query: queryPayload(query),
  };
}

export function invalidateQuery(query) {
  return {
    type: INVALIDATE_QUERY,
    query: query
  };
}

export function fetchMovies(query = {path: '/discover/movie', params: {}}) {
  return {
    type: MOVIES_GET,
    query: queryPayload(query),
    promise: moviedb(query.path, query.params)
  }
}

function shouldFetchMovies(state, query) {
  const movies = state.moviesByQuery[queryKey(query)];
  if (!movies) {
    return true;
  } else if (movies.isFetching) {
    return false;
  } else {
    return movies.didInvalidate;
  }
}

export function search(text) {
  return (dispatch) => {
    let query = queryPayload({path: '/search/movie', params: {query: text}})
    dispatch(selectQuery(query))
  }
}

export function fetchMoviesIfNeeded(query) {

  return (dispatch, getState) => {
    if (shouldFetchMovies(getState(), query)) {
      return dispatch(fetchMovies(query));
    }
  };
}
