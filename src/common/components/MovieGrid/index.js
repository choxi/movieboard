import {noop} from 'lodash'
import React from 'react';
import MoviePoster from '../MoviePoster';
import Slider from '../Slider';
import styles from './style.scss';

/**
 * @name MovieGrid
 * @prop {string} [leftControl]
 *
 * @example
 * <MovieGrid lang="javascript">{ code }</MovieGrid>
 *
 */
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
            {this.props.leftControls()}
          </div>
          <div className="Controls-right">
            {this.props.rightControls()}
            <Slider
              min={100}
              max={500}
              initialValue={this.state.posterWidth}
              onChange={this.handleSliderChange.bind(this)}
            />
          </div>
        </div>
        <div className='items'>
          {this.props.movies.map(this.renderMovie.bind(this))}
        </div>
        <div className='LoadMore'>
          <a onClick={this.props.onRequestMore}>Load More</a>
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

  handleSliderChange(value) {
    this.setState({posterWidth: value});
  }
}

MovieGrid.propTypes = {
  movies: React.PropTypes.array,
  onRequestMore: React.PropTypes.func,
  leftControls: React.PropTypes.func,
  rightControls: React.PropTypes.func,
}

MovieGrid.defaultProps = {
  movies: [],
  onRequestMore: noop,
  leftControls: noop,
  rightControls: noop,
}
