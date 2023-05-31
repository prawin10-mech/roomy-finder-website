import React from "react";
import { Box, Grid, Toolbar, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import FooterMobile from "../assets/footerMobile.png";
import AppStore from "../assets/AppStore.png";
import GooglePlay from "../assets/GooglePlay.png";
import { footerSections } from "../utils/FooterData";

const Footer = () => {
  const navigate = useNavigate();
  const sectionStyles = {
    fontWeight: "700",
    cursor: "pointer",
  };

  const itemStyles = {
    mt: 1,
  };

  const handleFooterClick = (title) => {
    console.log(title);
    if (title === "Contact Us") {
      navigate("/contactUs");
    }
    if (title === "About Us") {
      navigate("/aboutUs");
    }
    if (title === "Our Services") {
      navigate("/");
    }
  };

  return (
    <Grid sx={{ display: "block", overflowX: "hidden" }}>
      <Toolbar
        sx={{
          display: "flex",
          paddingY: "1.75%",
          width: { xs: "50%", sm: "80%", md: "100%" },
          paddingRight: { xs: 0, sm: "150px" }, // Added paddingRight for image space
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Grid
            spacing={2}
            sx={{
              display: "flex",
              mt: 2,
            }}
          >
            <Grid item sx={{ display: "flex", mr: 2 }}>
              <NavLink to={"/"}>
                <img src={logo} alt="Roomy finder logo" width={70} />
              </NavLink>
            </Grid>
            <Grid item>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bolder", color: "purple" }}
                >
                  Roomy
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bolder", color: "orange" }}
                >
                  FINDER
                </Typography>
              </Box>
            </Grid>
          </Grid>
          {footerSections.map((section) => (
            <Grid item key={section.title}>
              <Box>
                <Typography
                  variant="h6"
                  sx={sectionStyles}
                  onClick={() => handleFooterClick(section.title)}
                >
                  {section.title}
                </Typography>
                <Box>
                  {section.items.map((item, index) => (
                    <Typography
                      key={`${section.title}-${index}`}
                      variant="subtitle2"
                      sx={itemStyles}
                    >
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Grid>
          ))}
          <Grid item xs={12} sm={3}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h6" sx={sectionStyles}>
                Get the app
              </Typography>
              <Box>
                <Box
                  item
                  onClick={() => navigate("/")}
                  sx={{ cursor: "pointer" }}
                >
                  <img src={AppStore} alt="App Store" width={120} />
                </Box>
                <Box item>
                  <img
                    src={GooglePlay}
                    alt="Google Play"
                    width={120}
                    onClick={() => navigate("/")}
                    style={{ cursor: "pointer" }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
      <Grid>
        <Box
          sx={{
            backgroundColor: "#FAFAFA",
            //backgroundImage: `
            // linear-gradient(
            //   90deg,
            //   rgba(128, 0, 128, 1) 0%,
            //   rgba(160, 32, 160, 1) 25%,
            //   rgba(192, 64, 192, 1) 50%,
            //   rgba(224, 96, 224, 1) 75%,
            //   rgba(255, 128, 255, 1) 100%
            // )`,
            backgroundImage:
              "linear-gradient(90deg, rgba(0,1,36,1) 0%, rgba(73,9,121,1) 35%, rgba(192,0,255,1) 100%);",
            color: "#fff",
            height: "20px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "relative",
              height: "100%",
              //display: { xs: "none", sm: "block" },
              display: "block",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            >
              <img
                src={FooterMobile}
                alt="Footer mobile"
                width="65%"
                style={{ maxWidth: "100%" }}
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Footer;
