import {noop} from 'lodash'
import React from 'react';
import MoviePoster from '../MoviePoster';
import styles from './style.scss';

export default class MovieGrid extends React.Component {
  constructor() {
    super();
    this.state = {
      posterWidth: 200
    };
  }

  render() {
    return (
      <div className='MovieGrid'>
        <div className="Controls">
          <div className="Controls-left">
            <input
              className='Search'
              type="search"
              placeholder='Search'
              onChange={this.props.onSearch}
            />
          </div>
        </div>
        <div className='items'>
          {this.props.movies.map(this.renderMovie.bind(this))}
        </div>
      </div>
    );
  }

  renderMovie(movie) {
    return (
      <MoviePoster
        movie={movie}
        key={movie.id}
        width={this.state.posterWidth} />
    );
  }

  onSliderChange(value) {
    this.setState({posterWidth: value});
  }
}

MovieGrid.propTypes = {
  movies: React.PropTypes.array,
  onSearch: React.PropTypes.function
}

MovieGrid.deafultProps = {
  movies: [],
  onSearch: noop
}
