import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../utils/ToastOptions";
import axios from "axios";
import { baseUrl } from "../helper";
import TopBackground from "../components/postPropertyComponents/TopBackground";
import BottomBackground from "../components/postPropertyComponents/BottomBackground";

const UpgradePlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stripeLoading, setStripeLoading] = useState(null);
  const [paypalLoading, setPaypalLoading] = useState(null);
  const token = localStorage.getItem("token");

  const payWithCardHandler = async () => {
    try {
      setStripeLoading(true);
      const { data } = await axios.post(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/profile/upgrade-plan/stripe`,
        {},
        { headers: { Authorization: token } }
      );
      window.location.href = data.paymentUrl;
    } catch (err) {
      console.log(err);
    } finally {
      setStripeLoading(false);
    }
  };

  const payWithPaypalHandler = async (id) => {
    try {
      setPaypalLoading(true);
      const { data } = await axios.post(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/profile/upgrade-plan/paypal`,
        {
          successUrl: `${baseUrl}/myBookings/aboutBooking/${id}`,
          cancelUrl: `${baseUrl}/payment/cancel`,
        },
        { headers: { Authorization: token } }
      );
      window.location.href = data.paymentUrl;
    } catch (err) {
      console.log(err);
    } finally {
      setPaypalLoading(false);
    }
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      height={"100vh"}
      overflowY={"hidden"}
    >
      <TopBackground />
      <Grid>
        <Typography variant="h6" sx={{ fontWeight: 700, textAlign: "center" }}>
          Pay 250 AED to upgrade to premium
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{ maxWidth: 600, margin: "auto" }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ borderRadius: 15 }}
              onClick={() => payWithCardHandler(id)}
              disabled={stripeLoading}
            >
              {stripeLoading ? (
                <CircularProgress size={20} color="secondary" />
              ) : (
                "Pay with Credit or Debit card"
              )}
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ borderRadius: 15 }}
              onClick={() => payWithPaypalHandler()}
              disabled={paypalLoading}
            >
              {paypalLoading ? (
                <CircularProgress size={20} color="secondary" />
              ) : (
                "Pay with Paypal"
              )}
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ borderRadius: 15 }}
              onClick={() =>
                toast.success(
                  "Payment with Roomy Finder Card is coming soon!",
                  toastOptions
                )
              }
            >
              Pay with RoomyFinder Card
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: 15,
                bgcolor: "orange",
                color: "#fff",
                "&:hover": {
                  bgcolor: "#ff9900",
                },
              }}
              onClick={() => navigate(`/roommate/view-roommate/${id}`)}
            >
              SKIP PAYMENT
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <BottomBackground />
      <ToastContainer />
    </Grid>
  );
};

export default UpgradePlan;
