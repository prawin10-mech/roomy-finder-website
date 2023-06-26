import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";

import CustomizeSelectBox from "../components/MUIcomponent/CustomizeSelectBox";
import IconButtonMUI from "../components/MUIcomponent/IconButtonMUI";

import AllAvailableRooms from "../components/rooms/AllAvailableRooms";
import axios from "axios";
import AdvancedSearch from "../components/rooms/AdvancedSearch";
import { useSelector, useDispatch } from "react-redux";
import { UserActions } from "../store/User";
import { SearchActions } from "../store/Search";
import {
  citydata,
  SAcitydata,
  dubaiCities,
  abuDahbiCities,
  sharjahCities,
  rasAlkimaCities,
  ummAlQuwainCities,
  ajmanCities,
  meccaCities,
  riyadhCities,
} from "../utils/UAEcitydata";
import Ads from "../components/Ads";
import bottomBackground from "../assets/bottomBackground.png";

import CommercialCarousal from "../components/Card/CommercialCarousal";

const SecondPage = () => {
  const city = useSelector((state) => state.search.searchText);
  const searchText = useSelector((state) => state.search.searchText);
  const availableRooms = useSelector((state) => state.search.availableRooms);
  const searchType = useSelector((state) => state.search.searchType);
  const action = useSelector((state) => state.search.action);
  const countryCode = useSelector((state) => state.room.country);

  const dispatch = useDispatch();
  const [locationData, setLocationData] = useState([]);
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  const isSmallScreen = useMediaQuery("(max-width: 500px)");

  let city2 = null;
  if (city) {
    city2 = city;
  }

  const fetchMyBookings = async () => {
    try {
      if (token && tokenExpiration && Date.now() < parseInt(tokenExpiration)) {
        const { data } = await axios.get(
          "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/bookings/property-ad",
          { headers: { Authorization: token } }
        );
        dispatch(UserActions.myBookings(data));
      }
    } catch (err) {}
  };

  const getPartitionRoomData = async () => {
    try {
      const { data } = await axios.post(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/${searchType}-ad/available`,
        { countryCode }
      );
      dispatch(SearchActions.availableRooms(data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchMyBookings();
    if (availableRooms.length === 0) {
      getPartitionRoomData();
    }
  }, []);

  useEffect(() => {
    getPartitionRoomData();
  }, [countryCode]);

  const viewArrayData = () => {
    if (countryCode === "AE") {
      if (city === "Dubai") {
        setLocationData(dubaiCities);
      } else if (city === "Abu Dhabi") {
        setLocationData(abuDahbiCities);
      } else if (city === "Sharjah") {
        setLocationData(sharjahCities);
      } else if (city === "Ras Al Kima") {
        setLocationData(rasAlkimaCities);
      } else if (city === "Umm Al-Quwain") {
        setLocationData(ummAlQuwainCities);
      } else if (city === "Ajman") {
        setLocationData(ajmanCities);
      } else if (city === "Riyadh") {
        setLocationData(riyadhCities);
      } else if (city === "Mecca") {
        setLocationData(meccaCities);
      } else {
        setLocationData([]);
      }
    } else if (countryCode === "SA") {
      setLocationData([]);
    }
  };
  useEffect(() => {
    viewArrayData();
  }, [city, countryCode]);

  return (
    <>
      <Box
        xs={12}
        sx={{
          py: 3,
          backgroundImage: `url(${bottomBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          px: 5,
        }}
      >
        <Box
          sx={{
            width: isSmallScreen ? "100%" : "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            // marginLeft: "25%",
          }}
        >
          <CommercialCarousal />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            sx={{
              backgroundColor: "#99f099",
              width: "100%",
              display: { xs: "none", sm: "block", md: "block" },
            }}
          >
            <AdvancedSearch />
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Box
              xs={12}
              sx={{
                display: "flex",
                py: 3,
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Box xs={6} sx={{ display: "flex", flexWrap: "wrap" }}>
                <CustomizeSelectBox
                  name={"Room Type"}
                  fn="roomSearch"
                  values={["property", "Roommate"]}
                />
                {searchType === "Roommate" && (
                  <CustomizeSelectBox
                    name={"Preference"}
                    fn="action"
                    values={["All", "HAVE ROOM", "NEED ROOM"]}
                  />
                )}
                <CustomizeSelectBox
                  name={"Type"}
                  fn="propertyType"
                  values={
                    searchType === "property"
                      ? [
                          "All",
                          "Bed",
                          "Partition",
                          "Master Room",
                          "Room",
                          "Mix",
                        ]
                      : ["All", "Studio", "Appartment", "House"]
                  }
                />
                <CustomizeSelectBox
                  name={"City"}
                  fn="searchText"
                  values={
                    countryCode === "AE"
                      ? [...citydata]
                      : countryCode === "SA"
                      ? [...SAcitydata]
                      : ""
                  }
                />
                <CustomizeSelectBox
                  mainbox={{ m: 2 }}
                  name={"Area"}
                  values={[...locationData]}
                  fn="location"
                />
                <IconButtonMUI IconButtonsx={{ mt: 1 }} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  px: 6,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {/* <CheckboxLabels label={"Show commercial properties only"} /> */}
                {/* <PositionedMenu /> */}
              </Box>
            </Box>
            <hr />
            <Box>
              <Box
                sx={{
                  display: "flex",
                  px: 6,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="h5">
                    {city2 === null
                      ? searchType === "property"
                        ? `Apartments for Rent `
                        : action === "HAVE ROOM"
                        ? `HAVE ROOM `
                        : action === "NEED ROOM"
                        ? `NEED ROOM `
                        : `All rooms `
                      : searchType === "property"
                      ? `Apartments for Rent in ${city}`
                      : action === "HAVE ROOM"
                      ? `HAVE ROOM in ${city}`
                      : action === "NEED ROOM"
                      ? `NEED ROOM in ${city}`
                      : `All rooms in ${city}`}
                    {/* {searchType === "property"
                      ? `Apartments for Rent in ${city}`
                      : action === "HAVE ROOM"
                      ? `HAVE ROOM in ${city}`
                      : action === "NEED ROOM"
                      ? `NEED ROOM in ${city}`
                      : `All rooms in ${city}`} */}
                  </Typography>
                  {/* <Typography variant="subtitle2">
                    {Object.keys(availableRooms).length} results
                  </Typography> */}
                </Box>

                {/* <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <PositionedMenu />
                  <IconLabelButtons
                    icon={FavoriteBorderIcon}
                    name={"Save Search"}
                  />
                </Box> */}
              </Box>
            </Box>
            <Box>
              <Grid container>
                <Grid item xs={12} sm={8} sx={{ width: "100%", px: 2 }}>
                  <AllAvailableRooms />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={3.5}
                  sx={{ mx: 0.5, borderRadius: "20px" }}
                >
                  <Ads />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        {/* <Box sx={{ width: "25%", backgroundColor: "#00ff00" }}>Left Side</Box>
        <Box sx={{ width: "75%", backgroundColor: "#00ffff" }}></Box> */}
      </Box>
    </>
  );
};

export default SecondPage;
