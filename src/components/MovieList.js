import { Link } from "react-router-dom";

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import MovieCard from './MovieCard';
import MovieCards from './MovieCards';
import Cards from './Cards';
import { CircularProgress, LinearProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import { Waypoint } from 'react-waypoint';

const styles = {
    placeholderText: {marginTop: '2rem', textAlign: 'center', color: '#999'}
};

export default function MovieList({movies, searchPage, loading, setSearchPage}) {
    const { Search: movieList = [], totalResults = 0, Response = 'False' } = movies;
    const hasMoreMovies = Response === 'True' && (Number(totalResults) > movieList.length);
    const loadMoreFunc = () => {
        hasMoreMovies && setSearchPage(searchPage + 1);
    }

    if (movieList.length === 0) {
        return <div style={styles.placeholderText}>No Movies Found!</div>
    }

    return (
        <div className="list-movie">
            <MovieCards movies={movieList} />
            <div style={{marginTop: '3rem', textAlign: 'center'}}>
                {loading && <CircularProgress />}
            </div>
            {!loading && hasMoreMovies &&  <div style={{marginTop: '5rem'}}><Waypoint onEnter={loadMoreFunc}/></div>}
            {!loading && !hasMoreMovies &&  <div style={styles.placeholderText}>No more movies to list!</div>}
        </div>
    )
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