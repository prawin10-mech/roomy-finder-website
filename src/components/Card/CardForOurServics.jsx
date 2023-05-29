import {
  Box,
  Button,
  Grid,
  Typography,
  Container,
  Stack,
  Paper,
} from "@mui/material";
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

const AddWithCarasol = (props) => {
  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid
        container
        spacing={2}
        sx={{
          py: 3,
          backgroundImage: `url(${bottomBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
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
            sx={{
              boxShadow:
                "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;",
              backgroundColor: "orange",
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

      {props.smallcard && (
        <Box
          sx={{
            backgroundImage:
              "linear-gradient(to right, #43e97b 0%, #38f9d7 100%);",
            p: 3,
            width: "100%",
            maxWidth: "900px",
            mt: "-40px",
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
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom>
                Find Your home in Saudi Arabia!
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom>
                Find Your home in Saudi Arabia!
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <CityCarousel2 />
            </Grid>
          </Grid>
        </Box>
      )}
    </Grid>
  );
};

export default AddWithCarasol;
