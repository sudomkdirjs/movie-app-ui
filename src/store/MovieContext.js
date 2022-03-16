import React from "react";

const defaultFunc = () => {};

export const defaultMovieState = {
  searchValue: '',
  movies: {},
  totalMovies: 0,
  selectedMovie: {},
  setSearchValue: defaultFunc,
  searchMovies: defaultFunc,
  showMovieDetails: defaultFunc,
  addMovie: defaultFunc
};

const MovieContext = React.createContext(defaultMovieState);

export default MovieContext;
