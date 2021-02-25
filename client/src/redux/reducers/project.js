import {
  GET_PROJECTS,
  PROJECT_ERROR,
  GET_PROJECT,
  CLEAR_PROJECT,
  ADD_PROJECT,
  GET_FS_PROJECTS,
  APPLY_PROJECT,
  GET_CANDIDATES,
  CLEAR_CANDIDATES,
  GET_FL_PROJECTS,
  RESET_PROJECT_STATE,
  DELETE_PROJECT,
  AFFECT_PROJECT,
} from "../actions/types";

const initialState = {
  projects: [],
  freelanceSeekerProjects: [],
  freelancerProjects: [],
  project: null,
  candidates: [],
  loading: true,
  error: {},
};

const projectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: payload,
        loading: false,
      };
    case GET_FS_PROJECTS:
      return {
        ...state,
        freelanceSeekerProjects: state.projects
          .filter((project) => {
            return project.user === payload;
          })
          .sort((a, b) => a.publishedAt - b.publishedAt),
        loading: false,
      };
    case GET_FL_PROJECTS:
      return {
        ...state,
        freelancerProjects: state.projects.filter((project) => {
          return project.candidates.some((candidate) => {
            return candidate.user === payload;
          });
        }),
      };
    case GET_PROJECT:
      return {
        ...state,
        project: payload,
        loading: false,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [payload, ...state.projects],
        loading: false,
      };
    case GET_CANDIDATES:
    case APPLY_PROJECT:
    case AFFECT_PROJECT:
      return {
        ...state,
        candidates: payload,
        loading: false,
      };
    case PROJECT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROJECT:
      return {
        ...state,
        project: null,
      };
    case CLEAR_CANDIDATES:
      return {
        ...state,
        candidates: [],
      };
    case RESET_PROJECT_STATE:
      return {
        ...state,
        freelancerProjects: [],
        freelanceSeekerProjects: [],
        loading: false,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((project) => project._id !== payload),
        freelanceSeekerProjects: state.freelanceSeekerProjects.filter(
          (project) => project._id !== payload
        ),
        loading: false,
      };
    default:
      return state;
  }
};

export default projectReducer;
