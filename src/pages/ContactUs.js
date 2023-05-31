import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import UAE2 from "../assets/contact/UAEFlag1.jpg";
import USA1 from "../assets/contact/usa4.jpg";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../utils/ToastOptions";
import TopBackground from "../components/postPropertyComponents/TopBackground";
import BottomBackground from "../components/postPropertyComponents/BottomBackground";
import Footer from "../components/Footer";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form submission logic, e.g., send data to the server

    // Clear form fields
    setName("");
    setEmail("");
    setDescription("");

    // Show success toast
    toast.success("Form submitted successfully!", toastOptions);
  };

  return (
    <>
      <TopBackground />
      <Container>
        <Grid container sx={{ my: { md: "5%" } }}>
          <Grid
            item
            md={6}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              my: { xs: 1 },
            }}
          >
            <Box
              sx={{
                width: "65px",
                height: "90px",
                mt: 1,
                mr: 2,
              }}
            >
              <img
                src={UAE2}
                alt="Peoples"
                style={{ width: "80px", height: "40px" }}
              />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
              >
                United Arab Emirates
              </Typography>
              <Typography variant="subtitle1">
                Location: Dubai, 16, Misakin St, Al Danah 22213
              </Typography>
              <Typography variant="subtitle1">Tel +971 50 601 3921</Typography>
            </Box>
          </Grid>
          <Grid
            item
            md={6}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
            }}
          >
            <Box
              sx={{
                width: "80px",
                height: "90px",
                mt: 1,
                mr: 2,
              }}
            >
              <img
                src={USA1}
                alt="Peoples"
                style={{ width: "80px", height: "40px" }}
              />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
              >
                United States of America
              </Typography>
              <Typography variant="subtitle1">
                Location: Global Strategy Catalyst Group LLc 401 Ryland St, Suit
                200-A, Reno, Nv. 89502
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Tel +1412 403 3921
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item xs={12} sm={12} md={6} sx={{ my: { md: "1%" } }}>
            <Paper sx={{ padding: "2rem" }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: "orange",
                    color: "#fff",
                    borderRadius: "20px",
                    "&:hover": {
                      bgcolor: "orange",
                    },
                  }}
                  fullWidth
                >
                  Submit
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <BottomBackground />
      <ToastContainer />
      <Footer />
    </>
  );
};

export default ContactUs;
