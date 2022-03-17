import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import MovieContext from "../store/MovieContext";

import { CircularProgress } from "@mui/material";

import { poster_unavailable } from '../config/config';
import "../styles/MovieDetail.css";

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

  return (
    <div className="detail-container">
      <div className="poster">
        {selectedMovie.Poster === "N/A" ? (
          <img src={poster_unavailable} alt={selectedMovie.Title} />
        ) : (
          <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
        )}
      </div>
      <div className="info">
        <div className="field">
          <div className="label">
            <p className="title label-p">{selectedMovie.Title}</p>
          </div>
        </div>
        <div className="field">
          <div className="label">
            <p className="label-p">{selectedMovie.Plot}</p>
          </div>
        </div>
        <div className="field">
          <div className="label">
            Released: <p className="label-p">{selectedMovie.Released}</p>
          </div>
        </div>
        <div className="field">
          <div className="label">
            Runtime: <p className="label-p">{selectedMovie.Runtime}</p>
          </div>
        </div>
        <div className="field">
          <div className="label">
            Genre: <p className="label-p">{selectedMovie.Genre}</p>
          </div>
        </div>
        <div className="field">
          <div className="label">
            IMDB Rating: <p className="label-p">{selectedMovie.imdbRating}</p>
          </div>
        </div>
        <div className="field">
          <div className="label">
            Actor(s): <p className="label-p">{selectedMovie.Actors}</p>
          </div>
        </div>
        <div className="field">
          <div className="label">
            Director(s): <p className="label-p">{selectedMovie.Director}</p>
          </div>
        </div>
        <div className="field">
          <div className="label">
            Writer(s): <p className="label-p">{selectedMovie.Writer}</p>
          </div>
        </div>
        <div className="field">
          <div className="label">
          Language(s): <p className="label-p">{selectedMovie.Language}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
