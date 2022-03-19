import React, { useRef, useEffect, useState } from 'react';
import {Button, CircularProgress, Dialog, DialogActions, 
    DialogContent, DialogTitle, LinearProgress, TextField} from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import enLocale from 'date-fns/locale/en-US';

const defaultMovie = {
    Title: "",
    Year: "",
    Released: "",
    Runtime: "",
    Genre: "",
    Director: "",
    Writer: "",
    Actors: "",
    Plot: "",
    Language: "",
    Country: "",
    Awards: "",
    Poster: "",
    imdbRating: "",
    Type: "movie"
};

const movieFields = [
    {
        label: 'Genre',
        placeholder: 'Adventure, Drama, Sci-Fi',
        required: true,
        key: 'Genre',
    },
    {
        label: 'Director',
        placeholder: 'Christopher Nolan',
        required: true,
        key: 'Director',
    },
    {
        label: 'Writer',
        placeholder: 'Jonathan Nolan, Christopher Nolan',
        required: false,
        key: 'Writer',
    },
    {
        label: 'Actors',
        placeholder: 'Matthew McConaughey, Anne Hathaway',
        required: false,
        key: 'Actors',
    },
    {
        label: 'Runtime',
        placeholder: '169 min',
        required: false,
        key: 'Runtime',
    },
    {
        label: 'Plot',
        placeholder: 'A team of explorers travel through a wormhole',
        required: false,
        key: 'Plot',
    },
    {
        label: 'Language',
        placeholder: 'English',
        required: false,
        key: 'Language',
    },
    {
        label: 'Country',
        placeholder: 'United States',
        required: false,
        key: 'Country'
    },
    {
        label: 'Awards',
        placeholder: 'Won 1 Oscar.',
        required: false,
        key: 'Awards',
    },
    {
        label: 'Poster',
        placeholder: 'www.poster_image.png',
        required: false,
        key: 'Poster',
    },
    {
        label: 'IMDB Rating',
        placeholder: '8.6',
        required: false,
        key: 'imdbRating',
    }
];

export default function MovieForm({shouldShowFormDialog: open, loading, setFormDialogState, addMovie}) {

    const fieldRef = useRef(null);
    const [ movie, setMovie ] = useState(defaultMovie);

    useEffect(() => {
        setMovie(defaultMovie);
    }, [open]);

    const handleClose = (_, reason) => {
        if (!["backdropClick", 'escapeKeyDown'].includes(reason) ) {
            setFormDialogState(false);
        }
    }

    const setMovieValue = (value, property) => {
        
        setMovie({...movie, [property]: value});
    }

    const handleSave = () => {
        addMovie({...movie, Year: movie.Year.slice(0,4)}, handleClose);
    }

    const handleEntering = () => {
        if (fieldRef.current != null) {
            fieldRef.current.focus();
        }
    };

    const renderMovieFields = ({key, label, placeholder, type='text', required}) => {
        return (
            <TextField
                required={required}
                autoFocus
                margin="dense"
                id={key}
                label={label}
                placeholder={placeholder}
                type={type}
                value={movie[key]}
                onChange={(event) => {
                    setMovieValue(event.target.value, key);
                }}
                fullWidth
                variant="standard"
            />
        );
    }

    const renderDatePickerInput = (params) => {
        return (
            <TextField 
                {...params}
                required
                fullWidth
                margin="dense" 
                variant="standard" 
                placeholder="2014" 
                error={null} 
                helperText={null} />
        );
    }

    const isDisabled =
        movie.Title.length === 0 ||
        movie.Year < 1900 ||
        movie.Released.length === 0 ||
        movie.Genre.length === 0 ||
        movie.Director.length === 0

    return (
        <Dialog 
            open={open} 
            onClose={handleClose} 
            keepMounted 
            TransitionProps={{ onEntering: handleEntering }}
            style={loading ? {pointerEvents: 'none'} : {}}>
            {loading && <LinearProgress />}
            {loading && <CircularProgress style={{position: 'relative', top: '13rem', left: '45%'}}/>}
            <DialogTitle>Add Movie 🎬</DialogTitle>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
                        <TextField
                            required
                            ref={fieldRef}
                            autoFocus
                            margin="dense"
                            id="Title"
                            label="Title"
                            placeholder="Interstellar"
                            type="text"
                            value={movie.Title}
                            onChange={(event) => {
                                setMovieValue(event.target.value, 'Title');
                            }}
                            fullWidth
                            variant="standard"
                        />
                        <DatePicker
                            views={['year']}
                            id="Year"
                            label="Year"
                            minDate={new Date('1900-01-01')}
                            maxDate={new Date('2022-04-01')}
                            value={movie.Year}
                            onChange={(newValue) => {
                                setMovieValue(newValue, 'Year');
                            }}
                            renderInput={renderDatePickerInput}
                        />
                        <DatePicker
                            views={['day', 'month', 'year']}
                            id="Released"
                            label="Released"
                            minDate={new Date('1900-01-01')}
                            maxDate={new Date()}
                            value={movie.Released}
                            onChange={(newValue) => {
                                setMovieValue(newValue, 'Released');
                            }}
                            renderInput={renderDatePickerInput}
                        />
                        {movieFields.map(movieField => renderMovieFields(movieField))}
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={isDisabled} onClick={handleSave}>Add Movie</Button>
            </DialogActions>
        </Dialog>
    );
}
