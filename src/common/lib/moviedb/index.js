import axios from 'axios';

const API_KEY = '8376ea4b657a9c1aa35ce251880afead';
const MOVIE_DB_API = 'http://api.themoviedb.org/3';

export function imageUrl(path, size = 'w500'){
  let baseURL = 'http://image.tmdb.org/t/p';
  return [baseURL, size, path].join('/');
}

export default function moviedb(path, params = {}) {
  if(!path) {
    throw new Error('moviedb API error, a path is required');
  }

  let options = {params: Object.assign({}, params, {api_key: API_KEY})};

  return axios.get(`${MOVIE_DB_API}${path}`, options);
}
