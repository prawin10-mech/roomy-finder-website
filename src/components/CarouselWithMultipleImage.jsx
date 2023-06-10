import React from "react";
import { Grid, Typography, Box } from "@mui/material";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { SearchActions } from "../store/Search";

import DummyImage from "../assets/demo.jpg";
import { useNavigate } from "react-router-dom";
import {
  NavigateNext as CustomNextIcon,
  NavigateBefore as CustomPrevIcon,
} from "@mui/icons-material";

const CarouselWithMultipleImage = ({ propertyAddAvilableRoom }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(propertyAddAvilableRoom);

  const citiesInUae = async (item) => {
    const { data } = await axios.post(
      `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/property-ad/available`,
      { countryCode: "AE", city: item.name }
    );
    console.log(data);
    dispatch(SearchActions.availableRooms(data));
    navigate("/sp");
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <CustomNextIcon
        style={{
          fontSize: 40,
          position: "absolute",
          right: -45,
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
        }}
        onClick={onClick}
      />
    );
  };

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <CustomPrevIcon
        style={{
          fontSize: 40,
          position: "absolute",
          left: -45,
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Grid maxWidth={"90%"} sx={{ margin: "auto" }}>
      <div style={{ position: "relative" }}>
        <Slider {...settings}>
          {propertyAddAvilableRoom?.map((item) => (
            <Grid key={item.id} sx={{ padding: "15px" }}>
              {console.log(item)}
              <div
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  width: "100%",
                  position: "relative",
                  paddingBottom: "75%", // Maintain 4:3 aspect ratio
                }}
              >
                {item.images.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    {item.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "10px",
                          marginLeft: index !== 0 ? "10px" : 0,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <img
                    src={DummyImage}
                    alt={item.name}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                )}
              </div>
              <div
                style={{ marginTop: "10px", cursor: "pointer" }}
                onClick={() => citiesInUae(item)}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                  onClick={() => navigate(`/rooms/view-room/${item?.id}`)}
                >
                  <Typography fontWeight={400}>{item.type}</Typography>
                  <Typography fontWeight={700}>
                    {item.monthlyPrice + 0.1 * item.monthlyPrice} AED / month
                  </Typography>
                </Box>
              </div>
            </Grid>
          ))}
        </Slider>
      </div>
    </Grid>
  );
};

export default CarouselWithMultipleImage;
