import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CLEAR_PROFILE, CLEAR_PROJECT } from "../../redux/actions/types";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentProfile } from "../../redux/actions/profile";
import { Typography, Box, Button } from "@material-ui/core";
import Spinner from "../layout/Spinner";
import FreelancerContent from "./FreelancerContent";
import FreelanceSeekerContent from "./FreelanceSeekerContent";
import TopSection from "./TopSection";
import { getAllProjects, getFsProjects } from "../../redux/actions/project";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);
  const userProfile = useSelector((state) => state.profile);
  const projectState = useSelector((state) => state.project);
  const { freelancerProjects, freelanceSeekerProjects } = projectState;
  const { profile, loading } = userProfile;
  const { user } = auth;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: CLEAR_PROFILE,
    });
    dispatch({
      type: CLEAR_PROJECT,
    });
    dispatch(getCurrentProfile());
    dispatch(getAllProjects());
    dispatch(getFsProjects(user && user._id));
  }, [dispatch]);
  return loading && profile === null ? (
    <Spinner />
  ) : user && user.role === "Freelance Seeker" && profile === null ? (
    <>
      <TopSection user={user} />{" "}
      <FreelanceSeekerContent
        user={user}
        freelanceSeekerProjects={freelanceSeekerProjects}
      />
    </>
  ) : profile !== null ? (
    <>
      <TopSection user={user} profile={profile} />
      <FreelancerContent
        profile={profile}
        user={user}
        freelancerProjects={freelancerProjects}
      />
    </>
  ) : (
    <>
      <TopSection user={user} />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt="10px"
      >
        <Typography component="p" style={{ color: "white" }}>
          You have not set up a profile yet. Please create one
        </Typography>
        <Link to="/create-profile" className="text-link">
          <Box mt="20px">
            <Button
              style={{ backgroundColor: "#1F7396", color: "white" }}
              variant="contained"
            >
              Create Profile
            </Button>
          </Box>
        </Link>
      </Box>
    </>
  );
};

export default Dashboard;
