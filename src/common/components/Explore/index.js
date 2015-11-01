import React from 'react';
import MovieGrid from '../MovieGrid';
import styles from './style.scss';


export default class Explore extends React.Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div className='ExplorePage'>
        <header className='MainHeader'>
          <h1 className='title'>Movie Board</h1>
          <nav className='MainNav'>
            <a href='#' className='isActive'>Explore</a>
            <a href='#'>My Movies</a>
          </nav>
        </header>
        <MovieGrid movies={this.state.movies} />
      </div>
    );
  }
}
