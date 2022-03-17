import React, { useEffect } from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TvIcon from "@mui/icons-material/Tv";
import MovieIcon from "@mui/icons-material/Movie";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useHistory } from "react-router-dom";

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
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  // useEffect(() => {
  //   if (value === 0) {
  //     history.push("/");
  //   } else if (value === 1) {
  //     history.push("/tv-series");
  //   } else if (value === 2) {
  //     window.scroll(0, 0);
  //   }
  // }, [value, history]);

  return (
      <footer>
           <BottomNavigation
                value={value}
                // onChange={(event, newValue) => {
                //     setValue(newValue);
                // }}
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
