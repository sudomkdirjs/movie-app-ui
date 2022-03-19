import React from "react";

export const defaultMovieState = {
  search: {
    value: '',
    page: 1
  },
  movies: {
    movies: [],
    totalResults: 0
  },
  selectedMovie: {},
  loading: false,
  toast: {
    open: false,
    message: '',
    severity: 'success'
  }
};

const MovieContext = React.createContext(defaultMovieState);

export default MovieContext;
