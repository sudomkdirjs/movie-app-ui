import React, { useState, useEffect } from 'react';

// import { useCookies } from 'react-cookie';

function MovieForm(props) {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState(0);
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const [rated, setRated] = useState('');
  const [plot, setPlot] = useState('');
  const [released_on, setReleasedOn] = useState('');
//   const [token] = useCookies(['movieapp-token']);

//   useEffect(() => {
//     setTitle(props.movie.title);
//     setYear(props.movie.year);
//     setDirector(props.movie.director);
//     setGenre(props.movie.genre);
//     setRated(props.movie.rated);
//     setPlot(props.movie.plot);
//     setReleasedOn(props.movie.released_on);
//   }, []);

//   const updateClicked = () => {
//     API.updateMovie(
//       props.movie.id,
//       {
//         title,
//         year,
//         director,
//         genre,
//         rated,
//         plot,
//         released_on,
//       },
//       token['movieapp-token']
//     )
//       .then((resp) => props.updatedMovie(resp))
//       .catch((err) => console.log(err));
//   };

//   const createClicked = () => {
//     API.createMovie(
//       {
//         title,
//         year,
//         director,
//         genre,
//         rated,
//         plot,
//         released_on,
//       },
//       token['movieapp-token']
//     )
//       .then((resp) => props.movieCreated(resp))
//       .catch((err) => console.log(err));
//   };

  const isDisabled =
    title.length === 0 ||
    year < 1900 ||
    director.length === 0 ||
    genre.length === 0 ||
    rated.length === 0 ||
    plot.length === 0 ||
    released_on.length !== 10;

  return (
    <React.Fragment>
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            id="title"
            type="text"
            placeholder="Terminator"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          ></input>
          <br />
          <label htmlFor="year">Year</label>
          <br />
          <input
            id="year"
            type="integer"
            placeholder="2020"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          ></input>
          <br />
          <label htmlFor="director">Director</label>
          <br />
          <input
            id="director"
            type="text"
            placeholder="James Cameron"
            value={director}
            onChange={(event) => setDirector(event.target.value)}
          ></input>
          <br />
          <label htmlFor="genre">Genre</label>
          <br />
          <input
            id="genre"
            type="text"
            placeholder="Action, Sci-Fi"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          ></input>
          <br />
          <label htmlFor="rated">Rated</label>
          <br />
          <input
            id="rated"
            type="text"
            placeholder="PG-13"
            value={rated}
            onChange={(event) => setRated(event.target.value)}
          ></input>
          <br />
          <label htmlFor="plot">Plot</label>
          <br />
          <textarea
            id="plot"
            type="text"
            placeholder="A harrowing tale of..."
            value={plot}
            onChange={(event) => setPlot(event.target.value)}
          ></textarea>
          <br />
          <label htmlFor="released_on">Release On</label>
          <br />
          <input
            id="released_on"
            type="text"
            placeholder="2020-12-23"
            value={released_on}
            onChange={(event) => setReleasedOn(event.target.value)}
          ></input>
          <br />
          
            <button onClick={() => {}} disabled={isDisabled}>
                Create
            </button>
        </div>
    </React.Fragment>
  );
}

export default MovieForm;
