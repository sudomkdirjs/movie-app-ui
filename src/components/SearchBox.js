import React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

const SearchBox = ({searchValue, setSearchValue}) => {

    const handleChange = (event) => {
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
                    onChange={handleChange} />
            </Paper>
        </div>
    );
};

export default SearchBox;