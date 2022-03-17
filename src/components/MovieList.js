import MovieCards from './MovieCards';
import { CircularProgress, Grid, Skeleton } from "@mui/material";
import { Waypoint } from 'react-waypoint';

const styles = {
    searchPlaceholder: {marginTop: '5rem', textAlign: 'center', color: '#999'},
    scrollPlaceholder: {marginTop: '2rem', textAlign: 'center', color: '#999'}
};

const renderSkeletons = () => {
    return (
        <Grid 
            container 
            spacing={2}
            direction="row"
            justifyContent="space-between"
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
    const { Search: movieList = [], totalResults = 0, Response = 'False' } = movies;
    const hasMoreMovies = Response === 'True' && (Number(totalResults) > movieList.length);
    const loadMoreFunc = () => {
        hasMoreMovies && setSearchPage(searchPage + 1);
    }

    if (movieList.length === 0) {
        return (
            <div style={styles.searchPlaceholder}>
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
            {!loading && !hasMoreMovies &&  <div style={styles.scrollPlaceholder}>No more movies to list!</div>}
        </div>
    );
}