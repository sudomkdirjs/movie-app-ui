import React, { useContext, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import MovieList from "../components/MovieList";
import MovieContext from "../store/MovieContext";

const Home = ({movieState}) => {
    const movieCtx = useContext(MovieContext);
    let { setSearchValue, setSearchPage } = movieCtx;

    let { search, movies, loading } = movieState;

    console.log("Home");

    console.log(movieState);
    
    return (
        <div>
            <SearchBox
                searchValue={search.value} 
                setSearchValue={setSearchValue}/>
            <MovieList
                movies={movies}
                searchPage={search.page}
                loading={loading}
                setSearchPage={setSearchPage}/>
        </div>
    ); 
}

export default Home;