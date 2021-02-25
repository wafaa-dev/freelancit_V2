import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Avatar, TextField, Button, Box } from "@material-ui/core";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import { addProject } from "../../redux/actions/project";

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

const AddProject = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    requiredSkills: "",
    estimatedBudget: "",
    description: "",
  });

  const { title, requiredSkills, estimatedBudget, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addProject(formData, history));
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
            <SettingsOutlinedIcon />
          </Avatar>
          <h2>Add Project</h2>
        </Grid>
        <form onSubmit={onSubmit}>
          <Grid container display="flex" spacing={5}>
            <Grid item>
              <Box width="500px">
                <TextField
                  fullWidth
                  mt="25px"
                  label="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  mt="25px"
                  label="Required Skills"
                  name="requiredSkills"
                  value={requiredSkills}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  mt="25px"
                  label="Estimated Budget"
                  name="estimatedBudget"
                  value={estimatedBudget}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  multiline
                  mt="25px"
                  label="Description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
          </Grid>
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

export default withRouter(AddProject);
