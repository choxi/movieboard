import React from 'react';
import MoviePoster from './MoviePoster';
import styles from './MovieGrid.css';

export default class MovieGrid extends React.Component {
  render() {
    return (
      <div className='MovieGrid'>
        {this.props.movies.map(this.renderMovie)}
      </div>
    );
  }

  renderMovie(movie) {
    return (
      <MoviePoster movie={movie} key={movie.id} />
    );
  }
}

MovieGrid.propTypes = { movies: React.PropTypes.array }
MovieGrid.deafultProps = { movies: [] }
