import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import UserImage from "../../assets/dummyUserImage.jpg";
import FemaleUserImage from "../../assets/dummyFemaleUserImage.jpg";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CommercialCarousal = ({ openRoommateChat }) => {
  const [roommates, setRoommates] = useState([]);
  const countryCode = useSelector((state) => state.room.country);
  const navigate = useNavigate();

  const openChat = (property) => {
    navigate(`/directchat/${property.poster.id}`, {
      state: { property, type: property.poster.type },
    });
  };

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
    <Grid
      sx={{
        width: { md: "70%", xs: "100%", sm: "85%" },
      }}
    >
      <Slider autoplay={true} autoplaySpeed={10000} fade={true} dots={false}>
        {roommates.map((item, i) => (
          <Grid
            sx={{
              cursor: "pointer",
              padding: "15px",
            }}
            onClick={() => openRoommateChat(item)}
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
                  item.poster.profilePicture
                    ? item.poster.profilePicture
                    : item.poster.gender === "Male"
                    ? UserImage
                    : item.poster.gender === "Female"
                    ? FemaleUserImage
                    : item.poster.firstName
                }
                alt={item.poster.firstName}
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
  );
};

export default CommercialCarousal;
