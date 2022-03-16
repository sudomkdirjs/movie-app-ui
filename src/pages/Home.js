import React, { useContext, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import MovieContext from "../store/MovieContext";

const Home = ({movieState}) => {
    const movieCtx = useContext(MovieContext);
    let { searchValue, setSearchValue } = movieCtx;

    // useEffect(() => {
    //     movieCtx.searchMovies(searchValue || 'lion');
    //   }, []);

    console.log("Home");

    console.log(movieCtx);

    console.log(movieState);
    
    return (
        <div>
            <SearchBox 
                searchValue={searchValue} 
                setSearchValue={setSearchValue}/>
        </div>
    ); 
}

export default Home;