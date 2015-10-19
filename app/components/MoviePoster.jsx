import React from 'react';
import CSSModules from 'react-css-modules';
import { imageUrl } from 'lib/moviedb';
import styles from './MoviePoster.css';

@CSSModules(styles)
export default class MoviePoster extends React.Component {
  render() {
    const m = this.props.movie;

    return (
      <article className='MoviePoster' style={{float: 'left'}} {...this.props}>
        <img styleName='img'
          src={imageUrl(m.poster_path)} />
      </article>
    );
  }
}

MoviePoster.propTypes = { movie: React.PropTypes.object.isRequired }
