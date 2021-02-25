import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProjects } from "../../redux/actions/project";
import { Typography, Box, Grid } from "@material-ui/core";
import ProjectItem from "./ProjectItem";
import Spinner from "../layout/Spinner";
import { CLEAR_CANDIDATES, CLEAR_PROJECT } from "../../redux/actions/types";

const Projects = () => {
  const project = useSelector((state) => state.project);
  const { projects, loading } = project;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: CLEAR_PROJECT,
    });
    dispatch({
      type: CLEAR_CANDIDATES,
    });
    dispatch(getAllProjects());
  }, [dispatch]);
  return loading ? (
    <Spinner />
  ) : (
    <Grid
      container
      display="flex"
      direction="column"
      justify="center"
      alignContent="center"
    >
      {projects.length > 0 && !loading ? (
        React.Children.toArray(
          projects.map((project) => <ProjectItem project={project} />)
        )
      ) : (
        <Typography variant="h2">No Projects Available</Typography>
      )}
    </Grid>
  );
};

export default Projects;
