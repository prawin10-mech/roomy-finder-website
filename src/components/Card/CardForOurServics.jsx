import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import UserImage from "../../assets/dummyUserImage.jpg";
import FemaleUserImage from "../../assets/dummyFemaleUserImage.jpg";
import topBackground from "../../assets/topBackground.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CityCarousel from "../UI/CityCarousel2";
import SaudiRoommate from "../../assets/saudiRoommate.png";

const AddWithCarousel = (props) => {
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
            onClick={handleOpenChat}
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
                  key={i}
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
                          : UserImage
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
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: "-50px",
          marginX: "auto",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderRadius: "8px",
        }}
      >
      <Paper elevation={24}>

        <img src={SaudiRoommate} alt={"saudi roommate"} style={{}} />
      </Paper>
      </Box>
    </Grid>
  );
};

export default AddWithCarousel;
