import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import CityCarousel2 from "../UI/CityCarousel2";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SingleCardCarousel from "./SingleCardCarousel";
import { useNavigate } from "react-router-dom";
import bottomBackground from "../../assets/bottomBackground.png";
import peoples from "../../assets/GCSCorosol/peoples.png";
import GSCimage from "../../assets/GCSCorosol/GSCimage.png";
import CommercialCarousal from "./CommercialCarousal";
import topBackground from "../../assets/topBackground.png"
import saudi from "../../assets/newfile/saudi_png-665719.png"
import CityCarousel from "../../components/UI/newGreenCityCarousel"

const AddWithCarasol = (props) => {
  const navigate = useNavigate();

  return (
    <Grid container >
      <Grid
        container
        spacing={1}
        sx={{
          mt:1,
          py: 5,
          backgroundImage:`url(${topBackground})`,
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
            sx={{ textAlign: "center", color: "#fff" }}
            variant="h4"
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
              width:"200px",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#fff",
                borderColor: "orange",
                color: "orange",
              },
            }}
            onClick={() => navigate("/chat")}
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
            mx: 5,
            display: "flex",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <CommercialCarousal />
        </Grid>
      </Grid>

      {/* {props.smallcard && ( */}
        <Box
          sx={{
            backgroundImage:
              "linear-gradient(to right, #43e97b 0%, #38f9d7 100%);",
            // p: 3,
            width: "100%",
            maxWidth: "900px",
            mt: "-3%",
            ml:"9%"
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={12} md={3}>
              <img src={saudi} alt="as" />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1" gutterBottom>
                Find Your home in Saudi Arabia!
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <CityCarousel />
            </Grid>
          </Grid>
        </Box>
      {/* )} */}
    </Grid>
  );
};

export default AddWithCarasol;
