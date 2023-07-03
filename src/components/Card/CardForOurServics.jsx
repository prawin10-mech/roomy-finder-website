import React, { useState, useEffect } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import UserImage from "../../assets/dummyUserImage.jpg";
import FemaleUserImage from "../../assets/dummyFemaleUserImage.jpg";
import topBackground from "../../assets/topBackground.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SaudiRoommate from "../../assets/saudiRoommate.png";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

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

  const viewRoommate = () => {
    navigate(`/roommate/view-roommate/${currentRoommate.id}`);
  };

  const handleNext = () => {
    slider.slickNext();
  };

  const handlePrev = () => {
    slider.slickPrev();
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

  const NextArrow = ({ onClick }) => {
    return (
      <IconButton
        className="next-button"
        onClick={onClick}
        sx={{
          position: "absolute",
          top: "50%",
          right: "15px",
          transform: "translateY(-60%)",
          zIndex: 1,
          "&:hover": {
            backgroundColor: "#7F7F7F",
          },
        }}
      >
        <ChevronRight />
      </IconButton>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <IconButton
        className="prev-button"
        onClick={onClick}
        sx={{
          position: "absolute",
          top: "50%",
          left: "15px",
          transform: "translateY(-60%)",
          zIndex: 1,
          "&:hover": {
            backgroundColor: "#7F7F7F",
          },
        }}
      >
        <ChevronLeft />
      </IconButton>
    );
  };

  let slider;

  return (
    <Grid container>
      <Grid
        container
        spacing={1}
        sx={{
          mt: 1,
          backgroundImage: `url(${topBackground})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          display: "flex",
          px: 5,
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
            sx={{
              textAlign: "center",
              color: "#fff",
              fontSize: { xs: "h6", sm: "h5", md: "h4" },
            }}
            variant={"h4"}
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
            display: "flex",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <Grid
            sx={{
              width: { md: "80%", xs: "100%", sm: "85%" },
              position: "relative",
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
              ref={(c) => (slider = c)}
              nextArrow={<NextArrow />}
              prevArrow={<PrevArrow />}
            >
              {roommates.map((roommate, i) => (
                <Grid
                  sx={{
                    cursor: "pointer",
                    padding: "15px",
                    maxHeight: "250px",
                    my: 4,
                  }}
                  key={i}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      position: "relative",
                      paddingBottom: "70%",
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
                        maxHeight: "200px",
                        objectFit: "cover",
                        borderRadius: "20px",
                        boxShadow: "0px 0px 15px rgba(0,0,0,0.9)",
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
          borderRadius: "25px",
          boxShadow: "0px 0px 15px  rgba(0,0,0,0.7)",
        }}
      >
        <img src={SaudiRoommate} alt={"saudi roommate"} />
      </Box>
    </Grid>
  );
};

export default AddWithCarousel;
