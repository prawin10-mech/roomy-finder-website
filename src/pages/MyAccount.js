import React from "react";
import { Grid, Box, Typography, Button, Avatar } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import TopBackground from "../components/postPropertyComponents/TopBackground";
import BottomBackground from "../components/postPropertyComponents/BottomBackground";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppsIcon from "@mui/icons-material/Apps";
import InfoIcon from "@mui/icons-material/Info";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import firebase, { messaging, onMessageListener } from "../firebase/index";
import axios from "axios";
import DummyUserImage from "../assets/dummyUserImage.jpg";
import DummyFemaleUserImage from "../assets/dummyFemaleUserImage.jpg";

const MyAccount = () => {
  const user = JSON.parse(Cookies.get("user"));
  const navigate = useNavigate();

  const viewProfileHandle = () => {
    navigate("/viewProfile");
  };

  onMessageListener()
    .then((payload) => {
      console.log(payload, "payload");
      //  setShow(true);
      //  setNotification({
      //    title: payload.notification.title,
      //    body: payload.notification.body,
      //  });
      alert(payload.notification.title);
      // <Alert severity="success" color="info">
      //   Title:payload.notification.title
      // </Alert>;
    })
    .catch((err) => console.log("failed: ", err));

  const testNotification = () => {};

  const sendnoti = async () => {
    const noti = await axios.post(
      "https://fcm.googleapis.com/fcm/send",
      {
        to: "f8BytJHQr5Jx74gcDp8F3O:APA91bHEOisinu3b9gSwnKWqRAuCbuqXRO8KbmOC_gpriOTcu91o0jHA_lxIpgUCxQBKz5H4irjBHaXd-ejBhS9_IOo-443prvCxiUlr5pH8XvOcPALPFb7GVFzNUpjfGoFJuJakEaV-",
        notification: {
          title: "Add property",
          body: "You add new property",
        },
      },
      {
        headers: {
          Authorization:
            "key=AAAAfyPvrw8:APA91bGidy7FBBsYJjDhWYvptDNAFHmHDyJGgfFm9qs3DS5VdwxG4aQT7Y5cGF-dddSF5v6O5tYLGY48Hz8Q2lyimjt8TIKGRpLoZF7lng0Xe6LluMGGnTzBYUA1ktjpSQgpJVQGYz2o",
          "Content-Type": "application/json",
        },
      }
    );
  };

  console.log(user);

  return (
    <>
      <TopBackground />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh", my: 3 }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h5" fontWeight={700}>
              My Account
            </Typography>
          </Grid>
          <Grid
            container
            item
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Grid item>
              <Box
                sx={{
                  width: 300,
                  height: 250,
                  borderRadius: "25px",
                  overflow: "hidden",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                <img
                  src={
                    user.gender === "Male"
                      ? DummyUserImage
                      : DummyFemaleUserImage
                  }
                  alt={`${user.firstName} profile`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>

            <Grid item>
              <Typography variant="h6" fontWeight={900}>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="h6" fontWeight={900}>
                {user.type}
              </Typography>
              <Button
                onClick={viewProfileHandle}
                variant="outlined"
                color="secondary"
              >
                All Details
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4}>
          <Grid item sx={{ width: "100%" }}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#D9D9D9",
                borderRadius: "15px",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <NotificationsIcon />
                  </Avatar>
                </Box>

                <Box>
                  <Typography onClick={testNotification}>
                    Notifications
                  </Typography>
                  <Typography>0 unread notifications</Typography>
                </Box>
              </Box>
              <Box>
                <ChevronRightIcon
                  sx={{
                    height: "50px",
                    width: "50px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#D9D9D9",
                borderRadius: "15px",
                cursor: "pointer",
                mb: 2,
              }}
              onClick={() => navigate("/myAds")}
            >
              <Box sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <AppsIcon />
                  </Avatar>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>My Ads</Typography>
                </Box>
              </Box>
              <Box>
                <ChevronRightIcon
                  sx={{
                    height: "50px",
                    width: "50px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            sx={{ width: "100%", cursor: "pointer" }}
            onClick={() => navigate("/myBookings")}
          >
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#D9D9D9",
                borderRadius: "15px",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <EventNoteIcon />
                  </Avatar>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>My Bookings</Typography>
                </Box>
              </Box>
              <Box>
                <ChevronRightIcon
                  sx={{
                    height: "50px",
                    width: "50px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            sx={{ width: "100%" }}
            onClick={() => navigate("/aboutUs")}
          >
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#D9D9D9",
                borderRadius: "15px",
                cursor: "pointer",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <InfoIcon />
                  </Avatar>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>About</Typography>
                </Box>
              </Box>
              <Box>
                <ChevronRightIcon
                  sx={{
                    height: "50px",
                    width: "50px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#D9D9D9",
                borderRadius: "15px",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <AccountBalanceWalletIcon />
                  </Avatar>
                </Box>

                <Box>
                  <Typography>Account Balance</Typography>
                  <Typography>0 AED</Typography>
                </Box>
              </Box>
              <Box>
                <ChevronRightIcon
                  sx={{
                    height: "50px",
                    width: "50px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          {/* <Grid item sx={{ width: "100%" }}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#D9D9D9",
                borderRadius: "15px",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box>
                  <Typography>Roomy Balance</Typography>
                </Box>
              </Box>
              <Box>
                <ChevronRightIcon
                  sx={{
                    height: "50px",
                    width: "50px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
      <BottomBackground />
    </>
  );
};

export default MyAccount;
