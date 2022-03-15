import axios from 'axios';
import { useReducer } from "react";
import MovieContext from "./MovieContext";

const API_KEY = process.env.REACT_APP_API_KEY || '5846a08c'; // OMDb API Key

const defaultMovieState = {
  searchValue: '',
  movies: [],
  totalMovies: 0,
  selectedMovie: null,
};
const movieReducer = (state, action) => {
  switch (action.type) {

    case 'SET_MOVIES':
      return Object.assign(state, {
        movies: action.movies,
        totalMovies: action.movies.length
      });

    case 'SET_SELECTED_MOVIE':
      return Object.assign(state, {
        selectedMovie: action.movie
      });

    case 'ADD_MOVIE':
      let updatedMovies = state.movies.concat(action.movie);
      return Object.assign(state, {
        movies: updatedMovies,
        totalMovies: updatedMovies.length
      });

    case 'SET_SEARCH_VALUE':
      return Object.assign(state, {
        searchValue: action.searchValue
      });

    default:
        return defaultMovieState;
  }
  
};

const MovieProvider = (props) => {

  const [movieState, dispatchMovieAction] = useReducer(
    movieReducer,
    defaultMovieState
  );

  const addMovieHandler = (item) => {
    dispatchMovieAction({ type: "ADD_MOVIE", item: item });
  };

  const searchHandler = async (searchValue) => {
    const movies = await fetchMovies(searchValue)
    if(movies) {
      dispatchMovieAction({ type: "SET_MOVIES", movies });
    }
  };

  const fetchMovies = async (searchValue) => {
    try {
      const response = await axios(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`
      );
      return response.data;
    } catch(error) {
      console.log(error);
      return null;
    }
  };

  const showDetailHandler = async (id) => {
    const movie = await fetchMovieDetails(id);
    if(movie) {
      dispatchMovieAction({ type: "SET_SELECTED_MOVIE", movie });
    }
  };

  const fetchMovieDetails = async (id) => {
    try {
      const response = await axios(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
      );
      return response.data;
    } catch(error) {
      console.log(error);
      return null;
    }
  };

  const movieContext = {
    movies: movieState.movies,
    totalMovies: movieState.totalMovies,
    selectedMovie: movieState.selectedMovie,
    searchValue: movieState.searchValue,
    searchMovie: searchHandler,
    setSearch: (searchValue) =>  dispatchMovieAction({ type: "SET_SEARCH_VALUE", searchValue }),
    showDetail: showDetailHandler,
    addMovie: addMovieHandler
  };

  return (
    <MovieContext.Provider value={movieContext}>
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
