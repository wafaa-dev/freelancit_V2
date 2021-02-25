import React from "react";
import Moment from "react-moment";
import moment from "moment";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@material-ui/core";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { deleteEducation } from "../../redux/actions/profile";

const useStyles = makeStyles({
  table: {
    width: 650,
  },
  font: {
    fontWeight: "bold",
  },
});

const DisplayExperience = ({ education, dashboard }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const educationRows =
    education &&
    React.Children.toArray(
      education.map((edu) => (
        <TableRow>
          <TableCell>{edu.school}</TableCell>
          <TableCell>{edu.degree}</TableCell>
          <TableCell>{edu.fieldofstudy}</TableCell>
          <TableCell>
            {moment(edu.from).format("DD/MM/YYYY")}
            {/* <Moment format="YYYY/MM/DD">{edu.from}</Moment> */}
          </TableCell>
          <TableCell>
            {
              edu.current === true ? "Now" : moment(edu.to).format("DD/MM/YYYY")
              // <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            }
          </TableCell>
          <TableCell>{edu.description}</TableCell>
          {dashboard && (
            <TableCell>
              <Button
                startIcon={<DeleteForeverOutlinedIcon />}
                onClick={() => {
                  dispatch(deleteEducation(edu._id));
                }}
                color="secondary"
                variant="contained"
              >
                Remove
              </Button>
            </TableCell>
          )}
        </TableRow>
      ))
    );
  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Typography variant="h6" className={classes.font}>
                  School
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" className={classes.font}>
                  Degree
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" className={classes.font}>
                  FOS
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" className={classes.font}>
                  From
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" className={classes.font}>
                  To
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" className={classes.font}>
                  Description
                </Typography>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{educationRows}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DisplayExperience;
