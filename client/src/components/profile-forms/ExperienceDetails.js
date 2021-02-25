import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
} from "@material-ui/core";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import { addExperience } from "../../redux/actions/profile";

const useStyles = makeStyles((theme) => ({
  paperStyle: { padding: "30px 20px", width: "700px", margin: "30px auto" },
  avatarstyle: { backgroundColor: "green", width: "40px", height: "40px" },
  formControl: {
    margin: theme.spacing(1),
    marginLeft: 0,
    marginBottom: "15px",
    minWidth: 120,
  },
  container: {
    width: "100vw",
    height: "100vh",
  },
}));

const ExperienceDetails = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [toDateDisabled, toggleDisabled] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const { title, company, location, from, to, current, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addExperience(formData, history));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
      <Paper elevation={20} className={classes.paperStyle}>
        <Grid align="center">
          <Avatar className={classes.avatarstyle}>
            <WorkOutlineOutlinedIcon />
          </Avatar>
          <h2>Experience Details</h2>
        </Grid>
        <form onSubmit={onSubmit}>
          <Box
            mt="30px"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <TextField
              fullWidth
              required
              mt="25px"
              label="Job Title"
              name="title"
              value={title}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              required
              mt="25px"
              label="Company"
              name="company"
              value={company}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              mt="25px"
              label="Location"
              name="location"
              value={location}
              onChange={handleChange}
            />
          </Box>
          <Box display="flex" justifyContent="space-around" mt="20px">
            <Box>
              <Typography>From*</Typography>
              <TextField
                fullWidth
                required
                type="date"
                name="from"
                value={from}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <Typography>To</Typography>
              <TextField
                fullWidth
                type="date"
                name="to"
                value={to}
                onChange={handleChange}
                disabled={toDateDisabled ? true : false}
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" mt="20px">
            <FormControlLabel
              control={
                <Checkbox
                  checked={current}
                  value={current}
                  onChange={(e) => {
                    setFormData({ ...formData, current: !current });
                    toggleDisabled(!toDateDisabled);
                  }}
                  name="current"
                  color="#1F7396"
                />
              }
              label="Current"
            />
          </Box>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={description}
            multiline
            onChange={handleChange}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt="30px"
          >
            <Box>
              <Link to="/dashboard" className="text-link">
                <Button variant="contained" color="default">
                  Go Back
                </Button>
              </Link>
            </Box>
            <Box>
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: "#1F7396", color: "white" }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default withRouter(ExperienceDetails);
