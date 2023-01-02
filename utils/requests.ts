const API_KEY = process.env.NEXT_PUBLIC_MOVIE_APIKEY;
const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
  Trending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  NetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  TopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  ActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  ComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  HorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  RomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  Documentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
};

export default requests;
