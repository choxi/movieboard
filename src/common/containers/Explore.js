import { bindActionCreators } from 'redux';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import Explore from '../components/Explore';
import * as MovieActions from '../actions/movies';

//Data that needs to be called before rendering the component
//This is used for server side rending via the fetchComponentDataBeforeRending() method
Explore.need = [
  MovieActions.fetchMovies
]

function mapStateToProps(state) {
  const { selectedQuery, moviesByQuery } = state;
  const {
    isFetching,
    lastUpdated,
    error,
    movies
  } = moviesByQuery[selectedQuery.key] || {
    isFetching: true,
    error:false,
    movies: []
  };

  return {
    selectedQuery,
    movies,
    isFetching,
    lastUpdated,
    error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MovieActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
