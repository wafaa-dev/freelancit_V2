import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Typography, Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { deleteProject, getAllProjects } from "../../redux/actions/project";
import RateClose from "./RateClose";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  glassItem: {
    background:
      "linear-gradient(to right bottom, rgba(255, 255, 255,0.2), rgba(255, 255, 255,0.05))",
    borderRadius: "10px",
    width: "700px",
    height: "auto",
    padding: "20px 15px",
    margin: "30px 0",
    boxShadow: "2px 8px 20px -6px #000000",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
  },
  appliedProject: {
    border: "4px solid #FFB400",
    boxShadow: "0px 0px 18px 0px #FFB400",
  },
  affectedProject: {
    border: "4px solid #30C730",
    boxShadow: "0px 0px 18px 0px #30C730",
  },
}));

const DisplayFsProjects = ({
  project: { _id, title, description, publishedAt, candidates, closed },
  user,
}) => {
  const auth = useSelector((state) => state.auth);
  const profileState = useSelector((state) => state.profile);
  const candidateProfile = profileState.profiles.find((profile) =>
    candidates.some((candidate) => candidate.user === profile.user._id)
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);
  return (
    <Box
      className={
        auth.isAuthenticated &&
        candidates.length > 0 &&
        candidates.some((can) => can.affected === true)
          ? `${classes.glassItem} ${classes.affectedProject}`
          : auth.isAuthenticated && candidates.length > 0
          ? `${classes.glassItem} ${classes.appliedProject}`
          : `${classes.glassItem}`
      }
    >
      <Box
        display="flex"
        flex="3"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography
            variant="h4"
            display="block"
            style={{ color: "white", marginBottom: "10px" }}
          >
            {title}
          </Typography>
          <IconButton
            onClick={() => {
              dispatch(deleteProject(_id));
            }}
          >
            <DeleteForeverOutlinedIcon color="secondary" />
          </IconButton>
        </Box>
        <Box
          textOverflow="ellipsis"
          overflow="hidden"
          component="div"
          maxWidth="650px"
          whiteSpace="nowrap"
          style={{ color: "white", fontSize: "18px" }}
        >
          {description}
        </Box>
        <Box mt="20px">
          <Typography variant="subtitle2" style={{ color: "white" }}>
            Posted on: {moment(publishedAt).format("DD/MM/YYYY")}
          </Typography>
        </Box>
        <Box
          mt="26px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Link to={`/project/${_id}/candidates`} className="text-link">
            <Button variant="contained" color="primary">
              Show Candidates
            </Button>
          </Link>
          <Link to={`/project/${_id}`} className="text-link">
            <Button
              variant="outlined"
              style={{
                color: "white",
                borderColor: "white",
              }}
            >
              More Details
            </Button>
          </Link>
          <Box>
            <RateClose
              candidateProfile={candidateProfile}
              projectId={_id}
              closed={closed}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DisplayFsProjects;
