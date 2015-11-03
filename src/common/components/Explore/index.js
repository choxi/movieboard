import React from 'react';
import MovieGrid from '../MovieGrid';
import styles from './style.scss';


export default class Explore extends React.Component {
  componentDidMount() {
    const { selectedQuery } = this.props;
    this.props.actions.fetchMoviesIfNeeded(selectedQuery);
  }

   componentWillReceiveProps(nextProps) {
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
        <MovieGrid
          onSearch={this.handleSearchChange.bind(this)}
          movies={this.props.movies}
        />
      </div>
    );
  }

  handleSearchChange(e) {
    let value = e.target.value;
    if(value) {
      this.props.actions.search(value);
    } else {
      this.props.actions.discover();
    }
  }
}
