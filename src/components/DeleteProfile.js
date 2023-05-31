import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {
  Grid,
  Dialog,
  DialogTitle,
  Typography,
  DialogActions,
  Button,
  DialogContent,
  TextField,
  IconButton,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { toastOptions } from "../utils/ToastOptions";

const DeleteProfile = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const token = localStorage.getItem("token");

  const handleDeleteUserAccount = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmation = () => {
    setConfirmationDialogOpen(true);
  };

  console.log(email, password);

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.post(
        "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/profile/delete-account",
        { email, password },
        { headers: { Authorization: token } }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message, toastOptions);
        localStorage.removeItem("token");
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error(err.response.data.message, toastOptions);
      }
      if (err.response && err.response.status === 403) {
        setConfirmationDialogOpen(true);
        toast.error(err.response.data.message, toastOptions);
      }
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Grid container justifyContent="center" my={2}>
        <Button
          variant="contained"
          color="error"
          sx={{ borderRadius: "15px" }}
          onClick={handleDeleteUserAccount}
        >
          Delete Account
        </Button>
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle fontWeight={700}>Confirm Account Deletion</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              By deleting your account, all your personal information and ads
              will be deleted without the possibility of recovery. It is
              recommended to withdraw all the money in your account before
              performing this action, as Roomy Finder will not refund any money
              to deleted accounts.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleDeleteConfirmation}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>{" "}
        <Dialog
          open={confirmationDialogOpen}
          onClose={() => setConfirmationDialogOpen(false)}
        >
          <DialogTitle>Confirm Account Deletion</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Please enter your email and password to confirm the account
              deletion.
            </Typography>
            {confirmationDialogOpen && (
              <>
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmationDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <ToastContainer />
      </Grid>
    </div>
  );
};

export default DeleteProfile;
