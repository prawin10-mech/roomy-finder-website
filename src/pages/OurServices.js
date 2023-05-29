import React, { useEffect, useState } from "react";
import FloatingImage from "../components/FloatingImage";
import Search from "../components/Search";
import CityCarousel from "../components/UI/CityCarousel";
import Rooms from "../components/Rooms";
import { Typography, Box, Grid } from "@mui/material";
import AddWithCarousel from "../components/Card/CardForOurServics";
import MainBgImg from "../assets/mainBackground.jpg";
import axios from "axios";
import Footer from "../components/Footer";
import Cookies from "js-cookie";

import { SearchActions } from "../store/Search";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../store/User";

import CarouselWithMultipleImage from "../components/CarouselWithMultipleImage";
import { roomsTypeActions } from "../store/Rooms";

const OurServices = () => {
  const [PartitionAddAvilableRoom, setPartitionAddAvilableRoom] = useState([]);
  const rooms = useSelector((state) => state.room.rooms);
  const roomType = useSelector((state) => state.search.searchType);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");

  const getAffordableRoomData = async () => {
    const { data } = await axios.post(
      `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/${roomType}-ad/available`,
      { countryCode: "AE" }
    );
    dispatch(roomsTypeActions.availableRooms(data));
  };

  const getPartitionRoomData = async () => {
    const { data } = await axios.post(
      `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/property-ad/available`,
      { countryCode: "AE" }
    );
    dispatch(SearchActions.availableRooms(data));
    setPartitionAddAvilableRoom(data);
  };

  const fetchMyBookings = async () => {
    try {
      if (token && tokenExpiration) {
        if (Date.now() < parseInt(tokenExpiration)) {
          const { data } = await axios.get(
            "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/bookings/property-ad",
            { headers: { Authorization: token } }
          );
          dispatch(UserActions.myBookings(data));
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
          Cookies.remove("user");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  let id = null;
  if (
    token &&
    tokenExpiration &&
    Date.now() < parseInt(tokenExpiration) &&
    Cookies.get("user")
  )
    id = JSON.parse(Cookies.get("user")).id;

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/profile/profile-info?userId=${id}`
      );
      Cookies.set("user", JSON.stringify(data), { expires: 365 });

      dispatch(UserActions.type(data.type));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAffordableRoomData();
    getPartitionRoomData();
    fetchMyBookings();
    fetchUser();
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundImage: `
      linear-gradient(
        90deg,
        rgba(128, 0, 128, 1) 0%,
        rgba(160, 32, 160, 1) 25%,
        rgba(192, 64, 192, 1) 50%,
        rgba(224, 96, 224, 1) 75%,
        rgba(255, 128, 255, 1) 100%
      )`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          marginBottom: "50px",
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12} sm={8}>
            <Box
              sx={{
                pt: { xs: 8, md: 13 },
                px: { xs: 2, md: 2 },
                ml: { xs: 0, sm: 0, md: 12 },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  mb: 3,
                  px: { xs: 1 },

                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Find your perfect sharing space.
              </Typography>
              <Search />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                height: "100%",
                position: "relative",
              }}
            >
              <FloatingImage />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ pt: { xs: 6 } }}>
          <CityCarousel />
          <Rooms />
          <Box sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="h5" sx={{ mb: 1 }}>
                Top affordable sharing option in UAE
              </Typography>
              <CarouselWithMultipleImage propertyAddAvilableRoom={rooms} />
            </Box>

            <Box sx={{ mt: 1, mb: 2 }}>
              <Typography variant="h5" sx={{ my: 1 }}>
                Partitions for rent in Sharjah
              </Typography>

              <CarouselWithMultipleImage
                PartitionAddAvilableRoom={PartitionAddAvilableRoom}
              />
            </Box>
            <AddWithCarousel />
          </Box>
          {/* <AvailableRooms /> */}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default OurServices;
