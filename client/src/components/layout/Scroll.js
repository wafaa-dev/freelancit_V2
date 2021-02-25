import React, { useState, useEffect } from "react";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toTop: {
    borderRadius: "50%",
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(4),
    zIndex: 4,
    backgroundColor: "#FFB400",
    transition: "0.5s",
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "#FFB400",
      transition: "all .25s ease-in-out",
    },
  },
}));

const Scroll = ({ showBelow }) => {
  const classes = useStyles();

  const [show, setShow] = useState(showBelow ? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  });

  const handleClick = () => {
    window["scrollTo"]({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={classes.toTop}>
      {show && (
        <IconButton onClick={handleClick}>
          <ExpandLessIcon style={{ color: "white" }} />
        </IconButton>
      )}
    </div>
  );
};

export default Scroll;
