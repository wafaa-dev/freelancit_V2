import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { getProfileById } from "../../redux/actions/profile";
import Spinner from "../layout/Spinner";
import DisplayExperience from "../dashboard/DisplayExperience";
import DisplayEducation from "../dashboard/DisplayEducation";
import { Avatar, Typography, Box, Button } from "@material-ui/core";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import LanguageIcon from "@material-ui/icons/Language";
import TranslateIcon from "@material-ui/icons/Translate";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import PhoneIcon from "@material-ui/icons/Phone";
import WcIcon from "@material-ui/icons/Wc";
import Rating from "@material-ui/lab/Rating";

const GlobalCss = withStyles({
  "@global": {
    ".MuiAvatar-root": {
      height: 80,
      width: 80,
    },
    ".MuiTableCell-body": {
      color: "white",
    },
    ".MuiTableCell-head": {
      color: "#FFB400",
    },
    ".MuiRating-iconEmpty": {
      color: "black",
    },
  },
})(() => null);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  glassItem: {
    background:
      "linear-gradient(to right bottom, rgba(255, 255, 255,0.2), rgba(255, 255, 255,0.05))",
    borderRadius: "10px",
    position: "relative",
    width: "auto",
    height: "auto",
    padding: "10px 15px",
    margin: "10px",
    boxShadow: "2px 8px 20px -6px #000000",
  },
  techInfo: {
    background:
      "linear-gradient(to right bottom, rgba(255, 255, 255,0.4), rgba(255, 255, 255,0.15))",
    borderRadius: "10px",
    padding: "10px 15px",
    margin: "10px",
    boxShadow: "2px 8px 20px -6px #000000",
  },
  container: {
    height: "100vh",
  },
}));

const Profile = ({ match }) => {
  const classes = useStyles();
  const userProfile = useSelector((state) => state.profile);
  const { profile, loading } = userProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileById(match.params.userId));
  }, [dispatch]);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      className={classes.container}
    >
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={classes.glassItem}
          >
            <Box
              width="auto"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box className={classes.root}>
                <GlobalCss />
                <Avatar
                  alt="Remy Sharp"
                  src={profile.user && profile.user.avatar}
                />
              </Box>
              <Box>
                <Typography variant="h6" style={{ color: "#1F7396" }}>
                  {profile.user && profile.user.firstName}{" "}
                  {profile.user && profile.user.lastName}
                </Typography>
              </Box>
              <Box mt="15px">
                <Rating
                  name="read-only"
                  size="small"
                  value={
                    profile && profile.ratings.length > 0
                      ? Math.round(
                          profile.ratings.reduce((a, b) => a + b) /
                            profile.ratings.length
                        )
                      : 0
                  }
                  readOnly
                />
              </Box>
              <Box display="flex" alignItems="center">
                <Box className={classes.techInfo}>
                  <Box display="flex" flexDirection="column">
                    <Box display="flex" textAlign="center" mb="7px">
                      <Box>
                        <FitnessCenterIcon
                          style={{ color: "#FFB400", marginRight: "5px" }}
                        />
                      </Box>
                      {profile.skills &&
                        React.Children.toArray(
                          profile.skills.map((skill) => (
                            <Typography
                              display="inline"
                              variant="body1"
                              style={{ color: "white", marginRight: "5px" }}
                            >
                              {skill}
                            </Typography>
                          ))
                        )}
                    </Box>
                    <Box display="flex" alignItems="center" mb="8px">
                      <MonetizationOnIcon
                        style={{ color: "#FFB400", marginRight: "5px" }}
                      />
                      {profile.hourlyRate && (
                        <Typography
                          display="inline"
                          variant="body1"
                          style={{ color: "white" }}
                        >
                          {profile.hourlyRate} TND
                        </Typography>
                      )}
                    </Box>
                    <Box>
                      {profile.certifications.length > 0 && (
                        <Box display="flex" textAlign="center" mb="5px">
                          <Box>
                            <CardMembershipIcon
                              style={{ color: "#FFB400", marginRight: "5px" }}
                            />
                          </Box>
                          <Box>
                            {profile.certifications &&
                              React.Children.toArray(
                                profile.certifications.map((certification) => (
                                  <Typography
                                    display="inline"
                                    variant="body1"
                                    style={{
                                      color: "white",
                                      marginRight: "5px",
                                    }}
                                  >
                                    {certification}
                                  </Typography>
                                ))
                              )}
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box className={classes.techInfo} display="flex">
                  <Box>
                    <Box>
                      {profile && (
                        <Box display="flex" textAlign="center" mb="5px">
                          <Box>
                            <WcIcon
                              style={{ color: "#FFB400", marginRight: "5px" }}
                            />
                          </Box>
                          <Box>
                            <Typography
                              display="inline"
                              variant="body1"
                              style={{ color: "white", marginRight: "5px" }}
                            >
                              {profile.gender}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                    <Box>
                      {profile && profile.nationality && (
                        <Box display="flex" textAlign="center" mb="5px">
                          <Box>
                            <LanguageIcon
                              style={{ color: "#FFB400", marginRight: "5px" }}
                            />
                          </Box>
                          <Box>
                            <Typography
                              display="inline"
                              variant="body1"
                              style={{ color: "white", marginRight: "5px" }}
                            >
                              {profile.nationality}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                    <Box>
                      {profile && profile.spokenLanguages.length > 0 && (
                        <Box display="flex" textAlign="center" mb="5px">
                          <Box>
                            <TranslateIcon
                              style={{ color: "#FFB400", marginRight: "5px" }}
                            />
                          </Box>
                          <Box>
                            {React.Children.toArray(
                              profile.spokenLanguages.map((lang) => (
                                <Typography
                                  display="inline"
                                  variant="body1"
                                  style={{
                                    color: "white",
                                    marginRight: "5px",
                                  }}
                                >
                                  {lang}
                                </Typography>
                              ))
                            )}
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Box>
                    <Box>
                      {profile && profile.contacts && (
                        <Box display="flex" textAlign="center" mb="5px">
                          <Box>
                            <AlternateEmailIcon
                              style={{ color: "#FFB400", marginRight: "5px" }}
                            />
                          </Box>
                          <Box>
                            <Typography
                              display="inline"
                              variant="body1"
                              style={{ color: "white", marginRight: "5px" }}
                            >
                              {profile.contacts.email}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                    <Box>
                      {profile && profile.contacts && (
                        <Box display="flex" textAlign="center" mb="5px">
                          <Box>
                            <PhoneIcon
                              style={{ color: "#FFB400", marginRight: "5px" }}
                            />
                          </Box>
                          <Box>
                            <Typography
                              display="inline"
                              variant="body1"
                              style={{ color: "white", marginRight: "5px" }}
                            >
                              {profile.contacts.phoneNumber}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                    <Box>
                      {profile && profile.city && (
                        <Box display="flex" textAlign="center" mb="5px">
                          <Box>
                            <LocationCityIcon
                              style={{ color: "#FFB400", marginRight: "5px" }}
                            />
                          </Box>
                          <Box>
                            <Typography
                              display="inline"
                              variant="body1"
                              style={{ color: "white", marginRight: "5px" }}
                            >
                              {profile.city}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
              {profile && profile.experiences.length > 0 && (
                <Box className={classes.techInfo}>
                  <GlobalCss />
                  <DisplayExperience
                    experience={profile.experiences}
                    dashboard={false}
                  />
                </Box>
              )}
              {profile && profile.education.length > 0 && (
                <Box className={classes.techInfo}>
                  <GlobalCss />
                  <DisplayEducation
                    education={profile.education}
                    dashboard={false}
                  />
                </Box>
              )}
              <Box my="5px">
                <Button
                  variant="outlined"
                  style={{ color: "white", borderColor: "white" }}
                  onClick={() => window.history.back()}
                >
                  Back
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Profile;
