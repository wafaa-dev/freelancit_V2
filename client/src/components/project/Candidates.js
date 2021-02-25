import React, { useEffect } from "react";
import { Grid, Button, Box, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles } from "../../redux/actions/profile";
import { getCandidates, getCurrentProject } from "../../redux/actions/project";
import Candidate from "./Candidate";
import Spinner from "../layout/Spinner";

const Candidates = ({ match }) => {
  const projectState = useSelector((state) => state.project);
  const profileState = useSelector((state) => state.profile);
  // const { candidates } = projectState;
  // const { profiles } = profileState;
  const candidateProfiles = profileState.profiles.filter((profile) =>
    projectState.candidates.some(
      (candidate) => candidate.user === profile.user._id
    )
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentProject(match.params.projectId));
    dispatch(getAllProfiles());
    dispatch(getCandidates(match.params.projectId));
  }, [dispatch]);
  return (
    <>
      {profileState.loading && projectState.loading ? (
        <Spinner />
      ) : candidateProfiles.length > 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Grid container display="flex" justify="center">
            {projectState.candidates &&
              candidateProfiles &&
              React.Children.toArray(
                candidateProfiles.map((candidateProfile) => (
                  <Candidate
                    candidateProfile={candidateProfile}
                    candidates={projectState.candidates}
                  />
                ))
              )}
          </Grid>
          <Link to="/dashboard" className="text-link">
            <Button
              style={{
                color: "white",
                borderColor: "white",
                marginTop: "20px",
              }}
              variant="outlined"
            >
              Back to Dashboard
            </Button>
          </Link>
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h3" style={{ color: "white" }}>
            There is no candidates for this project
          </Typography>
          <Box mt="40px">
            <Link to="/dashboard" className="text-link">
              <Button
                variant="outlined"
                style={{ color: "white", borderColor: "white" }}
              >
                Back to Dashboard
              </Button>
            </Link>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Candidates;
