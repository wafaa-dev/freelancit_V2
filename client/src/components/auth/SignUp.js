import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import AddCircleoutlineOutlibnedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { setAlert } from "../../redux/actions/alert";
import { registerUser } from "../../redux/actions/auth";

//* MATERIAL UI STYLING
const useStyles = makeStyles((theme) => ({
  paperStyle: { padding: "30px 20px", width: 300, margin: "auto" },
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

//*------------------------------------------------

const SignUp = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    password2: "",
    role: "",
  });

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const {
    firstName,
    lastName,
    email,
    password,
    password2,
    phoneNumber,
    role,
  } = formData;

  //* HANDLERS

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert("Passwords dont match", "error"));
    } else {
      dispatch(
        registerUser({
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          role,
        })
      );
    }
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
            <AddCircleoutlineOutlibnedIcon />
          </Avatar>
          <h2>Sign Up</h2>
          <Typography variant="caption">
            Please fill this form to create an account
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
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <TextField
            fullWidth
            mt="25px"
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <TextField
            fullWidth
            mt="25px"
            label="Phone Number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => {
              onChange(e);
            }}
          />
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
          <TextField
            fullWidth
            type="password"
            label="Password"
            placeholder="Confirm your Password"
            name="password2"
            value={password2}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel>Status</InputLabel>
            <Select
              name="role"
              value={role}
              onChange={(e) => {
                onChange(e);
              }}
            >
              <MenuItem value="Freelancer">Freelancer</MenuItem>
              <MenuItem value="Freelance Seeker">Freelance Seeker</MenuItem>
            </Select>
          </FormControl>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#040724", color: "white" }}
          >
            SIGN UP
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SignUp;
