import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import MovieContext from "../store/MovieContext";

import { CircularProgress } from "@mui/material";

import { poster_unavailable, hasMovieFieldValue } from '../config/config';
import "../styles/MovieDetail.css";

const displayFields = [
    {
        label: '',
        value: 'Plot'
    },
    {
        label: 'Released:',
        value: 'Released'
    }, 
    {
        label: 'Runtime:',
        value: 'Runtime'
    }, 
    {
        label: 'Genre:',
        value: 'Genre'
    }, 
    {
        label: 'IMDB Rating:',
        value: 'imdbRating'
    }, 
    {
        label: 'Award(s):',
        value: 'Awards'
    },
    {
        label: 'Actor(s):',
        value: 'Actors'
    }, 
    {
        label: 'Director(s):',
        value: 'Director'
    }, 
    {
        label: 'Writer(s):',
        value: 'Writer'
    },
    {
        label: 'Language:',
        value: 'Language'
    }
];

const MovieDetail = ({movieState}) => {
  let { id } = useParams();

  const { setSelectedMovie } = useContext(MovieContext);

  const { selectedMovie = {}, loading } = movieState;

  console.log("Movie Detail Component");

  console.log(movieState);

  useEffect(() => {
    setSelectedMovie(id);
    return () => {
        setSelectedMovie(null);
    }
  }, []);

  if (loading) {
      return (
        <div style={{marginTop: '3rem', textAlign: 'center'}}>
            <CircularProgress />
        </div>
      );
  }

  const fields = displayFields.filter(field => hasMovieFieldValue(selectedMovie[field.value]));

  return (
    <div className="detail-container">
      <div className="poster">
          <img src={hasMovieFieldValue(selectedMovie.Poster) ? selectedMovie.Poster : poster_unavailable} alt={selectedMovie.Title} />
      </div>
      <div className="info">
        <div className="field">
          <div className="label">
            <p className="title label-p">{selectedMovie.Title}</p>
          </div>
        </div>
        {fields.map(field => {
            return (
                <div className="field">
                    <div className="label">
                        {field.label}  {<p className="label-p">{selectedMovie[field.value]}</p>}
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};

export default MovieDetail;
