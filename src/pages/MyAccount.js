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
import Footer from "../components/Footer";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const MyAccount = () => {
  const user = JSON.parse(Cookies.get("user"));
  const navigate = useNavigate();

  const viewProfileHandle = () => {
    navigate("/viewProfile");
  };

  // onMessageListener()
  //   .then((payload) => {
  //     console.log(payload, "payload");
  //     //  setShow(true);
  //     //  setNotification({
  //     //    title: payload.notification.title,
  //     //    body: payload.notification.body,
  //     //  });
  //     alert(payload.notification.title);
  //     // <Alert severity="success" color="info">
  //     //   Title:payload.notification.title
  //     // </Alert>;
  //   })
  //   .catch((err) => console.log("failed: ", err));

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
      <Grid sx={{ maxWidth: "100%", margin: "auto" }}>
        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "100vh", my: 2 }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            mb={3}
          >
            <Grid item>
              <Typography variant="h5" fontWeight={700}>
                My Account
              </Typography>
            </Grid>
            <Grid
              container
              item
              spacing={{ xs: 3, sm: 10 }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Grid item sx={{ display: "flex" }}>
                <Box
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    overflow: "hidden",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <img
                    src={
                      user.profilePicture
                        ? user.profilePicture
                        : user.gender === "Male"
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

              <Grid item justifyContent={"center"} textAlign={"center"}>
                <Typography variant="h6" fontWeight={900}>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={400}
                  sx={{ color: "purple", textTransform: "capitalize" }}
                >
                  {user.type}
                </Typography>

                <Button
                  onClick={viewProfileHandle}
                  variant="outlined"
                  sx={{
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                    borderColor: "black",
                  }}
                  startIcon={<PersonOutlineOutlinedIcon />}
                >
                  All Details
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ width: "100%", maxWidth: "70%" }}
            onClick={() => navigate("/notifications")}
          >
            <Grid
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#f0ecf6",
                width: "100%",
                borderRadius: "15px",
                cursor: "pointer",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Avatar sx={{ m: 1 }}>
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
                    height: "20px",
                    width: "20px",
                    color: "#000",
                    cursor: "pointer",
                    mr: "10px",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ width: "100%", maxWidth: "70%" }}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#f0ecf6",
                borderRadius: "15px",
                mb: 2,
                cursor: "pointer",
              }}
              onClick={() => navigate("/myAds")}
            >
              <Box sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Avatar sx={{ m: 1 }}>
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
                    height: "20px",
                    width: "20px",
                    color: "#000",
                    cursor: "pointer",
                    mr: "10px",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ width: "100%", maxWidth: "70%" }}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#f0ecf6",
                borderRadius: "15px",
                mb: 2,
                cursor: "pointer",
              }}
              onClick={() => navigate("/myBookings")}
            >
              <Box sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Avatar sx={{ m: 1 }}>
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
                    height: "20px",
                    width: "20px",
                    color: "#000",
                    cursor: "pointer",
                    mr: "10px",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ width: "100%", maxWidth: "70%" }}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#f0ecf6",
                borderRadius: "15px",
                cursor: "pointer",
                mb: 2,
              }}
              onClick={() => navigate("/about")}
            >
              <Box sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Avatar sx={{ m: 1 }}>
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
                    height: "20px",
                    width: "20px",
                    color: "#000",
                    cursor: "pointer",
                    mr: "10px",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ width: "100%", maxWidth: "70%" }}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#f0ecf6",
                borderRadius: "15px",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Avatar sx={{ m: 1 }}>
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
                    height: "20px",
                    width: "20px",
                    color: "#000",
                    cursor: "pointer",
                    mr: "10px",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <BottomBackground />
      <Footer />
    </>
  );
};

export default MyAccount;
