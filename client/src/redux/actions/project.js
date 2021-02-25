import axios from "axios";
import {
  GET_PROJECTS,
  PROJECT_ERROR,
  GET_PROJECT,
  ADD_PROJECT,
  GET_FS_PROJECTS,
  GET_FL_PROJECTS,
  APPLY_PROJECT,
  GET_CANDIDATES,
  RESET_PROJECT_STATE,
  DELETE_PROJECT,
  AFFECT_PROJECT,
  CLOSE_PROJECT,
} from "../actions/types";
import { setAlert } from "./alert";

//* Get all projects
export const getAllProjects = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/project");
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//* Get FreelanceSeeker posted projects
export const getFsProjects = (fsId) => {
  return {
    type: GET_FS_PROJECTS,
    payload: fsId,
  };
};

//* Get Freelancer applied for projects
export const getFlProjects = (flId) => {
  return {
    type: GET_FL_PROJECTS,
    payload: flId,
  };
};

//* Get Project By ID
export const getCurrentProject = (projectId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/project/${projectId}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//* Add Project
export const addProject = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/project", formData, config);

    dispatch({
      type: ADD_PROJECT,
      payload: res.data,
    });

    dispatch(setAlert("Project Created", "success"));
    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "error"));
      });
    }

    dispatch({
      type: PROJECT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//* Apply for a project
export const applyProject = (projectId, history) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/project/apply/${projectId}`);

    dispatch({
      type: APPLY_PROJECT,
      payload: res.data,
    });
    dispatch(setAlert("Applied successfully", "success"));
    history.push("/projects");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "error"));
      });
    }
    dispatch({
      type: PROJECT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//* Get Candidates
export const getCandidates = (projectId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/project/candidates/${projectId}`);

    dispatch({
      type: GET_CANDIDATES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//* Reset project state
export const resetProjectState = () => {
  return {
    type: RESET_PROJECT_STATE,
  };
};

//* Delete Project
export const deleteProject = (projectId) => async (dispatch) => {
  try {
    await axios.delete(`/api/project/${projectId}`);

    dispatch({
      type: DELETE_PROJECT,
      payload: projectId,
    });

    dispatch(setAlert("Project Removed", "success"));
  } catch (error) {
    dispatch({
      type: PROJECT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//* Affect a project
export const affectProject = (projectId, candidateId, history) => async (
  dispatch
) => {
  try {
    const res = await axios.put(
      `/api/project/affect/${projectId}/${candidateId}`
    );

    dispatch({
      type: AFFECT_PROJECT,
      payload: res.data,
    });

    dispatch(setAlert("Project affected successfully", "success"));

    history.push("/dashboard");
    window.location.reload(true);
  } catch (error) {
    dispatch({
      type: PROJECT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//* Close project
export const closeProject = (projectId) => async (dispatch) => {
  try {
    await axios.put(`api/project/close/${projectId}`);

    dispatch({
      type: CLOSE_PROJECT,
    });

    dispatch(setAlert("Project Closed Successfully", "success"));

    window.location.reload();
  } catch (error) {
    dispatch({
      type: PROJECT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
