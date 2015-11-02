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

export default class MoviePoster extends React.Component {
  render() {
    const m = this.props.movie;

    return (
      <article
        className='MoviePoster'
        style={{width: `${this.props.width}px`}}
        {...this.props}>
        <img
          src={imageUrl(m.poster_path)}
          width={this.props.width}
          height={this.props.width * IMAGE_ASPECT_RATION}
        />
        <h1>{m.title}</h1>
        <p>{year(m.release_date)}</p>
      </article>
    );
  }
}

MoviePoster.propTypes = {
  movie: React.PropTypes.object.isRequired,
  width: React.PropTypes.number
}
