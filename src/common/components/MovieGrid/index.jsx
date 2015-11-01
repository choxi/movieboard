import React from 'react';
import MoviePoster from '../MoviePoster';
import Slider from '../Slider';
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
            <input className='Search' type="search" placeholder='Search' />
          </div>
          <div className="Controls-right">
            <Slider
              min={100}
              max={500}
              value={this.state.posterWidth}
              onChange={this.onSliderChange.bind(this)}
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

MovieGrid.propTypes = { movies: React.PropTypes.array }
MovieGrid.deafultProps = { movies: [] }
