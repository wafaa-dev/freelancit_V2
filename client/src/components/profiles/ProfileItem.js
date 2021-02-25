import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  IconButton,
  Button,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    justifyContent: "center",
    alignItems: "center",
  },
  glassItem: {
    background:
      "linear-gradient(to right bottom, rgba(255, 255, 255,0.2), rgba(255, 255, 255,0.05))",
    borderRadius: "10px",
    position: "relative",
    width: "400px",
    height: "300",
    padding: "10px 15px",
    margin: "10px",
    boxShadow: "2px 8px 20px -6px #000000",
    overflow: "hidden",
  },
  info: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#34374E",
    color: "white",
    padding: "1rem",
    transform: "translateY(100%)",
    transition: "transform 0.3s ease-in-out",
    overflow: "auto",
    height: "260px",
    borderRadius: "10px",
    zIndex: 0,
  },
  active: {
    transform: "translateX(0%)",
  },
}));

const GlobalCss = withStyles({
  "@global": {
    ".MuiAvatar-root": {
      height: 80,
      width: 80,
    },
    ".MuiRating-iconEmpty": {
      color: "black",
    },
  },
})(() => null);

const ProfileItem = ({ profile }) => {
  const [open, setOpen] = useState(true);
  const { user } = profile;
  const classes = useStyles();
  return (
    <Box className={classes.glassItem}>
      <Box
        display="flex"
        justify="center"
        alignItems="center"
        flexDirection="column"
        pb="5px"
      >
        <GlobalCss />
        <Box className={classes.root}>
          <Avatar alt="Remy Sharp" src={user && user.avatar} />
        </Box>
        <Box>
          <Typography variant="h6" style={{ color: "#1F7396" }}>
            {user && user.firstName} {user && user.lastName}
          </Typography>
        </Box>
        <Box>
          <Box>
            <Rating
              name="read-only"
              size="small"
              value={
                profile && profile.ratings.length > 0
                  ? Math.round(
                      profile.ratings.reduce((a, b) => a + b) /
                        profile.ratings.length
                    )
                  : 0
              }
              readOnly
            />
          </Box>
        </Box>
        <IconButton
          onClick={() => {
            setOpen(false);
          }}
        >
          <InfoOutlinedIcon style={{ color: "white" }} />
        </IconButton>
        <Box mt="10pw">
          <Link to={`/profile/${user._id}`} className="text-link">
            <Button
              style={{ color: "white", borderColor: "white" }}
              variant="outlined"
            >
              View Profile
            </Button>
          </Link>
        </Box>
        <Box
          className={
            open ? `${classes.info}` : `${classes.info} ${classes.active}`
          }
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
          >
            <KeyboardArrowDownOutlinedIcon style={{ color: "white" }} />
          </IconButton>
          {profile.aboutMe}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileItem;
