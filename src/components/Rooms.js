import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchActions } from "../store/Search";
import { roomsTypeActions } from "../store/Rooms";
import axios from "axios";

import FindRoommate from "../assets/rooms/FindRoommate.jpg";
import FindRoom from "../assets/rooms/FindRoom.jpg";

const Rooms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const backgroundStyles = {
    backgroundImage: `url(${FindRoom})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "20px",
    padding: "25px",
    height: "100%",
  };

  const backgroundStyles2 = {
    backgroundImage: `url(${FindRoommate})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "20px",
    padding: "25px",
    height: "100%",
  };

  const findRoom = async () => {
    try {
      const { data } = await axios.post(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/property-ad/available`,
        { countryCode: "AE" }
      );
      dispatch(roomsTypeActions.availableRooms(data));
      dispatch(roomsTypeActions.roommateAds());

      dispatch(SearchActions.availableRooms(data));
      dispatch(SearchActions.roomSearch("property"));
      navigate("/sp");
    } catch (err) {
      console.log(err);
    }
  };

  const findRoommate = async () => {
    try {
      const { data } = await axios.post(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/roommate-ad/available`,
        { countryCode: "AE" }
      );
      dispatch(roomsTypeActions.availableRooms(data));
      dispatch(roomsTypeActions.roommateAds());

      dispatch(SearchActions.availableRooms(data));
      dispatch(SearchActions.roomSearch("roommate"));
      navigate("/sp");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid margin="auto">
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "95%", margin: "auto", my: 3 }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ marginBottom: { xs: 2, sm: 0 }, padding: "20px" }}
        >
          <Box sx={backgroundStyles}>
            <Typography
              sx={{ color: "#fff", fontWeight: "700", fontSize: "22px", mb: 1 }}
            >
              FIND ROOM
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                fontSize: "20px",
                maxWidth: { xs: "60%", md: "40%" },
                wordWrap: "break-word",
                mb: 1,
              }}
            >
              +50,000 room and sharing options
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
                fontWeight: "700",
                bgcolor: "#fff",
                color: "purple",
                "&:hover": { bgcolor: "#fff" },
                mb: 1,
              }}
              onClick={findRoom}
            >
              Search
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ marginBottom: { xs: 2, sm: 0 }, padding: "20px" }}
        >
          <Box sx={backgroundStyles2}>
            <Typography
              sx={{
                color: "purple",
                fontWeight: "700",
                fontSize: "22px",
                mb: 1,
              }}
            >
              FIND ROOMMATE
            </Typography>
            <Typography
              sx={{
                color: "purple",
                fontSize: "20px",
                maxWidth: { xs: "60%", md: "40%" },
                wordWrap: "break-word",
                mb: 1,
              }}
            >
              +25,000 roommate profiles
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
                fontWeight: "700",
                bgcolor: "#fff",
                color: "purple",
                "&:hover": { bgcolor: "#fff" },
                mb: 1,
              }}
              onClick={findRoommate}
            >
              Search
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Rooms;
