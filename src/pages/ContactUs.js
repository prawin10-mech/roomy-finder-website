import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import EmailIcon from "@mui/icons-material/Email";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

import TopBackground from "../components/postPropertyComponents/TopBackground";
import BottomBackground from "../components/postPropertyComponents/BottomBackground";
import Footer from "../components/Footer";

import UAEFlag from "../assets/contact_flag/UAEFlag.jpg";
import USAFlag from "../assets/contact_flag/USAFlag.jpg";

import { toastOptions } from "../utils/ToastOptions";

const ContactLocation = ({ flagSrc, title, location, telNumbers }) => (
  <Paper
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem",
      height: "100%",
    }}
  >
    <Box sx={{ width: "100px", height: "auto", mb: 2, mr: 2 }}>
      <img
        src={flagSrc}
        alt="Flag"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </Box>
    <Box sx={{}}>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", fontSize: "1.3rem", mb: 1 }}
      >
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={{ maxWidth: "200px" }}>
        Location: {location}
      </Typography>
      {telNumbers.map((tel) => (
        <Typography key={tel} variant="subtitle1">
          Tel {tel}
        </Typography>
      ))}
    </Box>
  </Paper>
);

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setName("");
    setEmail("");
    setDescription("");

    toast.success("Form submitted successfully!", toastOptions);
  };

  return (
    <>
      <TopBackground />
      <Container>
        <Grid container spacing={2} sx={{ my: { md: "5%" } }}>
          <Grid item xs={12} md={6}>
            <ContactLocation
              flagSrc={UAEFlag}
              title="United Arab Emirates"
              location="Dubai, 16, Misakin St, Al Danah 22213"
              telNumbers={[
                "+971 52 613 3921",
                "+971 58 653 3921",
                "+971 52 693 3921",
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ContactLocation
              flagSrc={USAFlag}
              title="United States of America"
              location="Global Strategy Catalyst Group LLc 401 Ryland St, Suit 200-A, Reno, Nv. 89502"
              telNumbers={["+1412 403 3921"]}
            />
          </Grid>
        </Grid>
        <Grid
          container
          xs={12}
          sm={12}
          md={6}
          margin="auto"
          justifyContent="center"
          alignItems="center"
          sx={{ my: "4rem" }}
        >
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem",
              height: "100%",
            }}
          >
            <EmailIcon sx={{ mr: "0.5rem" }} />
            <Typography variant="h6">Support@roomyfinder.com</Typography>
            <a href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJqSwFHBbjKJvJXslnhdwMkshTnsxvFDJmGmxXBtqTsMBsfVJdjBBvvdbxNWxdHJcJLLNmg">
              <ForwardToInboxIcon sx={{ ml: "0.5rem" }} />
            </a>
          </Paper>
        </Grid>
        <Grid container justifyContent="center" sx={{ mb: "4rem" }}>
          <Grid item xs={12} sm={12} md={6} sx={{ mb: "1%" }}>
            <Paper sx={{ p: "2rem", height: "100%" }}>
              {" "}
              {/* Set a fixed height */}
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
                    backgroundColor: "orange",
                    color: "#fff",
                    borderRadius: "20px",
                    "&:hover": {
                      backgroundColor: "orange",
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
