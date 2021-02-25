import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Box,
  Button,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import { loginUser } from "../../redux/actions/auth";

//* MATERIAL UI STYLING
const useStyles = makeStyles((theme) => ({
  paperStyle: {
    padding: "30px 20px",
    width: 300,
    margin: "auto",
  },
  avatarstyle: { backgroundColor: "green" },
  formControl: {
    margin: theme.spacing(1),
    marginLeft: 0,
    marginBottom: "15px",
    minWidth: 120,
  },
  container: {
    width: "100vw",
    height: "100vh",
    // backgroundColor: "#040724",
  },
}));

//*---------------------------------------------------

const SignIn = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  //* Redirect if authenticated
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignContent="center"
      className={classes.container}
    >
      <Paper elevation={20} className={classes.paperStyle}>
        <Grid align="center">
          <Avatar className={classes.avatarstyle}>
            <LockOpenOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
          <Typography variant="caption">
            Please enter your credentials to login
          </Typography>
        </Grid>
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <TextField
            fullWidth
            mt="25px"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <Box mt="15px">
            <Button
              fullWidth
              type="submit"
              variant="contained"
              style={{ backgroundColor: "#040724", color: "white" }}
            >
              SIGN IN
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default SignIn;
