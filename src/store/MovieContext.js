import React from "react";

const defaultFunc = () => {};

export const defaultMovieState = {
  search: {
    value: '',
    page: 1
  },
  movies: {},
  totalMovies: 0,
  selectedMovie: {},
  loading: false,
  setSearchValue: defaultFunc,
  searchMovies: defaultFunc,
  showMovieDetails: defaultFunc,
  addMovie: defaultFunc
};

const MovieContext = React.createContext(defaultMovieState);

export default MovieContext;
