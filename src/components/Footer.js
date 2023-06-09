import React from "react";
import { Box, Grid, Toolbar, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import FooterMobile from "../assets/footerNewMobile.png";
import { footerSections } from "../utils/FooterData";
import { useDispatch } from "react-redux";
import { SearchActions } from "../store/Search";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import landlord from "../assets/Agreements/landlord_agreement_roomy_finder.pdf";
import privacy from "../assets/Agreements/privacy_policy_roomy_findner.pdf";
import terms from "../assets/Agreements/t&c_roomy_finder.pdf";
import appstore3 from "../assets/store/apple.jpg";
import googleplaystore3 from "../assets/store/googleStore.jpg";
import haw from "../assets/store/haw.jpg";
import ms from "../assets/store/ms.jpg";
import bottomBackground from "../assets/bottomBackground.png";

import fb from "../assets/socialmedia/fb2.jpeg";
import instragram from "../assets/socialmedia/instra3.jpeg";
import twiter from "../assets/socialmedia/twiter.png";
import snapchat from "../assets/socialmedia/snapchat4.jpg";
import ticktok from "../assets/socialmedia/tiktok2.png";

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
    if (title === "Contact Us") {
      navigate("/contactUs");
    }
    if (title === "About Us") {
      navigate("/aboutUs");
    }
    if (title === "Our Services") {
      navigate("/");
    }
    if (title === "Blog") {
      navigate("/blogs");
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
    if (item === "Blog") {
      navigate("/blogs");
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
    <Grid sx={{ display: "block", overflowX: "hidden", pt: "6px", my: 2 }}>
      <Toolbar
        sx={{
          display: "flex",
          paddingY: "1.75%",
          width: { xs: "50%", sm: "80%", md: "100%" },
          paddingRight: { xs: 0, sm: "150px" },
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
            <>
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
                          cursor:
                            section.items !== "Contact Us" ? "pointer" : "",
                        }}
                      >
                        <Typography variant="subtitle2" sx={itemStyles}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={sectionStyles}
                    onClick={() => navigate("/blogs")}
                  >
                    {section.title2}
                  </Typography>
                </Box>
              </Grid>
            </>
          ))}
          <Grid item xs={12} sm={3} sx={{ zIndex: 1 }}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h6" sx={sectionStyles}>
                Get the app
              </Typography>
              <Box>
                <Box
                  item
                  onClick={() => navigate("/")}
                  sx={{ cursor: "pointer", my: 1 }}
                >
                  <Tooltip title="Coming Soon">
                    <img src={appstore3} alt="App Store" width={120} />
                  </Tooltip>
                </Box>
                <Box item sx={{ cursor: "pointer", zIndex: 16000 }}>
                  <a href="https://play.google.com/store/apps/details?id=com.gsccapitalgroup.roomy_finder">
                    <img src={googleplaystore3} alt="Google Play" width={120} />
                  </a>
                </Box>
                <Box
                  item
                  onClick={() => navigate("/")}
                  sx={{ cursor: "pointer", my: 1 }}
                >
                  <Tooltip title="Coming Soon">
                    <img src={haw} alt="App Store" width={120} />
                  </Tooltip>
                </Box>
                <Box
                  item
                  onClick={() => navigate("/")}
                  sx={{ cursor: "pointer", my: 1 }}
                >
                  <Tooltip title="Coming Soon">
                    <img src={ms} alt="App Store" width={120} />
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            sx={{
              // mb: { xs: "-20%" },
              display: "flex",
              flexDirection: "row",
              position: "relative",
              bottom: 0,
              left: 0,
              // mb: { xs: "-50px", md: "14px" },
            }}
          >
            <a href="https://www.facebook.com/profile.php?id=100090096130709&mibextid=LQQJ4d">
              <img
                src={fb}
                alt="Facebook"
                style={{
                  height: "40px",
                  width: "40px",
                  marginLeft: "8px",
                  marginRight: "8px",
                }}
              />
            </a>
            <a href="https://instagram.com/roomyfinder?igshid=NTc4MTIwNjQ2YQ==">
              <img
                src={instragram}
                alt="Instragram"
                style={{
                  height: "40px",
                  width: "40px",
                  marginLeft: "8px",
                  marginRight: "8px",
                }}
              />
            </a>
            <Tooltip title="Coming Soon">
              <a href="#">
                <img
                  src={twiter}
                  alt="Footer mobile"
                  style={{
                    height: "40px",
                    width: "40px",
                    marginLeft: "8px",
                    marginRight: "8px",
                  }}
                />
              </a>
            </Tooltip>
            <a href="https://www.snapchat.com/add/roomyfinder?share_id=ekhRZEdSMng&locale=en-US">
              <img
                src={snapchat}
                alt="Footer mobile"
                style={{
                  height: "40px",
                  width: "40px",
                  marginLeft: "8px",
                  marginRight: "8px",
                }}
              />
            </a>

            <a href="https://www.tiktok.com/@roomyfinder?_t=8d8KPKPRRs9&_r=1">
              <img
                src={ticktok}
                alt="Footer mobile"
                style={{
                  height: "40px",
                  width: "40px",
                  marginLeft: "8px",
                  marginRight: "8px",
                }}
              />
            </a>
          </Grid>
        </Grid>
      </Toolbar>
      <Grid>
        <Box
          sx={{
            pt: 0,
            backgroundImage: `url(${bottomBackground})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            display: "flex",
            px: 5,
          }}
        >
          <Box
            sx={{
              pt: 1,
              position: "relative",
              mt: { md: 9 },
              // mb:4,
              height: "100%",
              display: "block",
              width: "100%",
            }}
          >
            <Box
              sx={{
                mt: "4px",
                // py:3,
                display: "flex",
                justifyContent: "flex-end",
                position: "absolute",
                bottom: "48px",
                right: 0,
                // height:"100%"
                // pt:"20%"
              }}
            >
              <img
                src={FooterMobile}
                alt="Footer mobile"
                width="60%"
                height="95%"
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
