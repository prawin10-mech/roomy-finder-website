import React from "react";
import { Grid, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  NavigateNext as CustomNextIcon,
  NavigateBefore as CustomPrevIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { SearchActions } from "../../store/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AbuDhabi from "../../assets/city/AbuDhabi.jpg";
import Ajman from "../../assets/city/Ajman.jpg";
import Dubai from "../../assets/city/Dubai.jpg";
import Jeddah from "../../assets/city/Jeddah.jpg";
import RasAlKima from "../../assets/city/RasAlKima.jpg";
import Sharjah from "../../assets/city/Sharjah.jpg";
import UmmAlQuwain from "../../assets/city/UmmAlQuwain.jpg";

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

const items = [
  { id: 1, image: AbuDhabi, name: "Abu Dhabi", products: "130" },
  { id: 2, image: Ajman, name: "Ajman", products: "100" },
  { id: 3, image: Dubai, name: "Dubai", products: "1200" },
  { id: 4, image: Jeddah, name: "Jeddah", products: "351" },
  { id: 5, image: RasAlKima, name: "Ras Al Kima", products: "52" },
  { id: 6, image: Sharjah, name: "Sharjah", products: "142" },
  { id: 7, image: UmmAlQuwain, name: "Umm Al Quwain", products: "320" },
];

const CitiesInUae = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    nextArrow: <CustomNextArrow />, // Add the custom arrow components here
    prevArrow: <CustomPrevArrow />, // Add the custom arrow components here
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Grid maxWidth={"96%"} sx={{ margin: "auto", overflow: "hidden" }}>
      <Typography
        variant="h5"
        sx={{
          mb: 1,
          pl: { md: 3, sm: 2, xs: 1 },
          color: "purple",
          fontWeight: "600",
        }}
      >
        Find room for rent in UAE
      </Typography>
      <Typography
        sx={{
          mb: 1,
          pl: { md: 3, sm: 2, xs: 1 },
          fontWeight: "500",
        }}
      >
        Browse through thousands of room listings across different areas in UAE
      </Typography>
      <div style={{ position: "relative" }}>
        <Slider {...settings}>
          {items.map((item) => (
            <Grid key={item.id} sx={{ padding: "15px" }}>
              <div style={{ borderRadius: "10px", overflow: "hidden" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div
                style={{ marginTop: "10px", cursor: "pointer" }}
                onClick={() => citiesInUae(item)}
              >
                <Typography sx={{ fontWeight: "700" }}>{item.name}</Typography>
                <Typography sx={{ fontWeight: "400" }}>
                  {item.products} properties
                </Typography>
              </div>
            </Grid>
          ))}
        </Slider>
        {/* <CustomPrevArrow />
        <CustomNextArrow /> */}
      </div>
    </Grid>
  );
};

export default CitiesInUae;
