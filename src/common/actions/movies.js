import moviedb from '../lib/moviedb';

export const REQUEST_MOVIES = 'REQUEST_MOVIES'
function requestMovies(query) {
  return {
    type: REQUEST_MOVIES,
    query
  }
}

export const RECEIVE_MOVIES = 'RECEIVE_MOVIES'
function receiveMovies(query, data) {
  let {movies, total_pages, total_results} = data;
  return {
    type: RECEIVE_MOVIES,
    query,
    movies,
    total_pages,
    total_results,
    receivedAt: Date.now()
  }
}

function fetchMovies(query) {
  return dispatch => {
    dispatch(requestMovies(query))
    return moviedb(query)
      .then(response => response.data)
      .then(data => dispatch(receiveMovies(query, data)))
  }
}

function shouldFetchMovies(state, query) {
  const movies = state.moviesByQuery[query]
  if (!movies) {
    return true
  } else if (movies.isFetching) {
    return false
  } else {
    return movies.didInvalidate
  }
}

export function fetchMoviesIfNeeded(query) {

  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.

  return (dispatch, getState) => {
    if (shouldFetchMovies(getState(), query)) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchMovies(query))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}


