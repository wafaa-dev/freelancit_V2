import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Avatar, IconButton, Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import { affectProject } from "../../redux/actions/project";

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
    width: "420px",
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
    height: "300px",
    borderRadius: "10px",
    zIndex: 0,
  },
  active: {
    transform: "translateX(0%)",
  },
  enabledButton: {
    backgroundColor: "#FFB400",
    color: "#040723",
    padding: "0 38px",
  },
}));

const GlobalCss = withStyles({
  "@global": {
    ".MuiRating-iconEmpty": {
      color: "black",
    },
    ".MuiButton-contained.Mui-disabled": {
      backgroundColor: "#bcbdc4",
      color: "#1B1D37",
      padding: "0 38px",
    },
  },
})(() => null);

const Candidate = ({ candidateProfile, candidates, history }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const projectState = useSelector((state) => state.project);
  const { project } = projectState;
  const dispatch = useDispatch();
  const { user } = candidateProfile;
  const candidate = candidates.find(
    (c) => c.user === candidateProfile.user._id
  );

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
          <Avatar
            alt="Remy Sharp"
            src={user && user.avatar}
            style={{ width: "80px", height: "80px" }}
          />
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
                candidateProfile && candidateProfile.ratings.length > 0
                  ? Math.round(
                      candidateProfile.ratings.reduce((a, b) => a + b) /
                        candidateProfile.ratings.length
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
        <Box
          mt="10px"
          width="100%"
          display="flex"
          justifyContent="space-between"
        >
          <Link to={`/profile/${user._id}`} className="text-link">
            <Button
              style={{
                color: "white",
                borderColor: "white",
              }}
              variant="outlined"
            >
              View Profile
            </Button>
          </Link>
          {candidates.some(
            (can) =>
              can.affected === true && can.user === candidateProfile.user._id
          ) ? (
            <CheckCircleOutlineOutlinedIcon
              style={{ color: "#30C730", fontSize: "36" }}
            />
          ) : (
            ""
          )}
          <GlobalCss />
          <Button
            variant="contained"
            disabled={
              candidates.some((can) => can.affected === true) ? true : false
            }
            className={
              candidates.some((can) => can.affected === true)
                ? ``
                : `${classes.enabledButton}`
            }
            onClick={() => {
              dispatch(affectProject(project._id, candidate._id, history));
            }}
          >
            Affect
          </Button>
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
          {candidateProfile.aboutMe}
        </Box>
      </Box>
    </Box>
  );
};

export default withRouter(Candidate);
