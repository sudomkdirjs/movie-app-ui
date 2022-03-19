import React, { useRef, useEffect, useState } from 'react';
import {Button, Dialog, DialogActions, 
    DialogContent, DialogContentText, DialogTitle, Box, TextField} from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import enLocale from 'date-fns/locale/en-US';

import { uid } from '../config/config';

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
    imdbID: uid(),
    Type: "movie"
};

export default function MovieForm({shouldShowFormDialog: open, setFormDialogState}) {

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

    }

    const handleEntering = () => {
        if (fieldRef.current != null) {
            fieldRef.current.focus();
        }
    };

    const renderDatePickerInput = (params) => {
        return (
            <TextField 
                {...params}
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
        movie.Director.length === 0 ||
        movie.Genre.length === 0 ||
        movie.Plot.length === 0 ||
        movie.Released.length === 10;

    return (
        <div>
        <Dialog 
            open={open} 
            onClose={handleClose} 
            keepMounted 
            TransitionProps={{ onEntering: handleEntering }}>
            <DialogTitle>Add Movie</DialogTitle>
            <DialogContent>
                <DialogContentText>
                
                </DialogContentText>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
                    {/* <Box spacing={3}> */}
                        <TextField
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
                            maxDate={new Date()}
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
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Runtime"
                            label="Runtime"
                            placeholder='169 min'
                            type="text"
                            value={movie.Runtime}
                            onChange={(event) => {
                                setMovieValue(event.target.value, 'Runtime');
                            }}
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Genre"
                            label="Genre"
                            placeholder='Adventure, Drama, Sci-Fi'
                            type="text"
                            value={movie.Genre}
                            onChange={(event) => {
                                setMovieValue(event.target.value, 'Genre');
                            }}
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Director"
                            label="Director"
                            placeholder='Christopher Nolan'
                            type="text"
                            value={movie.Director}
                            onChange={(event) => {
                                setMovieValue(event.target.value, 'Director');
                            }}
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Writer"
                            label="Writer"
                            placeholder='Jonathan Nolan, Christopher Nolan'
                            type="text"
                            value={movie.Writer}
                            onChange={(event) => {
                                setMovieValue(event.target.value, 'Writer');
                            }}
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Actors"
                            label="Actors"
                            placeholder='Matthew McConaughey, Anne Hathaway'
                            type="text"
                            value={movie.Actors}
                            onChange={(event) => {
                                setMovieValue(event.target.value, 'Actors');
                            }}
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Plot"
                            label="Plot"
                            placeholder='A team of explorers travel through a wormhole'
                            type="text"
                            value={movie.Plot}
                            onChange={(event) => {
                                setMovieValue(event.target.value, 'Plot');
                            }}
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Language"
                            label="Language"
                            placeholder='English'
                            type="text"
                            value={movie.Language}
                            onChange={(event) => {
                                setMovieValue(event.target.value, 'Language');
                            }}
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Country"
                            label="Country"
                            placeholder='United States'
                            type="text"
                            value={movie.Country}
                            onChange={(event) => {
                                setMovieValue(event.target.value, 'Country');
                            }}
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Awards"
                            label="Awards"
                            placeholder='Won 1 Oscar.'
                            type="text"
                            value={movie.Awards}
                            onChange={(event) => {
                                setMovieValue(event.target.value, 'Awards');
                            }}
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Poster"
                            label="Poster"
                            type="text"
                            value={movie.Poster}
                            onChange={(event) => {
                                setMovieValue(event.target.value, 'Poster');
                            }}
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="imdbRating"
                            label="IMDB Rating"
                            placeholder='8.6'
                            type="text"
                            value={movie.imdbRating}
                            onChange={(event) => {
                                setMovieValue(event.target.value, 'imdbRating');
                            }}
                            fullWidth
                            variant="standard"
                        />
                    {/* </Box> */}
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={isDisabled} onClick={handleSave}>Add Movie</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
