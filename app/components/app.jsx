import React from 'react';
import moviedb from 'lib/moviedb';
import MovieGrid from 'components/MovieGrid'


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    // fetch data
    moviedb('/discover/movie').then((response) => {
      this.setState({
        movies: response.data.results,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results
      });
    });
  }

  render() {

    return (
      <div className='App'>
        <h1>Movie Board</h1>
        <MovieGrid movies={this.state.movies} />
      </div>
    );
  }
}
