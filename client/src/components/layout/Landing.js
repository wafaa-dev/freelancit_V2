import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import origami from "../assets/origami.png";

const useStyles = makeStyles((theme) => ({
  glassItem: {
    background: "white",
    background:
      "linear-gradient(to right bottom, rgba(255, 255, 255,0.3), rgba(255, 255, 255,0.05))",
    borderRadius: "10px",
    width: "450px",
    height: "420px",
    padding: "10px 15px",
    margin: "10px",
    boxShadow: "2px 8px 20px -6px #000000",
    zIndex: "3",
    backdropFilter: "blur(1.8px)",
  },
  container: {
    width: "100vw",
    height: "100vh",
    position: "relative",
  },
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        className={classes.container}
      >
        <Box className={classes.glassItem}>
          <img
            src={origami}
            alt="Logo..."
            style={{ width: "400px", height: "400px", zIndex: "4" }}
          />
        </Box>
      </Box>
      <Typography variant="h4" className="fontLogo">
        Freelancit
      </Typography>
    </>
  );
};

export default Landing;
