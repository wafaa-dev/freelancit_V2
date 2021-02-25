import React from "react";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { applyProject } from "../../redux/actions/project";
import { useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const GlobalCss = withStyles({
  "@global": {
    ".MuiButton-contained.Mui-disabled": {
      backgroundColor: "#bcbdc4",
      color: "#1B1D37",
    },
  },
})(() => null);

const ApplyButton = ({ user, candidates, project, history }) => {
  const dispatch = useDispatch();
  return (
    <>
      <GlobalCss />
      <Button
        variant="contained"
        type="submit"
        color="primary"
        disabled={
          candidates.some((candidate) => candidate.user === user._id) ||
          project.closed
            ? true
            : false
        }
        style={{
          marginLeft: "10px",
        }}
        onClick={() => {
          dispatch(applyProject(project._id, history));
        }}
      >
        Apply
      </Button>
    </>
  );
};

export default withRouter(ApplyButton);
