import React from "react";
import { Box, Grid, Toolbar, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import FooterMobile from "../assets/footerMobile.png";
import AppStore from "../assets/AppStore.png";
import GooglePlay from "../assets/GooglePlay.png";
import { footerSections } from "../utils/FooterData";
import { useDispatch } from "react-redux";
import { SearchActions } from "../store/Search";
import axios from "axios";
import landlord from "../assets/Agreements/landlord_agreement_roomy_finder.pdf";
import privacy from "../assets/Agreements/privacy_policy_roomy_findner.pdf";
import terms from "../assets/Agreements/t&c_roomy_finder.pdf";

const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleFooterSubLink = (item, link) => {
    if (item === "Find Room") {
      getPartitionRoomData();
      navigate("/sp");
    }
    if (item === "Find Roommate") {
      getRoommatesData();
      navigate("/sp");
    }
    if (item === "Privacy Policy") {
      console.log(item);
      window.open(privacy);
    }
    if (item === "Terms and Conditions") {
      window.open(terms);
    }
    if (item === "Landlord Agreement") {
      window.open(landlord);
    }
  };

  const getRoommatesData = async () => {
    try {
      const { data } = await axios.post(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/roommate-ad/available`,
        { countryCode: "AE" }
      );
      dispatch(SearchActions.availableRooms(data));
    } catch (err) {
      console.log(err);
    }
  };
  const getPartitionRoomData = async () => {
    try {
      const { data } = await axios.post(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/property-ad/available`,
        { countryCode: "AE" }
      );
      dispatch(SearchActions.availableRooms(data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid sx={{ display: "block", overflowX: "hidden" }}>
      <Toolbar
        sx={{
          display: "flex",
          paddingY: "3%",
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
                    <Box
                      key={`${section.title}-${index}`}
                      onClick={() =>
                        section.links &&
                        handleFooterSubLink(item, section.links[index])
                      }
                      sx={{
                        cursor: section.items !== "Contact Us" ? "pointer" : "",
                      }}
                    >
                      <Typography variant="subtitle2" sx={itemStyles}>
                        {item}
                      </Typography>
                    </Box>
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
