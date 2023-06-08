import React, { useState, useEffect } from "react";
import { cities } from "../../helper";
import UAE from "../../assets/cityCarousel/dubai.jpg";
import USA from "../../assets/cityCarousel/usa.jpg";
import Saudi from "../../assets/cityCarousel/saudi.jpg";
import India from "../../assets/cityCarousel/india.jpg";
import Egypt from "../../assets/cityCarousel/egypt.jpg";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { NavLink } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";

const CityCarousel = () => {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [carouselCities, setCarouselCities] = useState([]);

  useEffect(() => {
    const updateCarouselCities = () => {
      const slicedCities = cities.slice(currentCityIndex, currentCityIndex + 5);
      const remainingCities = cities.slice(0, 5 - slicedCities.length);
      setCarouselCities(slicedCities.concat(remainingCities));
    };

    updateCarouselCities();
  }, [currentCityIndex]);

  console.log(carouselCities);

  const handlePrevClick = () => {
    const newIndex =
      currentCityIndex === 0 ? cities.length - 1 : currentCityIndex - 1;
    setCurrentCityIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex =
      currentCityIndex === cities.length - 1 ? 0 : currentCityIndex + 1;
    setCurrentCityIndex(newIndex);
  };

  const renderCityImage = (city, imageSrc, altText, isActive, index) => {
    let scale = 1;
    let zIndex = 0;
    let showCityName = true;
    let boxShadow = "none";
    let textAlign = "center";

    if (index === 1) {
      textAlign = "left";
    }

    if (index === 3) {
      textAlign = "right";
    }

    if (isActive) {
      scale = 2;
      zIndex = 1;
      boxShadow =
        "12px 0 15px -4px rgba(0, 0, 0, 0.8), -12px 0 8px -4px rgba(0, 0, 0, 0.8";
    } else if (Math.abs(index - 2) === 1) {
      scale = 1.8;
      zIndex = -10;
      boxShadow =
        "12px 0 15px -4px rgba(0, 0, 0, 0.8), -12px 0 8px -4px rgba(0, 0, 0, 0.8";
    } else if (index === 0) {
      scale = 1.6;
      zIndex = -55;
      showCityName = false;
    } else if (index === 4) {
      scale = 1.6;
      zIndex = -55;
      showCityName = false;
      textAlign = "right";
    }

    const position =
      index === 0 || index === 4 || index === 1 || index === 3
        ? "relative"
        : "static";
    const overlap = index === 0 || index === 4 ? "0px" : "auto";

    const cityNameStyles = {
      position: "relative",
      color: "white",
      textAlign: textAlign,
      left: "0",
      right: "0",
      // bottom: "30px",
      textShadow: "6px 6px 5px black",
    };

    return (
      <Grid item xs={12}>
        <NavLink to="/sp">
          <img
            src={imageSrc}
            alt={altText}
            style={{
              objectFit: "cover",
              margin: "auto",
              borderRadius: "10px",
              transform: `scale(${scale})`,
              position: position,
              zIndex: zIndex,
              marginLeft: overlap,
              marginRight: overlap,
              maxWidth: "100%",
              maxHeight: "100%",
              boxShadow: boxShadow,
            }}
          />
        </NavLink>
        {showCityName ? (
          <Box sx={cityNameStyles}>
            <Typography
              sx={{
                fontWeight: { xs: "None", sm: "bold" },
                fontSize: { xs: "None", sm: "1.3rem" },
              }}
            >
              {city}
            </Typography>
          </Box>
        ) : (
          <Box sx={cityNameStyles}>
            <Typography
              sx={{
                visibility: "hidden",
                fontWeight: { xs: "None", sm: "bold" },
                fontSize: { xs: "None", sm: "1.3rem" },
              }}
            >
              {city}
            </Typography>
          </Box>
        )}
      </Grid>
    );
  };

  const cityImages = [
    { city: "USA", imageSrc: USA, altText: "USA" },
    { city: "UAE", imageSrc: UAE, altText: "UAE" },
    { city: "Saudi", imageSrc: Saudi, altText: "Saudi" },
    { city: "India", imageSrc: India, altText: "India" },
    { city: "Egypt", imageSrc: Egypt, altText: "Egypt" },
  ];

  const carouselItems = carouselCities.map((city, index) => {
    const isActive = index === 2;

    let styles = isActive
      ? {
          minHeight: "45vh",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }
      : {
          margin: "auto",
          borderRadius: "10px",
        };

    if (isActive) {
      styles = {
        ...styles,
        position: "relative",
        zIndex: 1,
      };
    } else if (Math.abs(index - 2) === 1) {
      styles = {
        ...styles,
        scale: 1.8,
        zIndex: 0.2,
      };
    } else if (index === 0 || index === 4) {
      styles = {
        ...styles,
        scale: 1.6,
        zIndex: -30,
      };
    }

    const { imageSrc, altText } = cityImages.find((item) => {
      console.log(item.city, city);
      return item.city === city;
    });

    return (
      <Box
        key={city}
        sx={{
          ...styles,
          width: "100%",
        }}
      >
        {renderCityImage(city, imageSrc, altText, isActive, index)}
      </Box>
    );
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: "20px",
        margin: "auto", // Center the carousel container
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "10%",
        }}
      >
        <ChevronLeftIcon
          sx={{
            height: "50px",
            width: "50px",
            color: "slategray",
            cursor: "pointer",
          }}
          onClick={handlePrevClick}
        />
      </Box>
      <Box sx={{ display: "flex", width: "80%", maxWidth: "80%" }}>
        {carouselItems}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "10%",
        }}
      >
        <ChevronRightIcon
          sx={{
            height: "50px",
            width: "50px",
            color: "gray",
            cursor: "pointer",
          }}
          onClick={handleNextClick}
        />
      </Box>
    </Box>
  );
};

export default CityCarousel;
