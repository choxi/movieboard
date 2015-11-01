import { bindActionCreators } from 'redux';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import Explore from '../components/Explore';
import * as MovieActions from '../actions/movies';

//Data that needs to be called before rendering the component
//This is used for server side rending via the fetchComponentDataBeforeRending() method
Explore.need = [
  MovieActions.fetchMoviesIfNeeded
]

function mapStateToProps(state) {
  return {
    movies: state.movies.present
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ExploreActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
