import React, { useState, useEffect } from "react";
import RoomyFinderLogo from "../../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Stack,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { UserActions } from "../../store/User";
import axios from "axios";
import Cookies from "js-cookie";
import Notification from "../Notifictions";
import { TenantActions } from "../../store/Tenant";

import male3 from "../../assets/maleAndFemaleImage/male4.png";
import female3 from "../../assets/maleAndFemaleImage/female4.png";
import tc_roomy_finder from "../../assets/Agreements/t&c_roomy_finder.pdf";
import privacy_policy_roomy_findner from "../../assets/Agreements/privacy_policy_roomy_findner.pdf";

import Countries from "../Countries";

// const pages = [
//   "About Us",
//   "Contact Us",
//   "Our Services",
//   "Post Property",
//   "Message",
// ];
// const pageNavigate = ["aboutUs", "contactUs", "", "postProperty", "chat"];

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");

  const [activeLink, setActiveLink] = useState("ourServices");
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState({});

  const settings = [
    "Edit Profile",
    "Home",
    "My Account",
    "Blogs",
    "Privacy Policy",
    "Terms & Conditions",
    "Logout",
  ];

  const pages = [
    "About Us",
    "Contact Us",
    "Our Services",
    user.type === "roommate" ? "Post Ad" : "Post Property",
    "Message",
  ];
  const pageNavigate = [
    "aboutUs",
    "contactUs",
    "",
    user.type === "roommate" ? "postAd" : "postProperty",
    "chat",
  ];

  const selectedCountry = useSelector((state) => state.room.country);

  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const handleClick = (link) => {
    dispatch(TenantActions.isEdit(false));
    dispatch(TenantActions.clear());
    setActiveLink(link);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    // await axios.put(
    //   "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/auth/update-fcm-token",
    //   { fcmToken: "123456789" },
    //   { headers: { Authorization: token } }
    // );
    Cookies.remove("user");
    dispatch(UserActions.isLoggedIn(false));
    localStorage.removeItem("token");
    setAnchorElUser(null);
  };

  const handleItemClick = (pageUrl) => {
    handleCloseUserMenu();
    navigate(`${pageUrl}`);
  };
  const handleItemClickOpenPDF = (item) => {
    if (item === "Terms & Conditions") {
      window.open(tc_roomy_finder);
    }
    if (item === "Privacy Policy") {
      window.open(privacy_policy_roomy_findner);
    }
  };
  let id = null;
  if (
    token &&
    tokenExpiration &&
    Date.now() < parseInt(tokenExpiration) &&
    Cookies.get("user")
  )
    id = JSON.parse(Cookies.get("user")).id;

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/profile/profile-info?userId=${id}`
      );
      Cookies.set("user", JSON.stringify(data), { expires: 365 });

      dispatch(UserActions.type(data.type));
    } catch (err) {
      console.log(err);
    }
  };

  const getUserFromCookies = () => {
    try {
      const user = Cookies.get("user");
      if (token && Date.now() < parseInt(tokenExpiration) && user) {
        return JSON.parse(user);
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token && Date.now() < parseInt(tokenExpiration)) {
      fetchUser();
    }

    const getUserData = async () => {
      if (localStorage.getItem("token")) {
        dispatch(UserActions.isLoggedIn(true));
      }

      const user = getUserFromCookies();
      if (token && user && Date.now() < parseInt(tokenExpiration)) {
        setUser(user);
        dispatch(UserActions.lastName(user.lastName));
        dispatch(UserActions.country(user.country));
        dispatch(UserActions.gender(user.gender));
        dispatch(UserActions.email(user.email));
        dispatch(UserActions.fcmToken(user.fcmToken));
        dispatch(UserActions?.firstName(user.firstName));
      }
    };

    getUserData();
  }, [token]);
  return (
    <div className="nav-container p-3 flex justify-between bg-white">
      <Notification />
      <NavLink to={"/"} className="flex align-content-center">
        <img
          src={RoomyFinderLogo}
          alt="Roomy finder logo"
          width={70}
          className="mr-2"
        />
        <Stack sx={{ margin: "auto" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bolder",
              color: "purple",
              display: { xs: "none", md: "flex" },
            }}
          >
            Roomy
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bolder",
              color: "orange",
              display: { xs: "none", md: "flex" },
            }}
          >
            FINDER
          </Typography>
        </Stack>
      </NavLink>

      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page, index) => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
              <NavLink to={`/${pageNavigate[index]}`}>
                <Typography
                  textAlign="center"
                  sx={{
                    color: "purple",
                  }}
                >
                  {page}
                </Typography>
              </NavLink>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ m: "auto", display: { xs: "none", md: "flex" } }}
      >
        <Button
          color={activeLink === "aboutUs" ? "primary" : "inherit"}
          sx={{
            borderRadius: "10px",
            fontWeight: "bold",
            color: activeLink === "aboutUs" ? "#fff" : "purple",
            backgroundColor:
              activeLink === "aboutUs" ? "purple" : "transparent",
            "&:hover": {
              backgroundColor: "purple",
              color: "#fff",
            },
          }}
          onClick={() => handleClick("aboutUs")}
          component={NavLink}
          to={"/aboutUs"}
        >
          About Us
        </Button>
        <Button
          color={activeLink === "ourServices" ? "primary" : "inherit"}
          sx={{
            borderRadius: "10px",
            fontWeight: "bold",
            color: activeLink === "ourServices" ? "#fff" : "purple",
            backgroundColor:
              activeLink === "ourServices" ? "purple" : "transparent",
            "&:hover": {
              backgroundColor: "purple",
              color: "#fff",
            },
          }}
          onClick={() => handleClick("ourServices")}
          component={NavLink}
          to={"/"}
        >
          Our Services
        </Button>
        <Button
          color={activeLink === "contactUs" ? "primary" : "inherit"}
          sx={{
            borderRadius: "10px",
            fontWeight: "bold",
            color: activeLink === "contactUs" ? "#fff" : "purple",
            backgroundColor:
              activeLink === "contactUs" ? "purple" : "transparent",
            "&:hover": {
              backgroundColor: "purple",
              color: "#fff",
            },
          }}
          onClick={() => handleClick("contactUs")}
          component={NavLink}
          to={"/contactUs"}
        >
          Contact Us
        </Button>
        <Button
          color={activeLink === "postProperty" ? "primary" : "inherit"}
          sx={{
            borderRadius: "10px",
            fontWeight: "bold",
            color: activeLink === "postProperty" ? "#fff" : "purple",
            backgroundColor:
              activeLink === "postProperty" ? "purple" : "transparent",
            "&:hover": {
              backgroundColor: "purple",
              color: "#fff",
            },
          }}
          onClick={() => {
            handleClick("postProperty");
          }}
          component={NavLink}
          to={user.type === "landlord" ? "/postProperty" : "/postAd"}
        >
          {user.type === "landlord" ? "Post Property" : "Post Ad"}
        </Button>
        <Button
          color={activeLink === "message" ? "primary" : "inherit"}
          sx={{
            borderRadius: "10px",
            fontWeight: "bold",
            color: activeLink === "message" ? "#fff" : "purple",
            backgroundColor:
              activeLink === "message" ? "purple" : "transparent",
            "&:hover": {
              backgroundColor: "purple",
              color: "#fff",
            },
          }}
          onClick={() => handleClick("message")}
          component={NavLink}
          to={"/chat"}
        >
          Message
        </Button>
      </Stack>
      <Grid sx={{ display: "flex", alignItems: "center" }}>
        <Countries />
      </Grid>

      {!isLoggedIn ||
      !token ||
      !tokenExpiration ||
      Date.now() >= parseInt(tokenExpiration) ? (
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Button
            variant="contained"
            color={activeLink === "login" ? "primary" : "inherit"}
            sx={{
              borderRadius: "10px",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "orange",
              border: "2px solid orange",
              "&:hover": {
                backgroundColor: "white",
                color: "orange",
              },
            }}
            onClick={() => handleClick("login")}
            component={NavLink}
            to={"/login"}
          >
            Login
          </Button>
          {isXsScreen && (
            <Button
              variant="contained"
              color={activeLink === "postProperty" ? "primary" : "inherit"}
              sx={{
                borderRadius: "10px",
                fontWeight: "bold",
                color: "orange",
                backgroundColor: "white",
                border: "2px solid orange",
                "&:hover": {
                  backgroundColor: "orange",
                  color: "white",
                },
              }}
              onClick={() => handleClick("signUp")}
              component={NavLink}
              to={"/signup"}
            >
              Sign Up
            </Button>
          )}
        </Stack>
      ) : (
        <Box sx={{ flexGrow: 0, display: "flex" }}>
          <Tooltip title="Open settings">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0, width: "50px" }}
            >
              <Avatar
                alt={`${user?.firstName} ${user?.lastName}`}
                src={
                  user?.profilePicture !== undefined || null
                    ? user?.profilePicture
                    : user?.gender === "Male"
                    ? male3
                    : female3
                }
                sx={{
                  width: 50,
                  height: 50,
                  mb: 1,
                  border: "2px solid purple",
                }}
              />
              {/* {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)} */}
              {/* </Avatar> */}
            </IconButton>
          </Tooltip>
          <Menu
            sx={{}}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <Grid sx={{ backgroundColor: "#ccc", padding: "20px" }}>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, width: "50px" }}
                >
                  <Avatar
                    alt={`${user?.firstName} ${user?.lastName}`}
                    src={
                      user?.profilePicture !== undefined || null
                        ? user?.profilePicture
                        : user?.gender === "Male"
                        ? male3
                        : female3
                    }
                    sx={{
                      width: 50,
                      height: 50,
                      mb: 1,
                      border: "2px solid purple",
                    }}
                  />
                  {/* {console.log(user,"user1234567")} */}
                  {/* {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)} */}
                  {/* {user?.gender ==="Male" ? } */}
                  {/* </Avatar> */}
                </IconButton>
                <Typography sx={{ fontWeight: "700" }}>
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography>{user?.type}</Typography>
              </Grid>

              {settings.map((setting) => {
                let onClickHandler = handleCloseUserMenu;

                if (setting === "Logout") {
                  onClickHandler = handleLogout;
                } else if (setting === "My Bookings") {
                  onClickHandler = () => handleItemClick("/myBookings");
                } else if (setting === "Home") {
                  onClickHandler = () => handleItemClick("/");
                } else if (setting === "Edit Profile") {
                  onClickHandler = () => handleItemClick("/editProfile");
                } else if (setting === "My Account") {
                  onClickHandler = () => handleItemClick("/myAccount");
                } else if (setting === "Blogs") {
                  onClickHandler = () => handleItemClick("/blogs");
                } else if (setting === "Privacy Policy") {
                  onClickHandler = () =>
                    handleItemClickOpenPDF("Privacy Policy");
                } else if (setting === "Terms & Conditions") {
                  onClickHandler = () =>
                    handleItemClickOpenPDF("Terms & Conditions");
                }

                return (
                  <MenuItem key={setting} onClick={onClickHandler}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                );
              })}
            </Grid>
          </Menu>
        </Box>
      )}
    </div>
  );
};

export default Nav;
