import { Box, Button, Grid, Typography } from "@mui/material";
import CityCarousel2 from "../UI/CityCarousel2";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import topBackground from "../../assets/topBackground.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import UserImage from "../../assets/dummyUserImage.jpg";
import FemaleUserImage from "../../assets/dummyFemaleUserImage.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AddWithCarasol = (props) => {
  const navigate = useNavigate();
  const [roommates, setRoommates] = useState([]);

  const [currentRoommate, setCurrentRoommate] = useState(null);
  const countryCode = useSelector((state) => state.room.country);

  const handleOpenChat = () => {
    if (currentRoommate) {
      navigate(`/directchat/${currentRoommate.poster.id}`, {
        state: { property: currentRoommate, type: currentRoommate.poster.type },
      });
    }
  };

  useEffect(() => {
    if (roommates.length > 0) {
      setCurrentRoommate(roommates[0]);
    }
  }, [roommates]);

  useEffect(() => {
    const fetchRoommates = async () => {
      try {
        const { data } = await axios.post(
          `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/roommate-ad/available`,
          { countryCode }
        );
        setRoommates(data);
      } catch (error) {
        console.error("Error fetching roommates:", error);
      }
    };
    fetchRoommates();
  }, [countryCode]);

  return (
    <Grid container>
      <Grid
        container
        spacing={1}
        sx={{
          mt: 1,
          py: 5,
          backgroundImage: `url(${topBackground})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          display: "flex",
          px: 5,
          pb: 5,
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{ textAlign: "center", color: "#fff" }}
            variant="h4"
            gutterBottom
          >
            Roommate looking for shared living in UAE
          </Typography>
          <Button
            variant="outlined"
            size="large"
            fullwidth
            sx={{
              boxShadow:
                "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;",
              backgroundColor: "orange",
              borderRadius: "15px",
              fontWeight: "700",
              width: "200px",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#fff",
                borderColor: "orange",
                color: "orange",
              },
            }}
            onClick={() => handleOpenChat()}
          >
            Chat!
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{
            mx: 5,
            display: "flex",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <Grid
            sx={{
              width: { md: "70%", xs: "100%", sm: "85%" },
            }}
          >
            <Slider
              autoplay={true}
              autoplaySpeed={10000}
              fade={true}
              dots={false}
              beforeChange={(currentSlide, nextSlide) =>
                setCurrentRoommate(roommates[nextSlide])
              }
            >
              {roommates.map((roommate, i) => (
                <Grid
                  sx={{
                    cursor: "pointer",
                    padding: "15px",
                  }}
                  key={i} // Added key prop to avoid warning
                >
                  <div
                    style={{
                      width: "100%",
                      position: "relative",
                      paddingBottom: "70%",
                      boxShadow: "7px 7px 7px rgba(0,0,0,0.5)",
                    }}
                  >
                    <img
                      src={
                        roommate.poster.profilePicture
                          ? roommate.poster.profilePicture
                          : roommate.poster.gender === "Male"
                          ? UserImage
                          : roommate.poster.gender === "Female"
                          ? FemaleUserImage
                          : roommate.poster.firstName
                      }
                      alt={roommate.poster.firstName}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </Grid>
              ))}
            </Slider>
          </Grid>
          {/* <CommercialCarousal /> */}
        </Grid>
      </Grid>

      <Box
        sx={{
          backgroundImage:
            "linear-gradient(to right, #43e97b 0%, #38f9d7 100%);",
          p: 3,
          width: "100%",
          maxWidth: "900px",
          mt: "-40px",
          marginX: "auto",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            backgroundImage:
              "linear-gradient(to right, #43e97b 0%, #38f9d7 100%);",
            // p: 3,
            width: "100%",
            maxWidth: "900px",
            mt: "-3%",
            ml:"9%"
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={12} md={3}>
              <img src={saudi} alt="as" />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1" gutterBottom>
                Find Your home in Saudi Arabia!
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <CityCarousel />
            </Grid>
          </Grid>
        </Box>
      {/* )} */}
    </Grid>
  );
};

export default AddWithCarasol;
