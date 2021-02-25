import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCandidates, getCurrentProject } from "../../redux/actions/project";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Avatar, Typography, Box, Button } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import FitnessCenterOutlinedIcon from "@material-ui/icons/FitnessCenterOutlined";
import Spinner from "../layout/Spinner";
import ApplyButton from "./ApplyButton";

const GlobalCss = withStyles({
  "@global": {
    ".MuiAvatar-root": {
      height: 80,
      width: 80,
    },
  },
})(() => null);

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
    position: "relative",
    maxWidth: "75vw",
    minWidth: "40vw",
    height: "auto",
    padding: "10px 15px",
    margin: "10px",
    boxShadow: "2px 8px 20px -6px #000000",
  },
  techInfo: {
    background:
      "linear-gradient(to right bottom, rgba(255, 255, 255,0.4), rgba(255, 255, 255,0.15))",
    borderRadius: "10px",
    padding: "10px 15px",
    margin: "10px",
    boxShadow: "2px 8px 20px -6px #000000",
  },
  container: {
    width: "100vw",
    height: "100vh",
  },
}));

const Project = ({ match }) => {
  const classes = useStyles();
  const projectState = useSelector((state) => state.project);
  const authState = useSelector((state) => state.auth);
  const { project, loading, candidates } = projectState;
  const { user } = authState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentProject(match.params.projectId));
    dispatch(getCandidates(match.params.projectId));
  }, [dispatch]);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      className={classes.container}
    >
      {project === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={classes.glassItem}
          >
            <Box
              width="auto"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box className={classes.root}>
                <GlobalCss />
                <Avatar alt="Remy Sharp" src={project && project.avatar} />
              </Box>
              <Box>
                <Typography variant="h6" style={{ color: "white" }}>
                  {project && project.firstName} {project && project.lastName}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt="15px">
                <Box>
                  {project && project.user && (
                    <Box display="flex" textAlign="center" mb="5px">
                      <Box>
                        <PhoneIcon
                          style={{ color: "#FFB400", marginRight: "5px" }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          display="inline"
                          variant="body1"
                          style={{ color: "white", marginRight: "5px" }}
                        >
                          {project.user.phoneNumber}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
                <Box>
                  {project && project.user && (
                    <Box display="flex" textAlign="center" mb="5px">
                      <Box>
                        <AlternateEmailIcon
                          style={{ color: "#FFB400", marginRight: "5px" }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          display="inline"
                          variant="body1"
                          style={{ color: "white", marginRight: "5px" }}
                        >
                          {project.user.email}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
              <Box>
                <Typography variant="h3" style={{ color: "#1F7396" }}>
                  {project.title}
                </Typography>
              </Box>
              <Box
                className={classes.techInfo}
                style={{ color: "white", fontSize: "15px" }}
              >
                {project.description}
              </Box>
              <Box
                display="flex"
                justifyContent="space-arround"
                className={classes.techInfo}
                style={{ color: "white" }}
              >
                <Box display="flex" alignItems="center">
                  <FitnessCenterOutlinedIcon
                    style={{ color: "#FFB400", marginRight: "5px" }}
                  />
                  {project.requiredSkills &&
                    React.Children.toArray(
                      project.requiredSkills.map((skill) => (
                        <Typography
                          display="inline"
                          variant="body1"
                          style={{ color: "white", marginRight: "5px" }}
                        >
                          {skill}
                        </Typography>
                      ))
                    )}
                </Box>
                <Box display="flex" alignItems="center">
                  <MonetizationOnOutlinedIcon
                    style={{ color: "#FFB400", marginRight: "5px" }}
                  />
                  <Typography
                    display="inline"
                    variant="body1"
                    style={{ color: "white", marginRight: "5px" }}
                  >
                    {project.estimatedBudget}
                  </Typography>
                </Box>
              </Box>
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                mt="20px"
              >
                <Button
                  variant="outlined"
                  onClick={() => window.history.back()}
                  style={{ color: "white", borderColor: "white" }}
                >
                  Back
                </Button>
                {user && user.role === "Freelancer" && (
                  <ApplyButton
                    user={user}
                    candidates={candidates}
                    project={project}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Project;
