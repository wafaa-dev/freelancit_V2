import React, { useState } from "react";
import origami from "../assets/origami.png";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AddCircleoutlineOutlibnedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import { logout } from "../../redux/actions/auth";
import { resetProjectState } from "../../redux/actions/project";

const useStyles = makeStyles({
  glassLogo: {
    background: "white",
    background:
      "linear-gradient(to right bottom, rgba(255, 255, 255,0.2), rgba(255, 255, 255,0.05))",
    borderRadius: "10px",
  },
  menu: {
    color: "white",
  },
});

const NavBar = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, loading } = auth;
  const dispatch = useDispatch();

  const options = [
    { text: "Home", link: "/", icon: <HomeIcon /> },
    { text: "About Us", link: "/about", icon: <InfoIcon /> },
    { text: "ContactUs", link: "/contact", icon: <PermContactCalendarIcon /> },
  ];

  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const guestLinks = (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mr="20px"
    >
      <Link to="/login" className="text-link">
        <Button startIcon={<LockOpenIcon />} color="inherit" variant="outlined">
          Sign In
        </Button>
      </Link>
      <Link to="/register" className="text-link">
        <Button
          startIcon={<AddCircleoutlineOutlibnedIcon />}
          color="inherit"
          variant="outlined"
          ml="10px"
        >
          Sign Up
        </Button>
      </Link>
    </Box>
  );

  const authLinks = (
    <Box>
      <Link to="/dashboard" className="text-link">
        <Button
          startIcon={<DashboardOutlinedIcon />}
          color="inherit"
          variant="outlined"
        >
          Dashboard
        </Button>
      </Link>
      <Link
        onClick={(e) => {
          dispatch(resetProjectState());
          dispatch(logout());
        }}
        to="/"
        className="text-link"
      >
        <Button
          startIcon={<ExitToAppOutlinedIcon />}
          color="inherit"
          variant="outlined"
        >
          Sign Out
        </Button>
      </Link>
    </Box>
  );
  return (
    <>
      <CssBaseline />
      <AppBar style={{ background: "#040724" }}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex">
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon className={classes.menu} />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {React.Children.toArray(
                options.map((option, index) => (
                  <Link to={option.link} className="text-link">
                    <Box display="flex" ml="5px" alignItems="center">
                      {option.icon}
                      <MenuItem
                        key={index}
                        selected={option === "Pyxis"}
                        onClick={handleClose}
                      >
                        {option.text}
                      </MenuItem>
                    </Box>
                  </Link>
                ))
              )}
            </Menu>
            <Toolbar className={classes.glassLogo}>
              <img
                src={origami}
                alt="origami"
                style={{ height: "50px", width: "50px" }}
              />
              <Typography variant="h6" color="inherit">
                Freelancit
              </Typography>
            </Toolbar>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mr="20px"
          >
            <Link to="/profiles" className="text-link">
              <Button startIcon={<PeopleAltOutlinedIcon />} color="inherit">
                Freelancers
              </Button>
            </Link>
            <Link to="/projects" className="text-link">
              <Button startIcon={<WorkOutlineOutlinedIcon />} color="inherit">
                Projects
              </Button>
            </Link>
            {!loading && <>{!isAuthenticated ? guestLinks : authLinks}</>}
          </Box>
        </Box>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
    </>
  );
};

export default NavBar;
