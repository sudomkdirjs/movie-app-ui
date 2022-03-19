import React from 'react';
import { useHistory } from "react-router-dom";
import { poster_unavailable, hasMovieFieldValue } from '../config/config';
import '../styles/MovieCards.css';

const MovieCards = ({ movies }) => {
    const history = useHistory();
    const handleClickMovie = (id) => {
        history.push(`movies/${id}`);
    }

    return (

        <div className="cardlist__movies">
            {movies.map((movie) => (
                <div className="card" key={movie.imdbRating} onClick={() => handleClickMovie(movie.imdbID)}>
                    <img
                        className="movie__image"
                        src={hasMovieFieldValue(movie.Poster) ? movie.Poster : poster_unavailable}
                        alt={movie.Title}
                    />
                    <div className="flex__card">
                        <div className="heading">{movie.Title}</div>
                        <div className="paragraph">{movie.Year}</div>
                        <br />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MovieCards;
