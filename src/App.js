import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";
import { requestForToken } from "./firebase/index";

import Nav from "./components/UI/Nav";
import OurServices from "./pages/OurServices";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PostProperty from "./pages/postProperty";
import Footer from "./components/Footer";
import AllRooms from "./components/rooms/AllRooms";
import SecondPage from "./pages/SecondPage";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import MyBookings from "./pages/MyBookings";
import ViewRoom from "./pages/ViewRoom";
import EditProfile from "./pages/EditProfile";
import PrivateRoute from "./utils/PrivateRoute";
import MyAccount from "./pages/MyAccount";
import ViewProfile from "./pages/ViewProfile";
import Chat from "./pages/Chat";
import SignUp from "./pages/SignUp";
import AboutBooking from "./pages/AboutBooking";
import PayRent from "./pages/PayRent";
import MyAds from "./pages/MyAds";
import ViewTenant from "./pages/ViewTenant";

import StripePaymentCancel from "./pages/StripePaymentCancel";
import axios from "axios";
import ChatBody from "./components/Chat/ChatBody";
import NewChatBody from "./components/Chat/NewChatBody";
import PostAd from "./pages/PostAd";
import UpgradePlan from "./pages/UpgradePlan";
import About from "./pages/About";
import Message from "./pages/Message";

const App = () => {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");

  const notificationPermission = async () => {
    try {
      if (token && Date.now() < parseInt(tokenExpiration)) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const fcmToken = await requestForToken();
          if (fcmToken) {
            // const { data } = await axios.put(
            //   "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/auth/update-fcm-token",
            //   { fcmToken },
            //   { headers: { Authorization: token } }
            // );
            // fetch("https://fcm.googleapis.com/fcm/send", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //     Authorization:
            //       "bearer AAAAP9DdnvY:APA91bHXKF1b-SoQmOwvU49nZ0lE8wcE6zitWELiu2DHI0mD9726NNVIB_CNPRURAHUIRxa1c4XTyhXxKb6ApciTEgPvxwlbwtXU4IdZ4WEyKiQrKKVR35zBEJdrOMsRmHY2dY6SBr0z",
            //   },
            //   body: JSON.stringify({
            //     to: fcmToken,
            //     notification: {
            //       title: "Notification Title",
            //       body: "Notification Body",
            //     },
            //   }),
            // })
            //   .then((response) => {
            //     if (!response.ok) {
            //       throw new Error("Failed to send notification");
            //     }
            //     return response.json();
            //   })
            //   .then((data) => {
            //     console.log("API Response:", data);
            //     // Handle the response data as needed
            //   })
            //   .catch((error) => {
            //     console.error("API Error:", error);
            //     // Handle the error appropriately
            //   });
          }
        } else if (permission === "denied") {
          alert("You denied the notification permission");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    notificationPermission();
    //handleTokenRefresh();
  }, []);

  return (
    <Router>
      <Box sx={{ maxWidth: "2000px", margin: "auto" }}>
        <Nav />
        <Routes>
          <Route path="/" element={<OurServices />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/message" element={<Message />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route
            path="/postProperty"
            element={<PrivateRoute Component={PostProperty} />}
          />

          <Route path="/postAd" element={<PrivateRoute Component={PostAd} />} />
          <Route
            path="/myBookings"
            element={<PrivateRoute Component={MyBookings} />}
          />
          <Route
            path="/myBookings/aboutBooking/:id"
            element={<PrivateRoute Component={AboutBooking} />}
          />
          <Route path="/myAds" element={<PrivateRoute Component={MyAds} />} />
          <Route
            path="/editProfile"
            element={<PrivateRoute Component={EditProfile} />}
          />

          <Route
            path="/myAccount"
            element={<PrivateRoute Component={MyAccount} />}
          />

          <Route path="/about" element={<PrivateRoute Component={About} />} />

          <Route
            path="/viewProfile"
            element={<PrivateRoute Component={ViewProfile} />}
          />
          <Route path="/chat" element={<PrivateRoute Component={Chat} />} />
          <Route
            path="/chat/:id"
            element={<PrivateRoute Component={ChatBody} />}
          />
          <Route
            path="/directchat/:id"
            element={<PrivateRoute Component={NewChatBody} />}
          />
          <Route
            path="/payment/cancel"
            element={<PrivateRoute Component={StripePaymentCancel} />}
          />
          <Route
            path="/bookings/property/pay-rent/:id"
            element={<PrivateRoute Component={PayRent} />}
          />

          <Route
            path="/upgrade-plan/user/:id"
            element={<PrivateRoute Component={UpgradePlan} />}
          />

          <Route
            path="/roommate/view-roommate/:id"
            element={<PrivateRoute Component={ViewTenant} />}
          />

          {/* <Route path="/chat" element={<Chat />} /> */}
          <Route path="/allAvailableRooms" element={<AllRooms />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/rooms/view-room/:id" element={<ViewRoom />} />
          <Route path="/sp" element={<SecondPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset_password" element={<ResetPassword />} />
        </Routes>
        {/* <Footer /> */}
      </Box>
    </Router>
  );
};

export default App;
