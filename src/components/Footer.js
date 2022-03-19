import React from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TvIcon from "@mui/icons-material/Tv";
import MovieIcon from "@mui/icons-material/Movie";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useHistory } from "react-router-dom";

import '../styles/Footer.css';

const styles = {
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#2d313a",
    zIndex: 100,
  }
};

export default function Footer() {
  const history = useHistory();

  return (
      <footer className='footer'>
           <BottomNavigation
                showLabels
                style={styles.root} >
                <BottomNavigationAction
                    style={{ color: "white" }}
                    label="Movies"
                    icon={<MovieIcon />} 
                    onClick={() =>  history.push("/")}/>
                <BottomNavigationAction
                    style={{ color: "white" }}
                    label="TV Series"
                    icon={<TvIcon />} 
                    onClick={() =>  history.push("/")}/>
                <BottomNavigationAction
                    style={{ color: "white" }}
                    label="Top"
                    icon={<ArrowCircleUpIcon />}
                    onClick={() => window.scroll(0, 0)}
                />
            </BottomNavigation>
      </footer>
  );
}
