import {
  Box,
  Checkbox,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import TopBackground from "../components/postPropertyComponents/TopBackground";
import BottomBackground from "../components/postPropertyComponents/BottomBackground";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../utils/ToastOptions";
import ConfirmDialog from "../components/ConfirmDialog";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import paypalIcon from "../assets/paypalIcon.png";

const AccountBalance = () => {
  const { token } = useParams();
  const [accountBalance, setAccountBalance] = useState(0);
  const [roomyBalance, setRoomyBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [withdrawPaymentType, setWithdrawPaymentType] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [payAmount, setPayAmount] = useState("");
  const [isTextFieldActive, setIsTextFieldActive] = useState(false);
  const [isPayTextFieldActive, setIsPayTextFieldActive] = useState(false);
  const email = JSON.parse(Cookies.get("user")).email;
  const [paypalEmail, setPaypalEmail] = useState(email);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [paypalLoading, setPaypalLoading] = useState(false);
  const [stripeWithdrawLoading, setStripeWithdrawLoading] = useState(false);
  const [paypalWithdrawLoading, setPaypalWithdrawLoading] = useState(false);
  const [stripeConnect, setStripeConnecte] = useState(false);
  const [paypalConfirm, setPaypalConfirm] = useState(false);
  const [paypalWithdrawConfirm, setPaypalWithdrawConfirm] = useState(false);
  const [stripeWithdrawConfirm, setStripeWithdrawConfirm] = useState(false);

  const getAccountDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/profile/account-details",
        { headers: { Authorization: "bearer " + token } }
      );
      console.log(data);
      setAccountBalance(data.accountBalance);
      setRoomyBalance(data.roomyBalance);
    } catch (err) {
      console.log(err);
      toast.error("failed to fetch data", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (option) => {
    setPaymentType(option);
  };

  const handleWithdrawCheckboxChange = (option) => {
    setWithdrawPaymentType(option);
  };

  const connectToStripe = async () => {
    try {
      setStripeWithdrawLoading(true);
      const { data } = await axios.post(
        "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/transactions/payout/stripe/connected-account",
        {},
        { headers: { Authorization: "bearer " + token } }
      );
      if (data.status === 409) {
        console.log("pay");
      }
      window.location.href = data.paymentUrl;
    } catch (err) {
      if (err.response.data.code === "duplicate-attempt") {
        setStripeConnecte(true);
        toast.success(
          "You have already connected your account to Stripe",
          toastOptions
        );
      }
      console.log(err);
    } finally {
      setStripeWithdrawLoading(false);
    }
  };

  const handleWithdrawWithPaypal = () => {
    setPaypalConfirm(true);
  };

  const handlePaypalConfirmation = () => {
    toast.error("Something went wrong", toastOptions);
  };

  const withdrawWithStripe = async () => {
    try {
      if (withdrawAmount && withdrawAmount >= accountBalance) {
        const { data } = await axios.post(
          "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/transactions/payout/stripe/withdraw",
          { amount: +withdrawAmount, currency: "AED" },
          { headers: { Authorization: "Bearer " + token } }
        );
        window.location.href = data.paymentUrl;
      } else {
        toast.error("insufficient balance", toastOptions);
      }
    } catch (err) {
      if (err.response.status === 403) {
        toast.error(err.response.data.code, toastOptions);
      }
      console.log(err);
    }
  };

  const handleStripePay = async () => {
    try {
      if (payAmount >= 100) {
        const { data } = await axios.post(
          "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/transactions/roomy-balance/stripe/create-pay-roomy-balance-checkout-session",
          { amount: payAmount, currency: "AED" },
          { headers: { Authorization: "Bearer " + token } }
        );
        console.log(data);
        window.location.href = data.paymentUrl;
      } else {
        toast.error(
          "Amount is too small. Minimum amount is 100 AED",
          toastOptions
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePaypalPay = async () => {
    if (payAmount >= 100) {
      toast.error("Incufficient balance", toastOptions);
    } else {
      toast.error(
        "Amount is too small. Minimum amount is 100 AED",
        toastOptions
      );
    }
  };

  useEffect(() => {
    getAccountDetails();
  }, []);

  return (
    <>
      <TopBackground />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        my={3}
      >
        <Grid
          item
          justifyContent="center"
          alignItems="center"
          sx={{
            border: "2px solid black",
            fontWeight: 700,
            fontSize: "1.5rem",
            px: 3,
            my: 1,
          }}
        >
          {!loading ? `AED ${accountBalance}` : "? ? ?"}
        </Grid>
        <Typography sx={{ color: "purple", my: 2 }}>
          Rent amount paid by tenants
        </Typography>
        <Grid item justifyContent={"center"} textAlign={"center"}>
          <Typography sx={{ fontWeight: 600 }}>Withdraw now</Typography>
          <Box sx={{ width: "400px", my: 1 }}>
            <TextField
              autoComplete="off"
              placeholder="Amount to withdraw"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              onFocus={() => setIsTextFieldActive(true)}
              onBlur={() => setIsTextFieldActive(false)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ fontSize: "0.875rem" }}>
                    {isTextFieldActive && "AED"}
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>

        <hr />
        <Grid
          sx={{ display: "flex", flexDirection: "row" }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            sx={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
            alignItems="center"
            justifyContent={"center"}
          >
            <Checkbox
              style={{
                borderRadius: "50%",
                color: "orange",
                "& .MuiIconButton-root": {
                  borderRadius: "50%",
                },
              }}
              checked={withdrawPaymentType === "Stripe"}
              onChange={() => handleWithdrawCheckboxChange("Stripe")}
            />
            <Typography onClick={() => handleWithdrawCheckboxChange("Stripe")}>
              Stripe
            </Typography>
          </Grid>

          <Grid
            sx={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
            alignItems="center"
            justifyContent={"center"}
          >
            <Checkbox
              sx={{
                "& .MuiSvgIcon-root": {
                  borderRadius: "50%",
                  color: "orange",
                },
              }}
              checked={withdrawPaymentType === "Paypal"}
              onChange={() => handleWithdrawCheckboxChange("Paypal")}
            />
            <Typography onClick={() => handleWithdrawCheckboxChange("Paypal")}>
              Paypal
            </Typography>
          </Grid>
        </Grid>
        <Grid>
          {!stripeConnect && withdrawPaymentType === "Stripe" && (
            <Button
              variant="outlined"
              color="secondary"
              sx={{ borderRadius: "20px", mt: 2 }}
              onClick={() => connectToStripe()}
            >
              {stripeWithdrawLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
              <CreditCardIcon />
              Connect Stripe Account
            </Button>
          )}
          {stripeConnect && withdrawPaymentType === "Stripe" && (
            <Button
              variant="outlined"
              color="secondary"
              sx={{ borderRadius: "20px", mt: 2 }}
              onClick={() => withdrawWithStripe()}
            >
              {stripeWithdrawLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
              <CreditCardIcon /> Withdraw with Stripe
            </Button>
          )}
          {/* <ConfirmDialog /> */}
          {withdrawPaymentType === "Paypal" && (
            <Grid item justifyContent={"center"} textAlign="center" mt={2}>
              <Grid container alignItems={"center"}>
                <Typography sx={{ mr: 2 }}>PayPal email</Typography>
                <TextField
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                />
              </Grid>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ borderRadius: "20px", mt: 2 }}
                onClick={handleWithdrawWithPaypal}
              >
                <img src={paypalIcon} alt="paypal icon" width="30px" />
                Withdraw with PayPal
              </Button>
            </Grid>
          )}
        </Grid>
        <ConfirmDialog
          open={paypalConfirm}
          onClose={() => setPaypalConfirm(false)}
          onClick={handlePaypalConfirmation}
        />

        <hr style={{ backgroundColor: "black", height: "2px" }} />
        <Grid
          item
          justifyContent="center"
          alignItems="center"
          sx={{
            border: "2px solid black",
            fontWeight: 700,
            fontSize: "1.5rem",
            px: 3,
            my: 2,
            mt: 3,
          }}
        >
          {!loading ? `AED ${roomyBalance}` : "? ? ?"}
        </Grid>
        <Typography sx={{ color: "purple", my: 2 }}>
          Payable amount for Roomy FINDER
        </Typography>
        <Grid item justifyContent={"center"} textAlign={"center"}>
          <Typography sx={{ fontWeight: 600 }}>Pay now</Typography>
          <Box sx={{ width: "400px", my: 1 }}>
            <TextField
              autoComplete="off"
              placeholder="Amount to pay"
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              onFocus={() => setIsPayTextFieldActive(true)}
              onBlur={() => setIsPayTextFieldActive(false)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ fontSize: "0.875rem" }}>
                    {isPayTextFieldActive && "AED"}
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>
        <Grid
          sx={{ display: "flex", flexDirection: "row" }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            sx={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
            alignItems="center"
            justifyContent={"center"}
          >
            <Checkbox
              sx={{
                "& .MuiSvgIcon-root": {
                  borderRadius: "50%",
                  color: "orange",
                },
              }}
              checked={paymentType === "Stripe"}
              onChange={() => handleCheckboxChange("Stripe")}
            />
            <Typography onClick={() => handleCheckboxChange("Stripe")}>
              Stripe
            </Typography>
          </Grid>

          <Grid
            sx={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
            alignItems="center"
            justifyContent={"center"}
          >
            <Checkbox
              sx={{
                "& .MuiSvgIcon-root": {
                  borderRadius: "50%",
                  color: "orange",
                },
              }}
              checked={paymentType === "Paypal"}
              onChange={() => handleCheckboxChange("Paypal")}
            />
            <Typography onClick={() => handleCheckboxChange("Paypal")}>
              Paypal
            </Typography>
          </Grid>
        </Grid>
        <Grid>
          {paymentType === "Stripe" && (
            <Button
              variant="outlined"
              color="secondary"
              sx={{ borderRadius: "20px", mt: 2 }}
              onClick={() => {
                if (payAmount >= 100) {
                  setStripeWithdrawConfirm(true);
                } else {
                  toast.error(
                    "Amount is too small. Minimum amount is 100 AED",
                    toastOptions
                  );
                }
              }}
            >
              <CreditCardIcon />
              Pay with Stripe
            </Button>
          )}

          <ConfirmDialog
            open={stripeWithdrawConfirm}
            onClose={() => setStripeWithdrawConfirm(false)}
            onClick={handleStripePay}
          />
          {paymentType === "Paypal" && (
            <Button
              variant="outlined"
              color="secondary"
              sx={{ borderRadius: "20px", mt: 2 }}
              onClick={() => setPaypalWithdrawConfirm(true)}
            >
              <img src={paypalIcon} alt="paypal logo" width="30px" />
              Pay with PayPal
            </Button>
          )}
          <ConfirmDialog
            open={paypalWithdrawConfirm}
            onClose={() => setPaypalWithdrawConfirm(false)}
            onClick={handlePaypalPay}
          />
        </Grid>
      </Grid>
      <BottomBackground />

      <ToastContainer />
      <Footer />
    </>
  );
};

export default AccountBalance;
