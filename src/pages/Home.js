import React, { useContext } from "react";
import MovieContext from "../store/MovieContext";

const Home = () => {
    const movieCtx = useContext(MovieContext);
    console.log(movieCtx);
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    ); 
}

export default Home;