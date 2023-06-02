import React, { useState } from "react";
import {
  Grid,
  Button,
  Box,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormControl,
  CircularProgress,
} from "@mui/material";
import TopBackground from "../components/postPropertyComponents/TopBackground.js";
import BottomBackground from "../components/postPropertyComponents/BottomBackground.js";
import { UserActions } from "../store/User.js";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { toastOptions } from "../utils/ToastOptions.js";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import roomyLogo from "../assets/roomyFinderLogo.jpg.png";

import { requestForToken } from "../firebase/index"; // Import the FCM token retrieval function

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);

  const emailInputHandler = (e) => {
    const emailValue = e.target.value;
    dispatch(UserActions.email(emailValue));
  };

  const passwordInputHandler = (e) => {
    dispatch(UserActions.password(e.target.value));
  };

  const loginHandler = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/auth/token",
        { email, password }
      );

      if (response.status === 200) {
        // Retrieve the FCM token for the user
        const fcmToken = (await requestForToken()) || "123456789";

        const loginResponse = await axios.post(
          "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/auth/login",
          { email, password, fcmToken }
        );

        const { data } = loginResponse;
        console.log(data);
        Cookies.set("user", JSON.stringify(data), { expires: 365 });
        localStorage.setItem("token", `bearer ${response.data.token}`);
        const expirationTimestamp = Date.parse(response.data.expireAt);
        localStorage.setItem("tokenExpiration", expirationTimestamp);

        dispatch(UserActions.isLoggedIn(true));
        dispatch(UserActions.firstName(data.firstName));
        dispatch(UserActions.lastName(data.lastName));
        dispatch(UserActions.email(data.email));
        dispatch(UserActions.fcmToken(data.fcmToken));
        dispatch(UserActions.gender(data.gender));
        dispatch(UserActions.country(data.country));
        toast.success("Login Successfully", toastOptions);
        navigate("/");
      } else {
        throw new Error("Please enter valid credentials");
      }
    } catch (error) {
      toast.error("Invalid credentials", toastOptions);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <TopBackground />
      <Grid container justifyContent="center" alignItems="center">
        <Grid
          item
          xs={12}
          sm={6}
          md={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            marginY: 4,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <img src={roomyLogo} alt="roomy logo" width={"100px"} />
          </Box>
          <Box
            sx={{
              px: 4,
              py: 3,
              bgcolor: "purple",
              borderRadius: "20px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "25px",
                textAlign: "center",
                color: "#fff",
                mb: 5,
              }}
            >
              Login
            </Typography>

            <Box>
              <Typography sx={{ color: "#fff" }}>Email</Typography>
              <TextField
                // label="Email"
                onChange={emailInputHandler}
                fullWidth
                placeholder="Email address"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ width: "20px" }}>
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  focused: false,
                }}
                sx={{
                  bgcolor: "white",
                  borderRadius: "20px", // Add borderRadius explicitly
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px", // Add borderRadius explicitly
                    "&:hover fieldset": {
                      borderColor: "transparent",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent",
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography sx={{ color: "#fff" }}>Password</Typography>
              <FormControl
                sx={{
                  width: "100%",
                  bgcolor: "white",
                  borderRadius: "20px", // Add borderRadius explicitly
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px", // Add borderRadius explicitly
                    "&:hover fieldset": {
                      borderColor: "transparent",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent",
                    },
                  },
                }}
              >
                <TextField // label="Email"
                  onChange={(e) => passwordInputHandler(e)}
                  fullWidth
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{
                          width: "20px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    focused: false,
                  }}
                  sx={{
                    bgcolor: "white",
                    borderRadius: "20px", // Add borderRadius explicitly
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px", // Add borderRadius explicitly
                      "&:hover fieldset": {
                        borderColor: "transparent",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "transparent",
                      },
                    },
                  }}
                />
              </FormControl>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={loginHandler}
                disabled={isLoading}
                sx={{
                  position: "relative",
                  bgcolor: "orange",
                  borderRadius: "20px",
                  color: "#fff",
                  "&:hover": { bgcolor: "orange" },
                }}
              >
                {isLoading && (
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
                Login
              </Button>
            </Box>
            <Box
              sx={{
                px: { xs: 0, sm: 2 },
                mt: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label>
                <input type="checkbox" />
                <span style={{ color: "orange" }}>Remember me</span>
              </label>
              <Button
                sx={{ color: "orange" }}
                onClick={() => navigate("/reset_password")}
              >
                Forgot Password
              </Button>
            </Box>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button
                sx={{ fontWeight: "600", color: "#fff" }}
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button>
              <Button
                sx={{ fontWeight: "600", color: "#fff" }}
                onClick={() => navigate("/")}
              >
                Skip
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {/* <Copyright sx={{ mt: 5 }} /> */}
      <BottomBackground />
      <ToastContainer />
    </div>
  );
};

export default Login;
