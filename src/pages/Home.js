import React, { Fragment, useContext, useState } from "react";
import SearchBox from "../components/SearchBox";
import MovieList from "../components/MovieList";
import MovieContext from "../store/MovieContext";

import MovieForm from "./MovieForm";

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import "../styles/Home.css";

const Home = ({movieState}) => {
    const { setSearchValue, setSearchPage } = useContext(MovieContext);

    const [shouldShowFormDialog, setFormDialogState] = useState(false);

    let { search, movies, loading } = movieState;

    console.log("Home");

    console.log(movieState);
    
    return (
        <Fragment>
            <div className='search-box-container'>
                <SearchBox
                    searchValue={search.value} 
                    setSearchValue={setSearchValue}/>
                <div className='add-movie-button'>
                    <Fab variant="extended" style={{zIndex: 10}}
                        onClick={() => setFormDialogState(true)}>
                        <span  style={{marginTop: '0.1rem'}}>Add Movie</span>
                        <AddIcon sx={{ ml: 1 }} />
                    </Fab>
                </div>
            </div>
            <MovieForm
                shouldShowFormDialog={shouldShowFormDialog}
                setFormDialogState={setFormDialogState}/>
            <MovieList
                movies={movies}
                searchPage={search.page}
                loading={loading}
                setSearchPage={setSearchPage}/>
        </Fragment>
    ); 
}

export default Home;