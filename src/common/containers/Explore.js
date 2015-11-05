import {partial} from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as MovieActions from '../actions/movies';
import MovieGrid from '../components/MovieGrid';

const {queries} = MovieActions;

function loadData(props, nextPage) {
  const { selectedMovieQuery } = props;
  props.loadMovies(selectedMovieQuery, nextPage);
}

export class Explore extends React.Component {
  componentDidMount() {
    loadData(this.props);
  }

   componentWillReceiveProps(nextProps) {
     if (nextProps.selectedMovieQuery !== this.props.selectedMovieQuery) {
       loadData(nextProps);
     }
  }

  render() {
    return (
      <div className='ExplorePage'>
        <MovieGrid
          leftControls={this.renderLeftControls.bind(this)}
          onRequestMore={this.handleRequestMore.bind(this)}
          movies={this.props.movies}
        />
      </div>
    );
  }

  renderLeftControls() {
    return (
      <input
        className='Search'
        type="search"
        placeholder='Search'
        onChange={this.handleSearchChange.bind(this)}
      />
    )
  }

  handleSearchChange(e) {
    let value = e.target.value;
    if(value) {
      this.props.selectMovieQuery(queries.search(value))
    } else {
      this.props.selectMovieQuery(queries.discover())
    }
  }

  handleRequestMore() {
    loadData(this.props, true)
  }
}

//Data that needs to be called before rendering the component
//This is used for server side rending via the fetchComponentDataBeforeRending() method
Explore.serverLoad = [
  partial(MovieActions.loadMovies, queries.discover())
]

function mapStateToProps(state) {
  const { selectedMovieQuery } = state;
  const {
    pagination: { moviesByQuery },
    entities: { movies }
  } = state;

  const moviePagination = moviesByQuery[selectedMovieQuery.key] || { ids: [] };
  const filteredMovies = moviePagination.ids.map(id => movies[id]);

  return {
    selectedMovieQuery,
    moviePagination,
    movies: filteredMovies
  }
}

export default connect(mapStateToProps, MovieActions)(Explore);
