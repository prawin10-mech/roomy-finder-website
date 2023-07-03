import React from "react";
import { Grid, useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import commercial1 from "../../assets/commercials/commercial1.jpg";
import commercial2 from "../../assets/commercials/commercial2.jpg";
import commercial3 from "../../assets/commercials/commercial3.jpg";

const images = [commercial1, commercial2, commercial3];

const CommercialCarousel = (props) => {
  const isSmallScreen = useMediaQuery("(max-width: 500px)");

  return (
    <Grid
      container
      sx={{
        width: "80%",
        height: "90%",
        margin: "auto",
        padding: isSmallScreen ? 0 : "16px",
      }}
    >
      <Grid item xs={12}>
        <Carousel autoPlay={true} indicators={true}>
          {images.map((item, i) => (
            <img
              key={i}
              src={item}
              alt={i}
              width="100%"
              height="200px"
              style={{
                borderRadius: isSmallScreen ? "10px" : "20px",
              }}
            />
          ))}
        </Carousel>
      </Grid>
    </Grid>
  );
};

export default CommercialCarousel;
