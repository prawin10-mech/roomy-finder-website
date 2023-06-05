import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import React from "react";

const ConfirmDialog = ({ open, onClose, onClick }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle fontWeight={700}>Please confirm</DialogTitle>

      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          No
        </Button>
        <Button onClick={onClick} color="secondary" variant="outlined">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
