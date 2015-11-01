import React from 'react';
import { imageUrl } from '../../lib/moviedb';
import styles from './style.scss';

function year(releaseString) {
  return releaseString.split('-')[0];
}

export default class MoviePoster extends React.Component {
  render() {
    const m = this.props.movie;

    return (
      <article
        className='MoviePoster'
        style={{width: `${this.props.width}px`}}
        {...this.props}>
        <img src={imageUrl(m.poster_path)} />
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
