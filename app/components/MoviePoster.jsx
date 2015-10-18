import React from 'react';
import { imageUrl } from 'lib/moviedb';

export default class MoviePoster extends React.Component {
  render() {
    const m = this.props.movie;

    return (
      <article className='MoviePoster' style={{float: 'left'}} {...this.props}>
        <img src={imageUrl(m.poster_path)} width='100' />
      </article>
    );
  }
}

MoviePoster.propTypes = { movie: React.PropTypes.object.isRequired }
