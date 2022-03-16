import { Link } from "react-router-dom";

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import MovieCard from './MovieCard';
import { CircularProgress, LinearProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import { Waypoint } from 'react-waypoint';

export default function MovieList({movies, searchPage, loading, setSearchPage}) {
    const { Search: movieList = [], totalResults = 0, Response = 'False' } = movies;
    const hasMoreMovies = Response === 'True' && (Number(totalResults) > movieList.length);
    const loadMoreFunc = () => {
        hasMoreMovies && setSearchPage(searchPage + 1);
    }
    
    const loader = (
        <div className="loader" key={0}>
          Loading ...
        </div>
      );

    if (movieList.length === 0) {
        return <div style={{marginTop: '2rem', textAlign: 'center', color: '#999'}}>No Movies Found!</div>
    }
    return (
            <div>
            <Grid 
                container 
                rowSpacing={1} 
                // direction="row"
                justifyContent="center"
                // alignItems="center"
                columnSpacing={{ xs: 1, sm: 2, md: 4 }}
                // sx={{display: 'grid', gridTemplateColumns: "repeat(5, 3fr)"}}
                style={{marginTop: '1rem'}}>
                {movieList.map(movie => {
                    return (
                        <Grid 
                            item 
                            xs={2} sm={3} md={3} 
                            key={movie.imdbID} 
                            // style={{height: "4rem"}}
                            >
                            <Link
                                to={`movies/${movie.imdbID}`}
                                // className="text-link"
                                >
                                <MovieCard movie={movie} />
                            </Link>
                        </Grid>
                    )})
                }
            </Grid>
            <div style={{marginTop: '3rem', textAlign: 'center'}}>
                {loading && <CircularProgress />}
            </div>
            {!loading && hasMoreMovies &&  <div style={{marginTop: '5rem'}}><Waypoint onEnter={loadMoreFunc}/></div>}
            </div>
    );
}