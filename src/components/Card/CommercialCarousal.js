import React from "react";
import { Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import commercial1 from "../../assets/commercials/commercial1.jpg";
import commercial2 from "../../assets/commercials/commercial2.jpg";
import commercial3 from "../../assets/commercials/commercial3.jpg";

const images = [commercial1, commercial2, commercial3];

const CommercialCarousal = (props) => {
  return (
    <Grid
      sx={{
        width: "80%",
        height: "90%",
        margin: "auto",
      }}
    >
      <Carousel>
        {images.map((item, i) => (
          <img
            src={item}
            alt={i}
            width="100%"
            height="200px"
            style={{ borderRadius: "20px" }}
          />
        ))}
      </Carousel>
    </Grid>
  );
};

export default CommercialCarousal;
