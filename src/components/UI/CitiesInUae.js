import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  NavigateNext as CustomNextIcon,
  NavigateBefore as CustomPrevIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { SearchActions } from "../../store/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AbuDhabi from "../../assets/city/AbuDhabi.jpg";
import Ajman from "../../assets/city/Ajman.jpg";
import Dubai from "../../assets/city/Dubai.jpg";
import RasAlKima from "../../assets/city/RasAlKima.jpg";
import Sharjah from "../../assets/city/Sharjah.jpg";
import UmmAlQuwain from "../../assets/city/UmmAlQuwain.jpg";
import Riyadh from "../../assets/city/Riyadh.jpg";

const UAEitems = [
  { id: 1, image: AbuDhabi, name: "Abu Dhabi", products: "130" },
  { id: 2, image: Ajman, name: "Ajman", products: "100" },
  { id: 3, image: Dubai, name: "Dubai", products: "1200" },
  { id: 5, image: RasAlKima, name: "Ras Al Kima", products: "52" },
  { id: 6, image: Sharjah, name: "Sharjah", products: "142" },
  { id: 7, image: UmmAlQuwain, name: "Umm Al Quwain", products: "320" },
];

const SAitems = [{ id: 8, image: Riyadh, name: "Riyadh", products: "0" }];

const CitiesInUae = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countryCode = useSelector((state) => state.room.country);
  const [items, setItems] = useState([]);

  const citiesInUae = async (item) => {
    const { data } = await axios.post(
      `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/property-ad/available`,
      { countryCode, city: item.name }
    );
    dispatch(SearchActions.availableRooms(data));
    navigate("/sp");
  };

  useEffect(() => {
    if (countryCode === "AE") {
      setItems(UAEitems);
    } else if (countryCode === "SA") {
      setItems(SAitems);
    }
  }, [countryCode]);

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
    infinite: countryCode === "AE" ? true : false,
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
          slidesToShow: 1.5,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Grid maxWidth={"90%"} sx={{ margin: "auto" }}>
      <Typography
        variant="h5"
        sx={{
          mb: 1,
          pl: { md: 3, sm: 2, xs: 1 },
          color: "purple",
          fontWeight: "600",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        Find room for rent in {countryCode === "AE" ? "UAE" : "Saudi"}
      </Typography>
      <Typography
        sx={{
          mb: 1,
          pl: { md: 3, sm: 2, xs: 1 },
          fontWeight: "500",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        Browse through thousands of room listings across different areas in{" "}
        {countryCode === "AE" ? "UAE" : "Saudi"}
      </Typography>
      <div style={{ position: "relative" }}>
        <Slider {...settings}>
          {items.map((item) => (
            <Grid
              key={item.id}
              sx={{ padding: "15px" }}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <Grid
                sx={{
                  boxShadow: "0px 0px 7px rgba(0,0,0,0.5)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => citiesInUae(item)}
              >
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      minHeight: "200px",
                      maxHeight: "300px",
                    }}
                  />
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    cursor: "pointer",
                    marginLeft: "0.5rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "700",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.products} properties
                  </Typography>
                </div>
              </Grid>
            </Grid>
          ))}
        </Slider>
      </div>
    </Grid>
  );
};

export default CitiesInUae;
