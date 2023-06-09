import React, { useState } from "react";
import { Grid, Typography, Paper, Box, Stack } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DummyImage from "../assets/demo.jpg";
import { useNavigate } from "react-router-dom";
import {
  NavigateNext as CustomNextIcon,
  NavigateBefore as CustomPrevIcon,
} from "@mui/icons-material";

const ImageCarousel1 = ({ images }) => {
  if (images.length === 0) images = [DummyImage];
  return (
    <Paper sx={{ height: "270px", borderRadius: "25px" }}>
      <Carousel
        autoplay
        showArrows={false}
        // renderIndicator={() => null}
        showThumbs={false}
      >
        {images.map((image, index) => (
          <Box key={index} sx={{ borderRadius: "15px", overflow: "hidden" }}>
            <img src={image} alt={`img ${index}`} style={{ height: "270px" }} />
          </Box>
        ))}
      </Carousel>
    </Paper>
  );
};

export const MultipleImages0 = ({ images }) => {
  const [numImages, setNumImages] = useState(4);

  const handleLoadMore = () => {
    setNumImages(numImages + 4);
  };
  return (
    <ImageCarousel1
      images={images.images.slice(0, numImages)}
      key={Math.random()}
    />
  );
};

const CarouselWithMultipleImage = (props) => {
  let imageSets = [];
  const navigate = useNavigate();
  if (props.PartitionAddAvilableRoom) {
    for (let i = 0; i < props.PartitionAddAvilableRoom.length; i += 4) {
      imageSets.push(props.PartitionAddAvilableRoom.slice(i, i + 4));
    }
  }
  if (props.propertyAddAvilableRoom) {
    for (let i = 0; i < props.propertyAddAvilableRoom.length; i += 4) {
      imageSets.push(props.propertyAddAvilableRoom.slice(i, i + 4));
    }
  }

  imageSets = imageSets.reverse();

  return (
    <Stack sx={{ p: 2, my: 2, mx: 1 }} spacing={2}>
      <Carousel
        showThumbs={false}
        showArrows={true}
        showStatus={false}
        emulateTouch={false}
        infiniteLoop={true}
        // renderArrowPrev={false}
        // renderArrowNext={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{
                position: "absolute",
                zIndex: 2,
                left: 15,
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <CustomPrevIcon style={{ fontSize: 40 }} />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{
                position: "absolute",
                zIndex: 2,
                right: 15,
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <CustomNextIcon style={{ fontSize: 40 }} />
            </button>
          )
        }
      >
        {imageSets.map((imageSet, index) => (
          <Grid
            key={index}
            // onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
          >
            <Grid container spacing={2}>
              {imageSet.map((value, id) =>
                Object.entries(value).map(([key, val]) => {
                  if (key === "images") {
                    if (val.length >= 0) {
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={3}
                          borderRadius=""
                          // onClick={() =>
                          //   navigate(`/rooms/view-room/${value?.id}`)
                          // }
                        >
                          <MultipleImages0 images={value} />
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "start",
                              flexDirection: "column",
                              alignItems: "start",
                            }}
                            onClick={() =>
                              navigate(`/rooms/view-room/${value?.id}`)
                            }
                          >
                            <Typography fontWeight={400}>
                              {value.type}
                            </Typography>
                            <Typography fontWeight={700}>
                              {value.monthlyPrice} AED / month
                            </Typography>
                          </Box>
                        </Grid>
                      );
                    }
                  }
                })
              )}
            </Grid>
          </Grid>
        ))}
      </Carousel>
    </Stack>
  );
};

export default CarouselWithMultipleImage;
