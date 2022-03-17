import MovieCards from './MovieCards';
import { CircularProgress } from "@mui/material";
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
    );
}