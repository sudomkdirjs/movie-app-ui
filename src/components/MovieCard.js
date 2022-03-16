import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { poster_unavailable } from '../config/config';

export default function MovieCard({movie}) {
  const poster = (!movie.Poster || movie.Poster === 'N/A') ? poster_unavailable : movie.Poster;
  return (
    <Card sx={{ maxWidth: 345 }} elevation={20}>
      <CardActionArea>
        <CardMedia
          component="img"
          // height="140"
          image={poster}
          alt={movie.Title}
        />
        <CardContent align="center">
          <Typography gutterBottom variant="h5" component="div">
            {movie.Title}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}