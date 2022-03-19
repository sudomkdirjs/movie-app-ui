import axios from 'axios';
import React, { forwardRef, useState, useCallback, useEffect } from "react";
import MovieContext, { defaultMovieState } from "./MovieContext";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const API_URL = process.env.API_URL || 'http://localhost:5000/movies';

const MovieProvider = (props) => {

  const [search, setSearch] = useState(defaultMovieState.search);

  const [movies, setMovies] = useState(defaultMovieState.movies);

  const [selectedMovie, setSelectedMovie] = useState(defaultMovieState.selectedMovie);

  const [loading, setLoading] = useState(defaultMovieState.loading);

  const [toast, setToast] = useState(defaultMovieState.toast);


  const sortAndSetMovies = useCallback((movies) => {
    movies.movies.sort((a, b) => Number(b.Year) - Number(a.Year));
    setMovies(movies);
  }, []);

  const searchMoviesErrorHandler = () => {
    setMovies(defaultMovieState.movies);
    setSearch(defaultMovieState.search);
  }

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios(
        `${API_URL}?s=${search.value}&page=1`
      );
      if (response.data.status) {
        setMovies(response.data.payload);
        search.page !== 1 && setSearch({...search, page: 1});
      }
      else if(!search.value) {
        searchMoviesErrorHandler();
      }
      setLoading(false);
    } catch(error) {
      setLoading(false);
      console.log(error);
      if(!search.value) {
        searchMoviesErrorHandler();
      } else {
        setMovies(defaultMovieState.movies);
      }
    }
  }, [search.value]);

  useEffect(() => {
    console.log("Movies useEffect")
    search.value && search.value.length > 2 && fetchMovies();
  }, [fetchMovies]);

  const setSearchValueHandler = useCallback((value = '') => {
    
    if((!value || value.length < 3) && movies.movies && movies.movies.length > 0) {
      setMovies(defaultMovieState.movies);
    }
    setSearch({value, page: 1});

  },  [search.value, movies.movies]);

  const fetchMoreMovies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios(
        `${API_URL}?s=${search.value}&page=${search.page}`
      );
      if (response.data.status) {
        let moreMovies = {...response.data.payload, movies: [...response.data.payload.movies, ...movies.movies]}
        sortAndSetMovies(moreMovies);
      }
      else if(!search.value) {
        searchMoviesErrorHandler();
      }
      setLoading(false);
    } catch(error) {
      setLoading(false);
      console.log(error);
      if(!search.value) {
        searchMoviesErrorHandler();
      }
    }
  }, [search.page]);

  useEffect(() => {
    console.log("More Movies useEffect")
    search.value && search.value.length > 2 && search.page > 1 && fetchMoreMovies();
  }, [fetchMoreMovies]);

  const setSearchPageHandler = useCallback((page) => {
    if(page === 0 || page - 1 === search.page) {
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
        `${API_URL}/${id}`
      );
      if (response.data.status) {
        setSelectedMovie(response.data.payload);
      } else {
        setSelectedMovie(defaultMovieState.selectedMovie);
      }
      setLoading(false);
    } catch(error) {
      setLoading(false);
      console.log(error);
      setSelectedMovie(defaultMovieState.selectedMovie);
    }
  }, []);

  const addMovieHandler = useCallback(async (movie, callback) => {
    try {
      setLoading(true);
      const response = await axios.post(API_URL, movie);
      if (response.data.status) {
        search.value && search.value.length > 2 && fetchMovies();
        setToast({open: true, message: 'Movie Added Successfully!', severity: 'success'});
      } else {
        setToast({open: true, message: 'Error while adding Movie!', severity: 'error'});
      }
      
    } catch(error) {
      console.log(error);
      setToast({open: true, message: 'Error while adding Movie!', severity: 'error'});
      // setSelectedMovie(defaultMovieState.selectedMovie);
    } finally {
      setLoading(false);
      callback && callback();
    }
  }, [search.value]);

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setToast(defaultMovieState.toast);
  };

  const movieDispatchContext = {
    setSearchValue: setSearchValueHandler,
    setSearchPage: setSearchPageHandler,
    setSelectedMovie: setSelectedMovieHandler,
    addMovie: addMovieHandler
  };

  const _movieState = {
    search,
    movies,
    loading,
    selectedMovie
  };

  return (
    <MovieContext.Provider value={movieDispatchContext}>
      <div style={loading ? {pointerEvents: 'none'} : {}}>
        {React.cloneElement(props.children, { movieState: _movieState })}
        <Snackbar open={toast.open} autoHideDuration={5000} 
          onClose={handleToastClose}
          style={{marginTop: '5.8rem'}}
          anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
          <Alert onClose={handleToastClose} severity={toast.severity} sx={{ width: '100%' }}>
            {toast.message}
          </Alert>
        </Snackbar>
      </div>
    </MovieContext.Provider>
  );
};

export default MovieProvider;
