import React from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import SpellcheckOutlinedIcon from "@material-ui/icons/SpellcheckOutlined";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import BorderColorOutlinedIcon from "@material-ui/icons/BorderColorOutlined";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

const DashboardActions = ({ user }) => {
  return (
    <Box display="flex" justifyContent="center" mt="10px">
      {user && user.role && user.role === "Freelance Seeker" ? (
        <Link to="/add-project" className="text-link">
          <Button
            startIcon={<PlaylistAddIcon />}
            variant="outlined"
            style={{ color: "white", borderColor: "white" }}
          >
            Add Project
          </Button>
        </Link>
      ) : (
        <>
          <Link to="/edit-profile" className="text-link">
            <Button
              startIcon={<SpellcheckOutlinedIcon />}
              variant="outlined"
              style={{ color: "white", borderColor: "white" }}
            >
              Edit Profile
            </Button>
          </Link>
          <Link to="/add-experience" className="text-link">
            <Button
              startIcon={<WorkOutlineOutlinedIcon />}
              variant="outlined"
              style={{ color: "white", borderColor: "white" }}
            >
              Add Experience
            </Button>
          </Link>
          <Link to="/add-education" className="text-link">
            <Button
              startIcon={<BorderColorOutlinedIcon />}
              variant="outlined"
              style={{ color: "white", borderColor: "white" }}
            >
              Add Education
            </Button>
          </Link>
        </>
      )}
    </Box>
  );
};

export default DashboardActions;
