import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
// import firebase, {  onMessageListener } from "./firebase/index";
import firebase, { messaging, onMessageListener } from "./firebase/index";
import {
  getToken,
  onMessage,
  getMessaging,
  deleteToken,
} from "firebase/messaging";
import StripePaymentCancel from "./pages/StripePaymentCancel";
import axios from "axios";
import ChatBody from "./components/Chat/ChatBody";
import PostAd from "./pages/PostAd";
import UpgradePlan from "./pages/UpgradePlan";

const App = () => {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");

  const notificationpremision = async () => {
    try {
      if (token && Date.now() < parseInt(tokenExpiration)) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const fcmToken = await getToken(messaging, {
            vapidKey:
              "BK1YSNEVcw8HU87zqvSqIZIrLAegjVlT_LLIPVRycirOw5ghNJ0zH9uTT5zxceX2v04Z3E0vIIEb38Xk1QeEBRA",
          });

          console.log(fcmToken);
          if (fcmToken) {
            await axios.put(
              "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/auth/update-fcm-token",
              { fcmToken },
              { headers: { Authorization: token } }
            );
          }
        } else if (permission === "denied") {
          alert("You denied for the notification");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const handleTokenRefresh = async () => {
  //   try {
  //     // Delete the previous token
  //     await deleteToken(getMessaging());

  //     // Retrieve a new token
  //     const refreshedToken = await getToken(getMessaging());
  //     console.log("Refreshed FCM token:", refreshedToken);
  //     try{
  //       const res = await axios.put(
  //         "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/auth/update-fcm-token",
  //         {
  //           fcmToken: refreshedToken,
  //         },
  //         { headers: { Authorization: token } }
  //       );

  //     }catch(err){
  //       console.log(err)
  //     }
  //     // Send the refreshed token to your backend for storage or update
  //     // Backend API endpoint: POST /tokens
  //     // axios.post('/tokens', { token: refreshedToken });
  //   } catch (error) {
  //     console.error("Error refreshing FCM token:", error);
  //   }
  // };

  const handleTokenRefresh = async () => {
    try {
      const refreshedToken = await getToken(getMessaging());
      console.log("Refreshed FCM token:", refreshedToken);
      const res = await axios.put(
        "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/auth/update-fcm-token",
        {
          fcmToken: refreshedToken,
        },
        { headers: { Authorization: token } }
      );
    } catch (error) {
      console.error("Error refreshing FCM token:", error);
    }
  };

  useEffect(() => {
    // notificationpremision();
    // ==================

    notificationpremision();
    handleTokenRefresh();

    // Add message listener to handle token refresh

    // ===========
  }, []);

  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<OurServices />} />
          <Route path="/aboutUs" element={<AboutUs />} />
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
      </div>
    </Router>
  );
};

export default App;
