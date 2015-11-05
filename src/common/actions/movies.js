import {Schemas, CALL_API} from '../middleware/movie_db';
import {map, keys, partial} from 'lodash';

// Makes a uniqe key based on the endpoint and filters applied to it.
// This is so we can pull the data out later and cache it.
export function queryKey({endpoint, params = {}}) {
  let querystring = keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');

  if(querystring.length > 0) {
    return [endpoint, querystring].join('?');
  } else {
    return endpoint;
  }
}

export function queryPayload({endpoint, params, key}) {
  if(!key) {
    key = queryKey({endpoint, params});
  }

  return {endpoint, params, key}
}

export const SELECT_MOVIE_QUERY = 'SELECT_MOVIE_QUERY';

export function selectMovieQuery(endpoint, params){
  return {
    type: SELECT_MOVIE_QUERY,
    query: queryPayload(endpoint, params)
  }
}

export const MOVIE_GET_REQUEST = 'MOVIE_GET_REQUEST';
export const MOVIE_GET_SUCCESS = 'MOVIE_GET_SUCCESS';
export const MOVIE_GET_FAILURE = 'MOVIE_GET_FAILURE';

// Fetches a page of starred repos by a particular user.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchMovies(endpoint, params, page) {
  return {
    key: queryKey({endpoint, params}),
    [CALL_API]: {
      types: [ MOVIE_GET_REQUEST, MOVIE_GET_SUCCESS, MOVIE_GET_FAILURE ],
      endpoint: endpoint,
      params: params,
      page: page,
      schema: Schemas.MOVIE_ARRAY,
    }
  }
}

// Fetches a page of movies.
// Bails out if page is cached and user didn’t specifically request next page.
// Relies on Redux Thunk middleware.
export function loadMovies({endpoint, params}, nextPage) {
  return (dispatch, getState) => {
    let key = queryKey({endpoint, params});

    const {
      page = 0
    } = getState().pagination.moviesByQuery[key] || {}

    // if pageNumber
    if (page > 0 && !nextPage) {
      return null
    }

    return dispatch(fetchMovies(endpoint, params, page + 1))
  }
}

function buildQuery(builder) {
  return (...args) => {
    return queryPayload(builder(...args))
  }
}

export const queries = {
  search: buildQuery((text) => {
    return {
      endpoint: '/search/movie',
      params: {query: text},
    }
  }),

  discover: buildQuery((filter) => {
    return {
      endpoint: '/discover/movie',
      params: filter,
    }
  }),
}
