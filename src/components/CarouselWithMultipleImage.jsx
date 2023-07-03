import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SearchActions } from "../store/Search";
import DummyImage from "../assets/demo.jpg";
import { useNavigate } from "react-router-dom";
import {
  NavigateNext as CustomNextIcon,
  NavigateBefore as CustomPrevIcon,
} from "@mui/icons-material";

const CarouselWithMultipleImage = ({ propertyAddAvilableRoom, heading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countryCode = useSelector((state) => state.room.country);

  const citiesInUae = async (item) => {
    const { data } = await axios.post(
      `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/property-ad/available`,
      { countryCode: "AE", city: item.name }
    );
    dispatch(SearchActions.availableRooms(data));
    // navigate("/sp");
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
      {heading && (
        <Typography
          variant="h5"
          sx={{
            mb: 1,
            pl: { md: 3, sm: 2, xs: 1 },
            color: "purple",
            fontWeight: "600",
          }}
        >
          Top affordable sharing option in{" "}
          {countryCode === "AE" ? "UAE" : "Saudi"}
        </Typography>
      )}
      <div style={{ position: "relative" }}>
        <Slider {...settings}>
          {propertyAddAvilableRoom?.map((item) => (
            <Grid sx={{ padding: "15px" }} key={item.id}>
              <Grid
                sx={{
                  boxShadow: "0px 0px 7px rgba(0,0,0,0.5)",
                  borderRadius: "15px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/rooms/view-room/${item?.id}`)}
              >
                <div
                  style={{
                    overflow: "hidden",
                    width: "100%",
                    position: "relative",
                    paddingBottom: "70%",
                  }}
                >
                  {item.images.length > 0 ? (
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "15px", // Apply border radius
                      }}
                    />
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
                        borderRadius: "10px", // Apply border radius
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
                      ml: 1,
                    }}
                  >
                    <Typography fontWeight={400} sx={{ whiteSpace: "nowrap" }}>
                      {item.type}
                    </Typography>
                    <Typography fontWeight={400} sx={{ whiteSpace: "nowrap" }}>
                      {item.address.location + ", " + item.address.city}
                    </Typography>
                    <Typography fontWeight={700} sx={{ whiteSpace: "nowrap" }}>
                      {item.preferedRentType === "Monthly" &&
                        item.monthlyPrice + 0.1 * item.monthlyPrice + " AED"}
                      {item.preferedRentType === "Weekly" &&
                        item.weeklyPrice + 0.1 * item.weeklyPrice + " AED"}
                      {item.preferedRentType === "Daily" &&
                        item.dailyPrice + 0.05 * item.dailyPrice + " AED"}
                    </Typography>
                  </Box>
                </div>
              </Grid>
            </Grid>
          ))}
        </Slider>
      </div>
    </Grid>
  );
};

export default CarouselWithMultipleImage;
