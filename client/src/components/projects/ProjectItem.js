import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Box, Typography, Avatar, Button } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

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
    width: "700px",
    height: "auto",
    padding: "10px 15px",
    margin: "30px 0",
    boxShadow: "2px 8px 20px -6px #000000",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
  },
  appliedProject: {
    border: "4px solid #FFB400",
    boxShadow: "0px 0px 18px 0px #FFB400",
  },
  affectedProject: {
    border: "4px solid #30C730",
    boxShadow: "0px 0px 18px 0px #30C730",
  },
}));

const ProjectItem = ({
  project: {
    _id,
    firstName,
    lastName,
    avatar,
    title,
    description,
    publishedAt,
    candidates,
  },
  user,
}) => {
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  const classes = useStyles();
  return (
    <Box
      className={
        auth.isAuthenticated &&
        user &&
        candidates.some((can) => can.user === user._id && can.affected === true)
          ? `${classes.glassItem} ${classes.affectedProject}`
          : auth.isAuthenticated &&
            user &&
            candidates.some((can) => can.user === user._id)
          ? `${classes.glassItem} ${classes.appliedProject}`
          : `${classes.glassItem}`
      }
    >
      <Box
        flex="1"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        {/* <GlobalCss /> */}
        <Box className={classes.root}>
          <Avatar
            alt="Remy Sharp"
            src={avatar}
            style={{ width: "80px", height: "80px" }}
          />
        </Box>
        <Box>
          <Typography variant="h6" style={{ color: "#1F7396" }}>
            {firstName} {lastName}
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        flex="3"
        flexDirection="column"
        alignItems="flex-start"
        ml="15px"
      >
        <Typography
          variant="h4"
          display="block"
          style={{ color: "white", marginBottom: "10px" }}
        >
          {title}
        </Typography>
        <Box
          textOverflow="ellipsis"
          overflow="hidden"
          component="div"
          maxWidth="490px"
          whiteSpace="nowrap"
          style={{ color: "white", fontSize: "18px" }}
        >
          {description}
        </Box>
        <Box
          mt="26px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography variant="subtitle2" style={{ color: "white" }}>
            Posted on: {moment(publishedAt).format("DD/MM/YYYY")}
          </Typography>
          <Box mb="5px">
            <Link to={`/project/${_id}`} className="text-link">
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#FFB400",
                  color: "#040723",
                }}
              >
                More Details
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectItem;
