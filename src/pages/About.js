import React from "react";
import { Grid, Box, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TopBackground from "../components/postPropertyComponents/TopBackground";
import BottomBackground from "../components/postPropertyComponents/BottomBackground";
import {
  PrivacyTip,
  VerifiedUser,
  QuestionAnswer,
  SupportAgent,
  Handshake,
} from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import dummy from "../assets/Agreements/dummy.pdf";
import FAQ from "../assets/Agreements/FAQ_ROOMY_FINDER.pdf";
import landlord from "../assets/Agreements/landlord_agreement_roomy_finder.pdf";
import privacy from "../assets/Agreements/privacy_policy_roomy_findner.pdf";
import terms from "../assets/Agreements/t&c_roomy_finder.pdf";
import logo from "../assets/logo.png";

const About = () => {
  const navigate = useNavigate();

  const openPdf = (pdfUrl) => {
    window.open(pdfUrl);
  };

  return (
    <>
      <TopBackground />
      <Grid sx={{ margin: "auto" }}>
        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            mb={3}
          >
            <Grid item>
              <Typography variant="h5" fontWeight={700}>
                About
              </Typography>
            </Grid>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                my: 2,
              }}
            >
              <Grid item sx={{ display: "flex" }}>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    overflow: "hidden",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <img
                    src={logo}
                    alt={`roomy finder logo`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Grid>

              <Grid container justifyContent={"center"}>
                <Typography
                  sx={{
                    color: "purple",
                    marginRight: "8px",
                    fontWeight: "600",
                  }}
                >
                  Roomy
                </Typography>{" "}
                <Typography sx={{ color: "orange", fontWeight: "600" }}>
                  FINDER
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ width: "100%", maxWidth: "70%" }}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#f0ecf6",
                borderRadius: "15px",
                mb: 2,
                padding: "10px",
                cursor: "pointer",
              }}
              onClick={() => openPdf(privacy)}
            >
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "grey",
                    mr: 2,
                  }}
                >
                  <PrivacyTip />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>Privacy policy</Typography>
                </Box>
              </Box>
              <Box>
                <ChevronRightIcon
                  sx={{
                    height: "20px",
                    width: "20px",
                    color: "#000",
                    cursor: "pointer",
                    mr: "10px",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ width: "100%", maxWidth: "70%" }}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#f0ecf6",
                borderRadius: "15px",
                mb: 2,
                padding: "10px",
                cursor: "pointer",
              }}
              onClick={() => openPdf(terms)}
            >
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "grey",
                    mr: 2,
                  }}
                >
                  <VerifiedUser />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>Terms and conditions</Typography>
                </Box>
              </Box>
              <Box>
                <ChevronRightIcon
                  sx={{
                    height: "20px",
                    width: "20px",
                    color: "#000",
                    cursor: "pointer",
                    mr: "10px",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ width: "100%", maxWidth: "70%" }}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#f0ecf6",
                borderRadius: "15px",
                mb: 2,
                padding: "10px",
                cursor: "pointer",
              }}
              onClick={() => openPdf(FAQ)}
            >
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "grey",
                    mr: 2,
                  }}
                >
                  <QuestionAnswer />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>FAQ</Typography>
                </Box>
              </Box>
              <Box>
                <ChevronRightIcon
                  sx={{
                    height: "20px",
                    width: "20px",
                    color: "#000",
                    cursor: "pointer",
                    mr: "10px",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ width: "100%", maxWidth: "70%" }}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#f0ecf6",
                borderRadius: "15px",
                cursor: "pointer",
                mb: 2,
                padding: "10px",
              }}
              onClick={() => navigate("/contactUs")}
            >
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "grey",
                    mr: 2,
                  }}
                >
                  <SupportAgent />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>Contact us</Typography>
                </Box>
              </Box>
              <Box>
                <ChevronRightIcon
                  sx={{
                    height: "20px",
                    width: "20px",
                    color: "#000",
                    cursor: "pointer",
                    mr: "10px",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ width: "100%", maxWidth: "70%" }}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#f0ecf6",
                borderRadius: "15px",
                cursor: "pointer",
                mb: 2,
                padding: "10px",
              }}
              onClick={() => openPdf(landlord)}
            >
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "grey",
                    mr: 2,
                  }}
                >
                  <Handshake />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>Landlord Agreement</Typography>
                </Box>
              </Box>
              <Box>
                <ChevronRightIcon
                  sx={{
                    height: "20px",
                    width: "20px",
                    color: "#000",
                    cursor: "pointer",
                    mr: "10px",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <BottomBackground />
    </>
  );
};

export default About;
