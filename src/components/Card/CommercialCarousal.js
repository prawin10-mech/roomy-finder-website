import React from "react";
import { Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import peoples from "../../assets/GCSCorosol/peoples.png";
import GSCimage from "../../assets/GCSCorosol/GSCimage.png";

const images = [peoples, GSCimage];

const CommercialCarousal = (props) => {
  return (
    <Grid
      sx={{
        width: "100%",
        height: "100%",
        margin: "auto",
      }}
    >
      <Carousel>
        {images.map((item, i) => (
          <img
            src={item}
            alt={i}
            width="100%"
            style={{ borderRadius: "20px" }}
          />
        ))}
      </Carousel>
    </Grid>
  );
};

export default CommercialCarousal;
