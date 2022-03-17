import axios from 'axios';
import React, { useState, useCallback, useEffect, useMemo } from "react";
import MovieContext, { defaultMovieState } from "./MovieContext";

const API_KEY = process.env.REACT_APP_API_KEY || '44a627e9'; // OMDb API Key
// 5846a08c
// b57e0c63

const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

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

  const [search, setSearch] = useState(defaultMovieState.search);

  const [movies, setMovies] = useState(defaultMovieState.movies);

  const [selectedMovie, setSelectedMovie] = useState(defaultMovieState.selectedMovie);

  const [loading, setLoading] = useState(defaultMovieState.loading);


  const setMoviesHandler = useCallback((movies) => {
    movies.Search.sort((a, b) => Number(b.Year) - Number(a.Year));
    setMovies(movies);
  }, []);

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios(
        `${API_URL}&type=${'movie'}&s=${search.value}&page=1`
      );
      if (response.data.Response === 'True') {
        setMoviesHandler(response.data);
      }
      else if(!search.value) {
        setMovies(defaultMovieState.movies);
        setSearch(defaultMovieState.search);
      }
      setLoading(false);
    } catch(error) {
      setLoading(false);
      console.log(error);
      if(!search.value) {
        setMovies(defaultMovieState.movies);
        setSearch(defaultMovieState.search);
      }
    }
  }, [search.value]);

  const optimizedFetchMovies =  useCallback(() => {
    debounce(fetchMovies, 3000);
  }, []);

  useEffect(() => {
    console.log("Movies useEffect")
    // optimizedFetchMovies();
    search.value && search.value.length > 2 && fetchMovies();
  }, [fetchMovies]);

  const setSearchValueHandler = useCallback((value = '') => {
    
    if((!value || value.length < 3) && movies.Search && movies.Search.length > 0) {
      setMovies(defaultMovieState.movies);
    }
    setSearch({value, page: 1});

  },  [search.value, movies.Search]);

  const fetchMoreMovies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios(
        `${API_URL}&type=${'movie'}&s=${search.value}&page=${search.page}`
      );
      if (response.data.Response === 'True') {
        let moreMovies = {...response.data, Search: [...response.data.Search, ...movies.Search]}
        setMoviesHandler(moreMovies);
      }
      else if(!search.value) {
        setMovies(defaultMovieState.movies);
        setSearch(defaultMovieState.search);
      }
      setLoading(false);
    } catch(error) {
      setLoading(false);
      console.log(error);
      if(!search.value) {
        setMovies(defaultMovieState.movies);
        setSearch(defaultMovieState.search);
      }
    }
  }, [search.page]);

  useEffect(() => {
    console.log("More Movies useEffect")
    // optimizedFetchMovies();
    search.value && search.value.length > 2 && search.page > 1 && fetchMoreMovies();
  }, [fetchMoreMovies]);

  const setSearchPageHandler = useCallback((page) => {
    console.log({page, cpage: search.page})
    if(page === 0 || page - 1 === search.page) {
      // fetchMoreMovies(page);
      setSearch({...search, page});
    }
  }, [search.value, search.page]);

  const setSelectedMovieHandler = useCallback(async (id) => {
    if (!id) {
      setSelectedMovie(defaultMovieState.selectedMovie);
      return;
    }
    try {
      setLoading(true);
      const response = await axios(
        `${API_URL}&type=${'movie'}&i=${id}`
      );
      if (response.data.Response === 'False') {
        setSelectedMovie(defaultMovieState.selectedMovie);
      } else {
        setSelectedMovie(response.data);
      }
      setLoading(false);
    } catch(error) {
      setLoading(false);
      console.log(error);
      setSelectedMovie(defaultMovieState.selectedMovie);
    }
  }, []);

  const movieDispatchContext = {
    setSearchValue: setSearchValueHandler,
    setSearchPage: setSearchPageHandler,
    setSelectedMovie: setSelectedMovieHandler
  };

  const _movieState = {
    search,
    movies,
    loading,
    selectedMovie
  };

  return (
    <MovieContext.Provider value={movieDispatchContext}>
      {React.cloneElement(props.children, { movieState: _movieState })}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
