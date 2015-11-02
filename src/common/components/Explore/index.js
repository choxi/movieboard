import React from 'react';
import MovieGrid from '../MovieGrid';
import styles from './style.scss';


export default class Explore extends React.Component {
  componentDidMount() {
    const { selectedQuery } = this.props;
    console.log('componentDidMount', selectedQuery)
    this.props.actions.fetchMoviesIfNeeded(selectedQuery);
  }

   componentWillReceiveProps(nextProps) {
     console.log('nextProps', nextProps.movies);
     if (nextProps.selectedQuery !== this.props.selectedQuery) {
       const { selectedQuery } = nextProps;
       this.props.actions.fetchMoviesIfNeeded(selectedQuery);
     }
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
        <div className="Controls">
          <div className="Controls-left">
            <input
              className='Search'
              type="search"
              placeholder='Search'
              onChange={this.handleSearchChange.bind(this)}
            />
          </div>
        </div>
        <MovieGrid movies={this.props.movies} />
      </div>
    );
  }

  handleSearchChange(e) {
    this.props.actions.search(e.target.value);
  }
}
