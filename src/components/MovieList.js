import MovieCards from './MovieCards';
import { CircularProgress, Grid, Skeleton } from "@mui/material";
import { Waypoint } from 'react-waypoint';

import '../styles/MovieList.css';

const renderSkeletons = () => {
    return (
        <Grid 
            container 
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center">
            <Grid item xs={10} md={6}>
                <Skeleton variant="rectangular" height={200} />
            </Grid>
            <Grid item xs={10} md={6}>
                <Skeleton variant="rectangular" height={200} />
            </Grid>
        </Grid>
    );
}

export default function MovieList({movies, searchPage, loading, setSearchPage}) {
    const { movies: movieList = [], totalResults = 0 } = movies;
    const hasMoreMovies = totalResults > movieList.length;
    const loadMoreFunc = () => {
        hasMoreMovies && setSearchPage(searchPage + 1);
    }

    if (movieList.length === 0) {
        return (
            <div className='list-movie-search-placeholder'>
                { !loading && <div>No Movies Found!</div> }
                { loading && renderSkeletons()}
            </div>
        );
    }

    return (
        <div className="list-movie">
            <MovieCards movies={movieList} />
            <div style={{marginTop: '3rem', textAlign: 'center'}}>
                {loading && <CircularProgress />}
            </div>
            {!loading && hasMoreMovies &&  <div style={{marginTop: '5rem'}}><Waypoint onEnter={loadMoreFunc}/></div>}
            {!loading && !hasMoreMovies &&  <div className='list-movie-scroll-placeholder'>No more movies to list!</div>}
        </div>
    );
}