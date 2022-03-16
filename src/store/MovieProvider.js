import axios from 'axios';
import React, { useState, useCallback, useEffect, useMemo } from "react";
import MovieContext, { defaultMovieState } from "./MovieContext";

const API_KEY = process.env.REACT_APP_API_KEY || '5846a08c'; // OMDb API Key

const debounce = function (func, delay=1000) {
  let timer;
  return function () {
      let context = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
          func.apply(context, args);
      }, delay);
  }
}

const MovieProvider = (props) => {

  const [searchValue, setSearchValue] = useState(defaultMovieState.searchValue);

  const [movies, setMovies] = useState(defaultMovieState.movies);

  const [selectedMovie, setSelectedMovie] = useState(defaultMovieState.selectedMovie);

  const fetchMovies = useCallback(async () => {
    try {
      const response = await axios(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`
      );
      if (response.data.Response === 'True')
        setMovies(response.data);
      else
        setMovies(defaultMovieState.searchValue);
    } catch(error) {
      console.log(error);
      
    }
  }, [searchValue]);

  const optimizedFetchMovies =  useCallback(() => {
    debounce(fetchMovies, 3000);
  }, []);

  useEffect(() => {
    console.log("Movies useEffect")
    // optimizedFetchMovies();
    fetchMovies();
  }, [fetchMovies]);

  const fetchMovieDetails = useCallback(async () => {
    try {
      const response = await axios(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedMovie}`
      );
      setSelectedMovie(response.data);
    } catch(error) {
      console.log(error);
      setSelectedMovie(defaultMovieState.selectedMovie);
    }
  }, [selectedMovie]) // if userId changes, useEffect will run again

  // useEffect(() => {
  //   console.log("Selected Movies useEffect")
  //   debounce(fetchMovieDetails);
  // }, [fetchMovieDetails]);

  const movieDispatchContext = {
    setSearchValue
  };

  const _movieState = {
    searchValue,
    movies,
    selectedMovie
  };

  return (
    <MovieContext.Provider value={movieDispatchContext}>
      {React.cloneElement(props.children, { movieState: _movieState })}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
