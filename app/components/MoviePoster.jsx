import React from 'react';
import { imageUrl } from 'lib/moviedb';
import styles from './MoviePoster.css';

export default class MoviePoster extends React.Component {
  render() {
    const m = this.props.movie;

    return (
      <article className='MoviePoster' {...this.props}>
        <img src={imageUrl(m.poster_path)} />
        <h1>{m.title}</h1>
      </article>
    );
  }
}

MoviePoster.propTypes = { movie: React.PropTypes.object.isRequired }
