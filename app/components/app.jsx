import React from 'react';
import moviedb from 'lib/moviedb';

function image(path, size = 'w500'){
  let baseURL = 'http://image.tmdb.org/t/p';
  return [baseURL, size, path].join('/');
}

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
    console.log('MOVIES', this.state.movies);

    let items = this.state.movies.map((m) => {
      return (
        <li key={m.id} style={{float: 'left'}}>
          <img src={image(m.poster_path)} width='100' />
        </li>
      );
    });

    return (
      <div className='App'>
        <h1>Movie Board</h1>
        <ul className='MovieGrid'>{items}</ul>
      </div>
    );
  }
}
