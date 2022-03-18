import React, { useContext, useState } from "react";
import SearchBox from "../components/SearchBox";
import MovieList from "../components/MovieList";
import MovieContext from "../store/MovieContext";
import { Link } from 'react-router-dom';

import Form from "./Form";

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const Home = ({movieState}) => {
    const { setSearchValue, setSearchPage } = useContext(MovieContext);

    const [shouldShowFormDialog, setFormDialogState] = useState(false);

    let { search, movies, loading } = movieState;

    console.log("Home");

    console.log(movieState);
    
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-around', justifyItems: 'center',  margin: '1rem 1rem'}}>
                <SearchBox
                    searchValue={search.value} 
                    setSearchValue={setSearchValue}/>
                <Fab variant="extended" style={{zIndex: 10, marginTop: '1.2rem'}}
                    onClick={() => setFormDialogState(true)}>
                    Add Movie
                    <AddIcon sx={{ ml: 1 }} />
                </Fab>
            </div>
            <Form
                shouldShowFormDialog={shouldShowFormDialog}
                setFormDialogState={setFormDialogState}/>
            <MovieList
                movies={movies}
                searchPage={search.page}
                loading={loading}
                setSearchPage={setSearchPage}/>
        </div>
    ); 
}

export default Home;