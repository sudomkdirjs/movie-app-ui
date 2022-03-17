import React, {useState, useContext} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// import '../styles/SearchBox.css';

const SearchBox = ({searchValue, setSearchValue}) => {

    const onChange = (event) => {
        console.log(event.target.value)
        // setValue(event.target.value)
        setSearchValue(event.target.value);
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '1rem 1rem'}}>
            <Paper
                component=""
                sx={{ p: '1rem', width: 500 }}
            >
                <TextField 
                    type="search" 
                    fullWidth 
                    label="Search Movies" 
                    id="searchBox"
                    value={searchValue}
                    onChange={onChange} />
            </Paper>
        </div>
    );
};

export default SearchBox;