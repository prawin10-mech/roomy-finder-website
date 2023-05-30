import React, { useState, useEffect } from "react";
import axios from "axios";
import TopBackground from "../components/postPropertyComponents/TopBackground";
import BottomBackground from "../components/postPropertyComponents/BottomBackground";
import { Grid, Typography, CardMedia, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../store/User";
import DummyImage from "../assets/demo.jpg";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const MyBookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myBookings = useSelector((state) => state.user.myBookings);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyBookings = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/bookings/property-ad",
        { headers: { Authorization: token } }
      );
      dispatch(UserActions.myBookings(data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getStatusColor = (status) => {
    if (status === "offered") {
      return "green";
    } else if (status === "pending") {
      return "blue";
    }
    return "inherit";
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    const dateTime = new Date(dateTimeString);
    return `${dateTime.toLocaleDateString(undefined, options)}`;
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const myBookingData = myBookings
    ?.slice()
    .reverse()
    .map((booking) => (
      <Grid
        key={booking._id}
        item
        xs={12}
        sm={6}
        md={2.2}
        
        sx={{ cursor: "pointer", p: 2 }}
        onClick={() => navigate(`/myBookings/aboutBooking/${booking.id}`)}
      >
        <Grid
          sx={{
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
              height: "200px",
              padding: "10px",
              overflow: "hidden",
              borderRadius: "20px ",
              objectFit: "cover",
            }}
            image={
              booking.ad.images.length > 0 ? booking.ad.images[0] : [DummyImage]
            }
            alt={booking?.id}
          />
          <Grid sx={{ padding: "10px" }}>
            <Typography variant="subtitle1">
              Property:{" "}
              <Typography component="span" sx={{ fontWeight: "700" }}>
                {booking.quantity} {booking.ad.type}
              </Typography>
            </Typography>
            <Typography variant="subtitle1">
              Location:{" "}
              <Typography component="span" sx={{ fontWeight: "700" }}>
                {booking.ad.address.location}
              </Typography>
            </Typography>
            <Typography variant="subtitle1">
              Status:{" "}
              <Typography
                component="span"
                sx={{
                  fontWeight: "700",
                  color: getStatusColor(booking?.status),
                }}
              >
                {!booking?.isPayed ? capitalize(booking.status) : "Paid"}
              </Typography>
            </Typography>
            <Typography variant="subtitle1">
              Date:{" "}
              <Typography component="span" sx={{ fontWeight: "700" }}>
                {formatDateTime(new Date(booking.createdAt).toISOString())}
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    ));

  return (
    <div className="my-bookings-container">
      <TopBackground />
      <Typography variant="h5" align="center" fontWeight={900}>
        My Bookings
      </Typography>
      <Typography variant="subtitle1" align="center">
        {myBookings.length} results
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
          spacing={1}
          justifyContent="center"
          alignItems="center"
          gap={2}
          sx={{ margin: "auto", mb: 5 }}
        >
          {myBookingData}
        </Grid>
      )}
      <BottomBackground />
    </div>
  );
};

export default MyBookings;
