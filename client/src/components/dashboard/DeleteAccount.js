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
import { deleteAccount } from "../../redux/actions/profile";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box display="flex" justifyContent="center" my="50px">
      <Button
        size="large"
        startIcon={<HighlightOffOutlinedIcon />}
        color="secondary"
        variant="contained"
        onClick={handleClickOpen}
      >
        Delete Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You want to delete your account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The Action you are engaging can not be undone. Confirm to proceed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteAccount());
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteAccount;
