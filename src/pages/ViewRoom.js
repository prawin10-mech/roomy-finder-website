import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Card,
  CardMedia,
  MenuItem,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from "@mui/material";
import {
  NavigateNext as CustomNextIcon,
  NavigateBefore as CustomPrevIcon,
} from "@mui/icons-material";
import { Carousel } from "react-responsive-carousel";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import DummyImage from "../assets/demo.jpg";
import MyDatePicker from "./MyDatePicker";
import { toastOptions } from "../utils/ToastOptions";
import { SearchActions } from "../store/Search";
import TopBackground from "../components/postPropertyComponents/TopBackground";
import BottomBackground from "../components/postPropertyComponents/BottomBackground";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import people from "../assets/icons/age.png";
import nationality from "../assets/icons/Nationality.png";
import smoking from "../assets/icons/smoking.png";
import drinking from "../assets/icons/drinking.png";
import visitors from "../assets/icons/visitors.png";

import sendNotification from "../components/NotificationReceive";

import { amenitiesData } from "../utils/AmenitiesData";
import { PropertyActions } from "../store/Property";

const ViewRoom = () => {
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  const urlParams = new URLSearchParams(window.location.search);
  const active = urlParams.get("active");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [value, setValue] = useState("Monthly");

  const [bookedProperty, setBookedProperty] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const [confirmed, setConfirmed] = useState(false);
  const [preferredRentType, setPreferredRentType] = useState("Monthly");
  let user = Cookies.get("user");
  if (user) {
    user = JSON.parse(user);
  }

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width: 500px)");

  const rooms = useSelector((state) => state.search.availableRooms);
  const countryCode = useSelector((state) => state.room.country);
  const [room, setRoom] = useState(rooms.find((room) => room.id === id));

  const handleInputChange = (e) => {
    setValue(e.target.value);
    setPreferredRentType(e.target.value);
    setIsCarouselPlaying(false);
  };

  let checkOutDate = new Date(selectedDate);
  let totalDuration;

  if (value === "Monthly") {
    checkOutDate.setMonth(checkOutDate.getMonth() + 1);
    totalDuration = 1;
  } else if (value === "Weekly") {
    checkOutDate.setDate(checkOutDate.getDate() + 7);
    totalDuration = Math.ceil(
      (checkOutDate - new Date(selectedDate)) / (1000 * 60 * 60 * 24 * 7)
    );
  } else if (value === "Daily") {
    checkOutDate.setDate(checkOutDate.getDate() + 1);
    totalDuration = Math.ceil(
      (checkOutDate - new Date(selectedDate)) / (1000 * 60 * 60 * 24)
    );
  }

  const getPartitionRoomData = async () => {
    try {
      const { data } = await axios.post(
        "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/property-ad/available",
        { countryCode }
      );
      dispatch(SearchActions.availableRooms(data));

      setRoom(data.find((room) => room.id === id));
    } catch (err) {}
  };

  const handleDeleteAd = async (adId) => {
    try {
      await axios.delete(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/property-ad/${adId}`,
        { headers: { Authorization: token } }
      );
      toast.success("Property deleted successfully", toastOptions);
    } catch (err) {}
  };

  const handleBookRoom = async () => {
    if (!token && !user && Date.now() < parseInt(tokenExpiration)) {
      navigate("/login");
    } else {
      try {
        const obj = {
          quantity: totalDuration,
          adId: room._id,
          rentType: preferredRentType,
          checkIn: selectedDate,
          checkOut: checkOutDate,
        };

        const { data } = await axios.post(
          "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/bookings/property-ad",
          obj,
          { headers: { Authorization: token } }
        );
        if (data) {
          // sendNotification(
          //   "booking status",
          //   `Reminder: Dear ${room.poster.firstName} ${room.poster.lastName}, We are happy to tell you that a roommate, ${user.firstName} ${user.lastName} have book your property, ${room.type} in ${room.address.city}. Now, you can either accept or decline the booking.`,
          //   `${room.poster.fcmToken}`,
          //   `https://roomyfinder.com/myBookings/aboutBooking/${room.id}`,
          //   `${room?.images[0] ? `${room.images[0]}` : "null"}`
          // );
          setIsBooked(true);

          toast.success(
            "Your request has been send to landlord. Please go to 'My Bookings' and follow on with the status of the request",
            toastOptions
          );
          getMyBookings();
        } else {
          toast.error(
            "You have already booked this AD. Please check my bookings",
            toastOptions
          );
          // sendNotification(
          //   "booking status",
          //   "You have already booked this AD. Please check my bookings",
          //   `${room.poster.fcmToken}`
          // );
        }
      } catch (err) {
        if (err.response.status === 409) {
          // sendNotification(
          //   "booking status",
          //   "You have already booked this AD. Please check my bookings.",
          //   `${room.poster.fcmToken}`
          // );
          toast.error(
            "You have already booked this AD. Please check my bookings",
            toastOptions
          );
        }
        if (err.response.status === 400) {
          // sendNotification(
          //   "booking status",
          //   `Sorry! There is no more available unit in this ${room.type}`,
          //   `${room.poster.fcmToken}`
          // );
          toast.error(
            `Sorry! There is no more available unit in this ${room.type}`,
            toastOptions
          );
        }
      }
    }
  };

  const handleCancelBookRoom = async () => {
    setCancelDialogOpen(true);
  };

  const handleConfirmCancel = async (bookingId) => {
    try {
      await axios.post(
        "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/bookings/property-ad/tenant/cancel",
        { bookingId },
        { headers: { Authorization: token } }
      );
      setIsBooked(false);
      // sendNotification(
      //   "booking-cancelled",
      //   `Dear ${bookedProperty.ad.poster.firstName} ${
      //     bookedProperty.ad.poster.lastName
      //   }, a client just cancelled ${
      //     bookedProperty.poster.gender === "Male" ? "his" : "her"
      //   } booking of your property ${bookedProperty.ad.type} in ${
      //     bookedProperty.ad.address.city
      //   } `,
      //   `${bookedProperty.ad.poster.fcmToken}`
      // );

      setCancelDialogOpen(false);
    } catch (err) {}
  };

  const handleRejectCancel = () => {
    // Close the cancel dialog box
    setCancelDialogOpen(false);
  };

  const handleCancelBookRoom1 = async (bookingId) => {
    try {
      await axios.post(
        "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/bookings/property-ad/tenant/cancel",
        { bookingId },
        { headers: { Authorization: token } }
      );
      setIsBooked(false);
      // sendNotification(
      //   "booking-cancelled",
      //   `Dear ${bookedProperty.ad.poster.firstName} ${
      //     bookedProperty.ad.poster.lastName
      //   }, a client just cancelled ${
      //     bookedProperty.poster.gender === "Male" ? "his" : "her"
      //   } booking of your property ${bookedProperty.ad.type} in ${
      //     bookedProperty.ad.address.city
      //   } `,
      //   `${bookedProperty.ad.poster.fcmToken}`
      // );
    } catch (err) {}
  };

  const gotoEditOption = async (AdId) => {
    try {
      const { data } = await axios.get(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/property-ad/my-ads/${AdId}`,
        { headers: { Authorization: token } }
      );
      dispatch(PropertyActions.editedData(data));
      dispatch(PropertyActions.edit(true));
      navigate("/postProperty");
    } catch (err) {}
  };

  const getMyBookings = async () => {
    try {
      const { data } = await axios.get(
        "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/bookings/property-ad",
        { headers: { Authorization: token } }
      );
      const filterBookings = data.filter((booking) => {
        return booking.ad.id === id;
      });
      const bookedRoom = filterBookings.find(
        (booking) => booking.status === "pending"
      );

      if (bookedRoom) {
        setIsBooked(true);
        setBookedProperty(bookedRoom);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getPartitionRoomData();
    getMyBookings();
  }, []);

  return (
    <Grid sx={{ overFlowX: "hidden" }}>
      <TopBackground />
      <Box
        sx={{
          mx: "auto",
          maxWidth: "700px",
          my: 3,
          px: 1,
          overFlowX: "hidden",
        }}
      >
        <Card
          sx={{
            display: "flex",
            // bgcolor: "#f1f1f2",
            borderRadius: "20px",
            width: "100%",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            mb: 3,
            position: "relative",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          {active && (
            <Button
              style={{
                color: "slategray",
                position: "absolute",
                top: "10px",
                right: "60px",
                zIndex: 1,
              }}
              sx={{ borderRadius: "15px" }}
              onClick={() => gotoEditOption(room.id)}
            >
              <EditIcon />
            </Button>
          )}
          {active && (
            <Button
              style={{
                color: "slategray",
                position: "absolute",
                top: "10px",
                right: "15px",
                zIndex: 1,
              }}
              sx={{ borderRadius: "15px" }}
              onClick={() => setConfirmed(true)}
            >
              <DeleteIcon />
            </Button>
          )}

          {confirmed && (
            <Dialog open={confirmed} onClose={() => setConfirmed(false)}>
              <DialogTitle fontWeight={700}>
                Confirm Property Deletion
              </DialogTitle>
              <DialogContent>
                <Typography variant="body1">
                  Please confirm for deleting this Property
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setConfirmed(false)}>Cancel</Button>
                <Button
                  onClick={() => handleDeleteAd(room.id)}
                  color="error"
                  variant="contained"
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          )}

          {room && (
            <Box
              sx={{
                width: { xs: "100%", sm: "60%" },
                height: "200px",
                display: "flex",
                alignItems: "center",
                p: 2,
                my: 5,
              }}
            >
              <Carousel
                autoPlay
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                  hasPrev && (
                    <button
                      type="button"
                      onClick={onClickHandler}
                      title={label}
                      style={{
                        position: "absolute",
                        zIndex: 2,
                        left: 15,
                        top: "60%",
                        transform: "translateY(-50%)",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <CustomPrevIcon style={{ fontSize: 40 }} />
                    </button>
                  )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                  hasNext && (
                    <button
                      type="button"
                      onClick={onClickHandler}
                      title={label}
                      style={{
                        position: "absolute",
                        zIndex: 2,
                        right: 15,
                        top: "60%",
                        transform: "translateY(-50%)",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <CustomNextIcon style={{ fontSize: 40 }} />
                    </button>
                  )
                }
              >
                {room?.images.length > 0 ? (
                  room.images.map((image, index) => (
                    <CardMedia
                      key={index}
                      component="img"
                      height="100%"
                      width="100%"
                      image={image}
                      alt={`available room ${index}`}
                      sx={{
                        objectFit: "cover",
                        objectPosition: "center",
                        mt: 5,
                        width: "300px",
                        height: "250px",
                        borderRadius: "15px",
                      }}
                    />
                  ))
                ) : (
                  <CardMedia
                    component="img"
                    sx={{
                      width: "100%",
                      height: "100%",
                      maxHeight: { xs: "250px", sm: "300px", md: "300px" },
                      padding: "10px",
                      borderRadius: "20px",
                      display: "flex",
                    }}
                    image={DummyImage}
                    alt={"DummyImage"}
                  />
                )}
              </Carousel>
            </Box>
          )}

          {room && (
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <Box
                gap={1}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: { xs: "row", sm: "column" },
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "1.2rem" }}>
                    {room?.type}
                  </Typography>
                  <Typography sx={{ fontSize: "1.1rem" }}>
                    {room?.address?.buildingName}, {room?.address?.location},{" "}
                    {room?.address?.city}
                  </Typography>
                  <Grid container>
                    <Typography
                      sx={{ mt: 1, fontWeight: 700, fontSize: "1.2rem" }}
                    >
                      {(
                        room?.monthlyPrice +
                        0.1 * room?.monthlyPrice
                      ).toLocaleString()}{" "}
                      <span style={{ fontWeight: 700, fontSize: "0.8rem" }}>
                        AED{" "}
                      </span>
                      / Month
                    </Typography>
                  </Grid>
                </Box>
                <Box
                  gap={2}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "row", sm: "column" },
                  }}
                >
                  <Typography sx={{ color: "#00b300", fontWeight: 700 }}>
                    Available {room?.quantity - room?.quantityTaken}
                  </Typography>
                  <Typography sx={{ color: "red", fontWeight: 700 }}>
                    Taken {room?.quantityTaken}
                  </Typography>
                </Box>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              ></Box>
            </Box>
          )}
        </Card>
        <hr style={{ margin: "20px 0" }} />

        <Box mb={5}>
          <Typography fontWeight={700} mb={2} fontSize={"1.3rem"}>
            Room Overview
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Grid
                container
                alignItems={"center"}
                gap={1}
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
                <Grid>
                  <img
                    src={people}
                    alt="peoples"
                    width={isSmallScreen ? "30px" : "40px"}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    People
                  </Typography>
                  <Typography sx={{ fontWeight: "700" }}>
                    {room?.socialPreferences?.numberOfPeople}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid
                container
                alignItems={"center"}
                gap={1}
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
                <Grid>
                  <img
                    src={nationality}
                    alt="nationality"
                    width={isSmallScreen ? "22px" : "40px"}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Nationality
                  </Typography>
                  <Typography sx={{ fontWeight: "700" }}>
                    {room?.socialPreferences?.nationality}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid
                container
                alignItems={"center"}
                gap={1}
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
                <Grid>
                  <img
                    src={smoking}
                    alt="smoking"
                    width={isSmallScreen ? "30px" : "40px"}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Smoking
                  </Typography>
                  <Typography sx={{ fontWeight: "700" }}>
                    {room?.socialPreferences?.smoking ? "Yes" : "No"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid
                container
                alignItems={"center"}
                gap={1}
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
                <Grid>
                  <img
                    src={people}
                    alt="gender"
                    width={isSmallScreen ? "30px" : "40px"}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Gender
                  </Typography>
                  <Typography sx={{ fontWeight: "700" }}>
                    {room?.socialPreferences?.gender}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid
                container
                alignItems={"center"}
                gap={1}
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
                <Grid>
                  <img
                    src={drinking}
                    alt="drinking"
                    width={isSmallScreen ? "30px" : "40px"}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Drinking:
                  </Typography>
                  <Typography sx={{ fontWeight: "700" }}>
                    {room?.socialPreferences?.drinking ? "Yes" : "No"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid
                container
                alignItems={"center"}
                gap={1}
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
                <Grid>
                  <img
                    src={visitors}
                    alt="visitors"
                    width={isSmallScreen ? "30px" : "40px"}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Visitors
                  </Typography>
                  <Typography sx={{ fontWeight: "700" }}>
                    {room?.socialPreferences?.visitors ? "Yes" : "No"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <hr style={{ margin: "20px 0" }} />

        <Box mb={5}>
          <Typography fontWeight={700} fontSize={"1.3rem"}>
            Amenities
          </Typography>
          <Grid container spacing={2} sx={{ mx: "auto" }}>
            {room?.amenities?.map((data) => {
              const amenity = amenitiesData[data];
              return (
                <Grid item key={data} xs={4} sm={4} md={4} lg={4}>
                  <Grid
                    container
                    alignItems="center"
                    gap={1}
                    sx={{ flexDirection: { xs: "column", sm: "row" } }}
                  >
                    <Grid item>
                      {amenity ? (
                        <img src={amenity} alt={data} width="40px" />
                      ) : (
                        <img src={data} alt={data} width="40px" />
                      )}
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        {data}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <hr style={{ margin: "20px 0" }} />

        <Box sx={{}}>
          <Typography fontWeight={700} fontSize={"1.3rem"} mb={2}>
            Booking Details
          </Typography>
          <Grid container spacing={2} alignItems={"center"} sx={{ mx: "auto" }}>
            <Grid item xs={4}>
              <Typography fontWeight={600}>Price</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Monthly</Typography>
              <Typography>Weekly</Typography>
              <Typography>Daily</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                {(
                  room?.monthlyPrice +
                  0.1 * room?.monthlyPrice
                ).toLocaleString()}{" "}
                AED
              </Typography>
              <Typography>
                {(room?.weeklyPrice + 0.1 * room?.weeklyPrice).toLocaleString()}{" "}
                AED
              </Typography>
              <Typography>
                {(room?.dailyPrice + 0.05 * room?.dailyPrice).toLocaleString()}{" "}
                AED
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems={"center"} sx={{ mx: "auto" }}>
            <Grid item xs={4}>
              <Typography fontWeight={600}>Deposit</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                {room?.deposit && room?.deposit === true ? "Yes" : "No"}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                {room?.deposit && room?.depositPrice
                  ? `${room?.depositPrice.toLocaleString()} AED`
                  : "N/A"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <hr style={{ margin: "20px 0" }} />

        {user?.type === "roommate" && (
          <Box sx={{ mt: 5 }}>
            <Typography fontWeight={700} fontSize={"1.3rem"} mb={2}>
              Date
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={"Choose rent type"}
                  variant="outlined"
                  select
                  value={value}
                  onChange={(e) => handleInputChange(e)}
                  sx={{ width: "100%" }}
                >
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Daily">Daily</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Grid container spacing={2} my={2}>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                }}
                gap={2}
              >
                <Grid>
                  <Typography>
                    CheckIn:{" "}
                    <Box
                      sx={{
                        border: "1px solid purple",
                        borderRadius: "10px",
                        p: 1,
                      }}
                    >
                      <MyDatePicker date={selectedDate} />
                    </Box>
                  </Typography>
                </Grid>
                <Grid>
                  <Typography>
                    Check Out:{" "}
                    <Box
                      sx={{
                        border: "1px solid purple",
                        borderRadius: "10px",
                        p: 1,
                      }}
                    >
                      <MyDatePicker date={checkOutDate} />
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <hr style={{ margin: "20px 0" }} />
          </Box>
        )}
        <Grid item xs={4}>
          <Grid container alignItems={"center"} gap={1}>
            <Grid item>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: "700" }}>
                Description
              </Typography>
              <Typography sx={{}}>{room?.description}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }}>
          <Typography fontWeight={700} fontSize={"1.3rem"} mb={2}>
            Location
          </Typography>
          <Grid container spacing={2} alignItems={"center"} sx={{ mx: "auto" }}>
            <Grid item xs={4} sm={6} md={4}>
              <Typography>
                {room?.address?.buildingName}, {room?.address?.location},{" "}
                {room?.address?.city}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {user?.type === "roommate" && !isBooked && (
          <Grid item sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBookRoom}
              sx={{
                bgcolor: "orange",
                color: "#fff",
                borderRadius: "20px",
                "&:hover": {
                  color: "deepOrange",
                  bgcolor: "darkOrange",
                },
              }}
            >
              Book now
            </Button>
          </Grid>
        )}
        {user?.type === "roommate" && isBooked && (
          <Grid item sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => handleCancelBookRoom()}
              variant="contained"
              color="error"
              sx={{
                bgcolor: "orange",
                color: "#fff",
                borderRadius: "20px",
                "&:hover": {
                  color: "deepOrange",
                  bgcolor: "darkOrange",
                },
              }}
            >
              Cancel Booking
            </Button>
          </Grid>
        )}
        <Dialog open={cancelDialogOpen} onClose={handleRejectCancel}>
          <DialogTitle>Cancel Booking</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to cancel the booking?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRejectCancel}>Cancel</Button>
            <Button
              onClick={() => handleConfirmCancel(bookedProperty.id)}
              color="error"
              variant="contained"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <ToastContainer />
      </Box>
      <BottomBackground />
    </Grid>
  );
};

export default ViewRoom;
