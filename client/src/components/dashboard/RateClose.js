import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import { rateProfile } from "../../redux/actions/profile";
import { closeProject } from "../../redux/actions/project";

const GlobalCss = withStyles({
  "@global": {
    ".MuiRating-iconEmpty": {
      color: "black",
    },
    ".MuiButton-contained.Mui-disabled": {
      backgroundColor: "#bcbdc4",
      color: "#1B1D37",
    },
  },
})(() => null);

const useStyles = makeStyles((theme) => ({
  enabledButton: {
    backgroundColor: "#FFB400",
    color: "#040723",
  },
}));

const RateClose = ({ candidateProfile, projectId, closed }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box display="flex" justifyContent="center">
      <GlobalCss />
      <Button
        disabled={closed ? true : false}
        variant="contained"
        className={closed ? "" : `${classes.enabledButton}`}
        onClick={handleClickOpen}
      >
        Close Project
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Rate the candidate and close the project"}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center">
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(rateProfile(candidateProfile._id, value));
              dispatch(closeProject(projectId));
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            Rate & Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RateClose;
