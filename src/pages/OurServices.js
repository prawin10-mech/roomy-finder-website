import React, { useEffect, useState } from "react";
import FloatingImage from "../components/FloatingImage";
import Search from "../components/Search";
import CityCarousel from "../components/UI/CityCarousel";
import CitiesInUae from "../components/UI/CitiesInUae";
import Rooms from "../components/Rooms";
import { Typography, Box, Grid } from "@mui/material";
import AddWithCarousel from "../components/Card/CardForOurServics";
import axios from "axios";
import Footer from "../components/Footer";
import Cookies from "js-cookie";

import { SearchActions } from "../store/Search";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../store/User";

import CarouselWithMultipleImage from "../components/CarouselWithMultipleImage";
import { roomsTypeActions } from "../store/Rooms";

import { requestForToken } from "../firebase/index";
import headerimage from "../assets/Home/34213422.PNG"

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
    <Box sx={{ position: "relative", width: "100%", height: "100vh" }}>
      <Box
        sx={{
          height: { xs: "50%", sm: "50%", md: "55%", lg: "40%", xl: "55%" },
          backgroundImage:
          `url(${headerimage})`,
          backgroundPosition: "center", // Add this line
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          marginBottom: "50px",
          
        }}
      >
        <Box
        // sx={{
        //   position: "absolute",
        //   top: 0,
        //   left: 0,
        //   right: 0,
        //   bottom: 0,
        // }}
        >
          <Grid container justifyContent="space-between" alignItems="center" >
            <Grid item xs={12} sm={8} >
              <Box
                sx={{
                  pt: { xs: 8, md: 12 },
                  px: { xs: 2, md: 2 },
                  ml: { xs: 0, sm: 0, md: 12 },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                    mb: "10px",
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
                  mt:"20%",
                  display: "flex",
                  justifyContent: "flex-end",
                  height: "100%",
                  px:4,
                }}
              >
                <FloatingImage />
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ pt: { xs: 6 },pl:{md:8,sm:6,xs:4},pr:{md:8,sm:6,xs:4} }}>
            <CityCarousel />
            <Rooms />
            <CitiesInUae />
            <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="h5" sx={{ mb: 1,pl:{md:3,sm:2,xs:1} }}>
                  Top affordable sharing option in UAE
                </Typography>
                <CarouselWithMultipleImage
                  propertyAddAvilableRoom={PartitionAddAvilableRoom}
                />
              </Box>

              <Box sx={{ mt: 1, mb: 1 }}>
                <Typography variant="h5" sx={{ my: 1,pl:{md:3,sm:2,xs:1} }}>
                  Partitions for rent in Sharjah
                </Typography>

                <CarouselWithMultipleImage
                  PartitionAddAvilableRoom={PartitionAddAvilableRoom}
                />
              </Box>
              <Box sx={{ mt: 1, mb: "4px" ,pl:{md:3,sm:2,xs:1},pr:{md:3,sm:2,xs:1}}}>
                
              <AddWithCarousel />
              </Box>
            </Box>
            {/* <AvailableRooms /> */}
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default OurServices;
