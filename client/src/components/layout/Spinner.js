import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    margin: "auto",
    width: "100vw",
    height: "100vh",
  },
}));

const Spinner = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CircularProgress style={{ color: "#1F7396", margin: "auto" }} />
    </Box>
  );
};

export default Spinner;
