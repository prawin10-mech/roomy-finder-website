import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import TopBackground from "../components/postPropertyComponents/TopBackground";
import BottomBackground from "../components/postPropertyComponents/BottomBackground";
import Cookies from "js-cookie";
import axios from "axios";
import DummyImage from "../assets/demo.jpg";
import { useNavigate } from "react-router-dom";

const MyAds = () => {
  const type = JSON.parse(Cookies.get("user")).type;
  const token = localStorage.getItem("token");
  const [myAds, setMyAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noOfCount, setnoOfCount] = useState(8);
  const navigate = useNavigate();

  const fetchMyAds = async () => {
    try {
      setIsLoading(true);
      const searchType = type === "landlord" ? "property" : "roommate";
      try {
        const { data } = await axios.get(
          `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/${searchType}-ad/my-ads`,
          { headers: { Authorization: token } }
        );
        setMyAds(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(myAds);

  const myAdsData =
    type === "landlord"
      ? myAds
          ?.slice(0, noOfCount)
          .reverse()
          .map((myAd) => (
            <Grid
              key={myAd._id}
              item
              // xs={12}
              // sm={6}
              // md={3}
              sx={{
                display: "grid",
                cursor: "pointer",
                p: 2,
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px",
                "@media (max-width: 600px)": {
                  gridTemplateColumns: "1fr",
                },
              }}
              // sx={{ cursor: "pointer", p: 2 }}
            >
              <Grid
                sx={{
                  width: "300px",
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    height: "200px",
                    padding: "10px",
                    overflow: "hidden",
                    borderRadius: "20px ",
                    objectFit: "cover",
                  }}
                  image={myAd.images.length > 0 ? myAd.images[0] : [DummyImage]}
                  alt={myAd?.id}
                />
                <Grid
                  container
                  justifyContent={"space-between"}
                  sx={{ padding: "10px" }}
                >
                  <Grid>
                    <Typography variant="subtitle1">
                      <Typography component="span">{myAd.type}</Typography>
                    </Typography>
                    <Typography variant="subtitle1">
                      <Typography component="span">
                        {myAd.address.location}
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid sx={{ fontWeight: "900" }}>
                    AED {myAd.monthlyPrice + 0.1 * myAd.monthlyPrice}
                  </Grid>
                  <hr style={{ borderTop: "1px solid #000", width: "100%" }} />
                </Grid>

                <Grid
                  container
                  gap={2}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Grid sx={{ color: "purple", pl: 1 }}>
                    Available {myAd.quantity}
                  </Grid>
                  <Grid sx={{ color: "orange" }}>
                    {" "}
                    Taken {myAd.quantityTaken}
                  </Grid>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "orange",
                      color: "white",

                      borderRadius: "15px",
                      fontWeight: "700",
                    }}
                    sx={{ borderRadius: "15px", mb: 1, pr: 1 }}
                    onClick={() =>
                      navigate(`/rooms/view-room/${myAd.id}/?active=true`)
                    }
                  >
                    All Details
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ))
      : myAds
          ?.slice(0, noOfCount)
          .reverse()
          .map((myAd) => (
            <Grid
              key={myAd._id}
              item
              // xs={12}
              // sm={6}
              // md={3}
              // sx={{ cursor: "pointer", p: 2 }}
              sx={{
                display: "grid",
                cursor: "pointer",
                p: 2,
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px",
                "@media (max-width: 600px)": {
                  gridTemplateColumns: "1fr",
                },
              }}
            >
              <Grid
                sx={{
                  // width: "30vw",
                  width: "300px",
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    padding: "10px",
                    height: "200px",
                    overflow: "hidden",
                    borderRadius: "20px ",
                    objectFit: "cover",
                  }}
                  image={myAd.images.length > 0 ? myAd.images[0] : [DummyImage]}
                  alt={myAd?.id}
                />
                <Grid
                  container
                  justifyContent={"space-between"}
                  sx={{ padding: "10px" }}
                >
                  <Grid>
                    <Typography variant="subtitle1">
                      <Typography component="span" sx={{ fontWeight: 700 }}>
                        {myAd?.action}
                      </Typography>
                    </Typography>
                    <Typography variant="subtitle1">
                      <Typography component="span">
                        Age({myAd?.aboutYou?.age ? myAd.aboutYou.age : "N/A"})
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid sx={{ px: 2 }}>
                    <Button
                      variant={"contained"}
                      style={{
                        // paddingRight:"16px",
                        backgroundColor: "orange",
                        color: "white",
                        borderRadius: "15px",
                        fontWeight: "700",
                      }}
                      onClick={() =>
                        navigate(
                          `/roommate/view-roommate/${myAd.id}/?active=true`
                        )
                      }
                    >
                      View Ad
                    </Button>
                  </Grid>
                  <hr style={{ borderTop: "1px solid #000", width: "100%" }} />
                </Grid>

                <Grid container justifyContent={"space-between"}>
                  <Grid item>
                    <Typography sx={{ pl: 2 }}>Budget </Typography>
                    <Typography sx={{ fontWeight: 700, pl: 2 }}>
                      AED {myAd?.budget}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ pr: 2 }}>Moving date </Typography>
                    <Typography sx={{ fontWeight: 700, pr: 2 }}>
                      {myAd?.movingDate
                        ? new Date(myAd?.movingDate).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : new Date(myAd?.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ));

  useEffect(() => {
    fetchMyAds();
  }, []);

  return (
    <Grid>
      <TopBackground />
      <Typography variant="h5" align="center" fontWeight={900}>
        My Ads
      </Typography>
      <Typography variant="subtitle1" align="center">
        {myAds.length} results
      </Typography>
      {isLoading ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: 400 }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          // gap={4}
          sx={{ margin: "auto", mb: 5, padding: "20px" }}
        >
          {myAdsData}
        </Grid>
      )}
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          sx={{
            mx: 3,
            my: 2,
            borderRadius: "20px",
            bgcolor: "orange",
            "&:hover": {
              "&:hover": {
                bgcolor: "#ff9900",
              },
            },
          }}
          variant="contained"
          onClick={() => {
            setnoOfCount(noOfCount + 10);
          }}
        >
          Show more
        </Button>
      </Box>
      <BottomBackground />
    </Grid>
  );
};

export default MyAds;
