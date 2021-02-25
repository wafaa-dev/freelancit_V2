import React, { useState, useEffect } from "react";
import insta from "../assets/insta.png";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Box,
} from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { createProfile, getCurrentProfile } from "../../redux/actions/profile";
import { Link, withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    padding: "30px 20px",
    width: "1100px",
    margin: "30px 0 0 30px",
  },
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

const EditProfile = ({ history }) => {
  const classes = useStyles();
  const userProfile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    aboutMe: "",
    city: "",
    nationality: "",
    gender: "",
    spokenLanguages: "",
    hourlyRate: "",
    skills: "",
    portfolio: "",
    githubusername: "",
    certifications: "",
    businessLicense: "",
    address: "",
    facebook: "",
    youtube: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  });

  const {
    aboutMe,
    city,
    nationality,
    gender,
    spokenLanguages,
    hourlyRate,
    skills,
    portfolio,
    githubusername,
    certifications,
    facebook,
    youtube,
    instagram,
    linkedin,
    twitter,
  } = formData;

  const { profile, loading } = userProfile;

  useEffect(() => {
    dispatch(getCurrentProfile());
    setFormData({
      aboutMe: loading || !profile.aboutMe ? "" : profile.aboutMe,
      city: loading || !profile.city ? "" : profile.city,
      nationality: loading || !profile.nationality ? "" : profile.nationality,
      gender: loading || !profile.gender ? "" : profile.gender,
      spokenLanguages:
        loading || !profile.spokenLanguages
          ? ""
          : profile.spokenLanguages.toString(),
      hourlyRate: loading || !profile.hourlyRate ? "" : profile.hourlyRate,
      skills: loading || !profile.skills ? "" : profile.skills.toString(),
      portfolio: loading || !profile.portfolio ? "" : profile.portfolio,
      githubusername:
        loading || !profile.githubusername ? "" : profile.githubusername,
      certifications:
        loading || !profile.certifications
          ? ""
          : profile.certifications.toString(),
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
    });
  }, [dispatch, loading]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProfile(formData, history, true));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            <InfoOutlinedIcon />
          </Avatar>
          <h2>User Details</h2>
        </Grid>
        <form onSubmit={onSubmit}>
          <Grid container display="flex" spacing={5}>
            <Grid item>
              <Box width="500px">
                <TextField
                  fullWidth
                  mt="25px"
                  label="City"
                  name="city"
                  value={city}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  mt="25px"
                  label="Nationality"
                  name="nationality"
                  value={nationality}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  mt="25px"
                  label="Spoken Languages"
                  name="spokenLanguages"
                  value={spokenLanguages}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  required
                  mt="25px"
                  label="Hourly Rate"
                  name="hourlyRate"
                  value={hourlyRate}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  required
                  mt="25px"
                  label="Skills"
                  name="skills"
                  value={skills}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  mt="25px"
                  label="Certifications"
                  name="certifications"
                  value={certifications}
                  multiline
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  mt="25px"
                  label="Github Username"
                  name="githubusername"
                  value={githubusername}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  mt="25px"
                  label="Portfolio Link"
                  name="portfolio"
                  value={portfolio}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  mt="25px"
                  label="About Me"
                  name="aboutMe"
                  value={aboutMe}
                  multiline
                  onChange={handleChange}
                />
              </Box>
            </Grid>
            <Grid item>
              <Box
                width="500px"
                mt="25px"
                display="flex"
                flexDirection="column"
              >
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={gender}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
                <div className={classes.margin}>
                  <Box display="flex" alignItems="flex-end">
                    <Box mr="10px" width="30px">
                      <i
                        className="fab fa-facebook-square fa-2x "
                        style={{ color: "#1877F2" }}
                      ></i>
                    </Box>
                    <Box width="460px">
                      <TextField
                        fullWidth
                        mt="25px"
                        label="Facebook"
                        name="facebook"
                        value={facebook}
                        onChange={handleChange}
                      />
                    </Box>
                  </Box>
                </div>
                <div className={classes.margin}>
                  <Box display="flex" alignItems="flex-end">
                    <Box mr="10px" width="30px">
                      <img
                        src={insta}
                        style={{
                          width: "25px",
                          height: "25px",
                        }}
                      />
                    </Box>
                    <Box width="460px">
                      <TextField
                        fullWidth
                        mt="25px"
                        label="Instagram"
                        name="instagram"
                        value={instagram}
                        onChange={handleChange}
                      />
                    </Box>
                  </Box>
                </div>
                <div className={classes.margin}>
                  <Box display="flex" alignItems="flex-end">
                    <Box mr="10px" width="30px">
                      <i
                        className="fab fab fa-youtube fa-2x "
                        style={{ color: "#FF0000" }}
                      ></i>
                    </Box>
                    <Box width="460px">
                      <TextField
                        fullWidth
                        mt="25px"
                        label="Youtube"
                        name="youtube"
                        value={youtube}
                        onChange={handleChange}
                      />
                    </Box>
                  </Box>
                </div>
                <div className={classes.margin}>
                  <Box display="flex" alignItems="flex-end">
                    <Box mr="10px" width="30px">
                      <i
                        className="fab fa-linkedin fa-2x "
                        style={{ color: "#0A66C2" }}
                      ></i>
                    </Box>
                    <Box width="460px">
                      <TextField
                        fullWidth
                        mt="25px"
                        label="Linkedin"
                        name="linkedin"
                        value={linkedin}
                        onChange={handleChange}
                      />
                    </Box>
                  </Box>
                </div>
                <div className={classes.margin}>
                  <Box display="flex" alignItems="flex-end">
                    <Box mr="10px" width="30px">
                      <i
                        className="fab fa-twitter fa-2x "
                        style={{ color: "#2EABE2" }}
                      ></i>
                    </Box>
                    <Box width="460px">
                      <TextField
                        fullWidth
                        mt="25px"
                        label="Twitter"
                        name="twitter"
                        value={twitter}
                        onChange={handleChange}
                      />
                    </Box>
                  </Box>
                </div>
                <Box mt="30px" display="flex" alignSelf="flex-end">
                  <Box>
                    <Link to="/dashboard" className="text-link">
                      <Button variant="contained" color="default">
                        Go Back
                      </Button>
                    </Link>
                  </Box>
                  <Box ml="10px">
                    <Button
                      type="submit"
                      variant="contained"
                      style={{ backgroundColor: "#1F7396", color: "white" }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default withRouter(EditProfile);
