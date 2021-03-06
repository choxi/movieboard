import React from 'react';
import { imageUrl } from '../../lib/moviedb';
import styles from './style.scss';

const IMAGE_ASPECT_RATION = 1.5;

function year(releaseString = '') {
  if (releaseString) {
    return releaseString.split('-')[0];
  } else {
    return ''
  }
}

/**
 * @name MoviePoster
 *
 * @prop {Object} movie - The movie object
 * @prop {Object} width - The width of the poster img
 *
 * @background #222
 *
 * @example
 * let props = {
 *   width: 400,
 *   movie: {
 *     title: "Minions",
 *     releaseDate: "2015-6-11",
 *     posterPath: "q0R4crx2SehcEEQEkYObktdeFy.jpg"
 *   }
 * };
 *
 * <MoviePoster movie={ props.movie } width={ props.width } />
 *
 */
export default class MoviePoster extends React.Component {
  render() {
    const m = this.props.movie;

    return (
      <article
        className='MoviePoster'
        style={{width: `${this.props.width}px`}}
        {...this.props}>
        <img
          src={imageUrl(m.posterPath)}
          width={this.props.width}
          height={this.props.width * IMAGE_ASPECT_RATION}
        />
        <h1>{m.title}</h1>
        <p>{year(m.releaseDate)}</p>
      </article>
    );
  }
}

MoviePoster.propTypes = {
  movie: React.PropTypes.object.isRequired,
  width: React.PropTypes.number
}
