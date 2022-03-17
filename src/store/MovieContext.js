import React from "react";

export const defaultMovieState = {
  search: {
    value: '',
    page: 1
  },
  movies: {},
  selectedMovie: {},
  loading: false
};

const MovieContext = React.createContext(defaultMovieState);

export default MovieContext;
