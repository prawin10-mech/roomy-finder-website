import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Card,
  CardMedia,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import Cookies from "js-cookie";
import EditIcon from "@mui/icons-material/Edit";
import DummyImage from "../assets/demo.jpg";
import { SearchActions } from "../store/Search";
import TopBackground from "../components/postPropertyComponents/TopBackground";
import BottomBackground from "../components/postPropertyComponents/BottomBackground";
import DummyMaleUserImage from "../assets/dummyUserImage.jpg";
import DummyFemaleUserImage from "../assets/dummyFemaleUserImage.jpg";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../utils/ToastOptions";

import people from "../assets/icons/age.png";
import gender from "../assets/icons/gender.png";
import smoking from "../assets/icons/smoking.png";
import drinking from "../assets/icons/drinking.png";
import visitors from "../assets/icons/visitors.png";
import occupation from "../assets/icons/Occupation.png";
import sign from "../assets/icons/sign.png";
import pets from "../assets/icons/pets.png";
import party from "../assets/icons/party.png";
import nationality from "../assets/icons/Nationality.png";
import lifestyle from "../assets/icons/lifestyle.png";
import language from "../assets/icons/languages.png";

import { amenitiesData } from "../utils/AmenitiesData";
import { InterestsData } from "../utils/InterestsData";
import { TenantActions } from "../store/Tenant";

const ViewRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const urlParams = new URLSearchParams(window.location.search);
  const active = urlParams.get("active");
  const [confirmed, setConfirmed] = useState(false);
  let user = Cookies.get("user");
  if (user) {
    user = JSON.parse(user);
  }

  const rooms = useSelector((state) => state.search.availableRooms);
  const countryCode = useSelector((state) => state.room.country);
  const [room, setRoom] = useState(rooms.find((room) => room.id === id));

  // const {
  //   type,
  //   rentType,
  //   action,
  //   budget,
  //   description,
  //   movingDate,
  //   images,
  //   videos,
  //   amenities,
  //   interests,
  //   country,
  //   city,
  //   location,
  //   yourNationality,
  //   yourAstrologicalSign,
  //   yourAge,
  //   yourGender,
  //   yourOccupation,
  //   yourLanguages,
  //   yourLifeStyle,

  //   gender,
  //   lifeStyle,
  //   grouping,
  //   nationality,
  //   numberOfPeople,
  //   smoking,
  //   drinking,
  //   visitors,
  //   cooking,
  //   pets,
  //   party,
  // } = useSelector((state) => state.tenant);

  const getPartitionRoomData = async () => {
    try {
      const { data } = await axios.post(
        "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/roommate-ad/available",
        { countryCode }
      );

      dispatch(SearchActions.availableRooms(data));

      setRoom(data.find((room) => room.id === id));
    } catch (err) {}
  };

  useEffect(() => {
    getPartitionRoomData();
  }, []);

  const handleDeleteAd = async (adId) => {
    try {
      await axios.delete(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/roommate-ad/${adId}`,
        { headers: { Authorization: token } }
      );
      toast.success("Ad deleted successfully", toastOptions);
    } catch (err) {
    } finally {
      setConfirmed(false);
    }
  };

  const editPostAd = async () => {
    const { data } = await axios.get(
      `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/roommate-ad/my-ads/${id}`,
      { headers: { Authorization: token } }
    );

    dispatch(TenantActions.editTenant(data));
    dispatch(TenantActions.isEdit(true));
    navigate("/postAd");
  };

  return (
    <Grid sx={{ overFlowX: "hidden" }}>
      <TopBackground />
      <Box
        sx={{
          mx: "auto",
          maxWidth: "70%",
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
            // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
            boxShadow: "0px 0px 15px  rgba(0,0,0,0.5)",
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
              onClick={() => editPostAd()}
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
                right: "20px",
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
              <DialogTitle fontWeight={700}>Confirm AD Deletion</DialogTitle>
              <DialogContent>
                <Typography variant="body1">
                  Please confirm for deleting this Ad
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
              <Carousel autoPlay>
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
                <Box sx={{ ml: -3 }}>
                  <Avatar sx={{ width: 150, height: 150 }}>
                    {room?.profilePicture ? (
                      <img src={room.profilePicture} alt="Room Profile" />
                    ) : (
                      <img
                        src={
                          room?.poster?.gender === "Male"
                            ? DummyMaleUserImage
                            : DummyFemaleUserImage
                        }
                        alt="Dummy User"
                      />
                    )}
                  </Avatar>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography sx={{ fontWeight: 700 }}>
                    {room?.poster?.firstName} {room?.poster?.lastName}
                  </Typography>
                  <Typography>{room?.action}</Typography>
                  <Typography>
                    {room?.address?.buildingName
                      ? room?.address?.buildingName
                      : "N/A"}
                    , {room?.address?.location}, {room?.address?.city}
                  </Typography>
                </Box>
                <Box>
                  {/* {!active && (
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: 15,
                        bgcolor: "orange",
                        width: "100px",
                        color: "#fff",
                        fontWeight: "700",
                        "&:hover": {
                          bgcolor: "#ff9900",
                        },
                      }}
                    >
                      Chat
                    </Button>
                  )} */}
                  <Typography sx={{ mt: 1, fontWeight: 700 }}>
                    {room?.budget.toLocaleString()} AED Budget
                  </Typography>
                </Box>
              </Box>

              <Divider orientation="vertical" flexItem />
              {/* <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              ></Box> */}
            </Box>
          )}
          {room && (
            <Box
              sx={{
                height: "30px",
                display: "flex",
                position: "absolute",
                mr: "50px",
                bottom: 0,
                right: 0,
                mb: 2,
              }}
            >
              {!active && (
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 15,
                    bgcolor: "orange",
                    width: "100px",
                    color: "#fff",
                    fontWeight: "700",
                    "&:hover": {
                      bgcolor: "#ff9900",
                    },
                  }}
                >
                  Chat
                </Button>
              )}
            </Box>
          )}
        </Card>
        <hr style={{ margin: "20px 0" }} />

        <Box mb={5}>
          <Typography fontWeight={700}>About Me</Typography>
          <Grid container spacing={2} sx={{ mx: "auto", px: 1 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Grid container alignItems="center" gap={1}>
                <Grid item>
                  <img src={people} alt="peoples" width="40px" />
                </Grid>
                <Grid item>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Age
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    {room?.aboutYou?.age ? room?.aboutYou?.age : "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Grid container alignItems="center" gap={1}>
                <Grid item>
                  <img src={occupation} alt="occupation" width="40px" />
                </Grid>
                <Grid item>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Occupation
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    {room?.aboutYou?.occupation
                      ? room?.aboutYou?.occupation
                      : "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Grid container alignItems="center" gap={1}>
                <Grid item>
                  <img src={sign} alt="astrological sign" width="40px" />
                </Grid>
                <Grid item>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Sign
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    {room?.aboutYou?.astrologicalSign
                      ? room?.aboutYou?.astrologicalSign
                      : "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Grid container alignItems={"center"} gap={1}>
                <Grid>
                  <img src={gender} alt="gender" width={"40px"} color="black" />
                </Grid>
                <Grid>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Gender
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    {room?.aboutYou?.gender ? room?.aboutYou?.gender : "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Grid container alignItems={"center"} gap={1}>
                <Grid>
                  <img src={nationality} alt="nationality" width={"40px"} />
                </Grid>
                <Grid>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Nationality
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    {room?.poster?.country ? room?.poster?.country : "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Grid container alignItems={"center"} gap={1}>
                <Grid>
                  <img src={lifestyle} alt="lifestyle" width={"40px"} />
                </Grid>
                <Grid>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Lifestyles:
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    {room?.aboutYou?.lifeStyle
                      ? room?.aboutYou?.lifeStyle
                      : "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Grid container alignItems={"center"} gap={1}>
                <Grid>
                  <img src={language} alt="languages" width={"40px"} />
                </Grid>
                <Grid>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    languages
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    {room?.aboutYou?.languages.length !== 0
                      ? room?.aboutYou?.languages.join(",")
                      : "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <hr style={{ margin: "10px 0" }} />

        <Box mb={5}>
          <Typography fontWeight={700}>Preffered Roommate</Typography>
          <Grid container spacing={2} sx={{ mx: "auto" }}>
            <Grid item xs={12} sm={6} md={4}>
              <Grid container alignItems={"center"} gap={1}>
                <Grid>
                  <img src={gender} alt="gender" width={"40px"} />
                </Grid>
                <Grid>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Gender
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    {room?.aboutYou?.gender ? room?.aboutYou?.gender : "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Grid container alignItems={"center"} gap={1}>
                <Grid>
                  <img src={nationality} alt="nationality" width={"40px"} />
                </Grid>
                <Grid>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Nationality
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    {room?.aboutYou?.nationality
                      ? room?.aboutYou?.nationality
                      : "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Grid container alignItems={"center"} gap={1}>
                <Grid>
                  <img src={language} alt="languages" width={"40px"} />
                </Grid>
                <Grid>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    languages
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    {room?.aboutYou?.languages.length !== 0
                      ? room?.aboutYou?.languages.join(",")
                      : "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <hr style={{ margin: "10px 0" }} />

        <Box sx={{ mb: 2 }}>
          <Typography fontWeight={700} mb={2}>
            Sharing/Housing Preferences
          </Typography>
          <Grid container spacing={2} alignItems={"center"} sx={{ mx: "auto" }}>
            <Grid item xs={12} sm={6} md={4}>
              <Grid container alignItems={"center"} gap={1}>
                <Grid>
                  <img src={pets} alt="pets" width={"40px"} />
                </Grid>
                <Grid>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Pets
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: room?.socialPreferences?.pets ? "green" : "red",
                    }}
                  >
                    {room?.socialPreferences?.pets === true ? "Yes" : "No"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Grid container alignItems={"center"} gap={1}>
                <Grid>
                  <img src={smoking} alt="smoking" width={"40px"} />
                </Grid>
                <Grid>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Smoking
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: room?.socialPreferences?.smoking ? "green" : "red",
                    }}
                  >
                    {room?.socialPreferences?.smoking === true ? "Yes" : "No"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Grid container alignItems={"center"} gap={1}>
                <Grid>
                  <img src={party} alt="party" width={"40px"} />
                </Grid>
                <Grid>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Party:
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: room?.socialPreferences?.friendParty
                        ? "green"
                        : "red",
                    }}
                  >
                    {room?.socialPreferences?.friendParty === true
                      ? "Yes"
                      : "No"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Grid container alignItems={"center"} gap={1}>
                <Grid>
                  <img src={drinking} alt="drinking" width={"40px"} />
                </Grid>
                <Grid>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Drinking:
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: room?.socialPreferences?.drinking
                        ? "green"
                        : "red",
                    }}
                  >
                    {room?.socialPreferences?.drinking === true ? "Yes" : "No"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Grid container alignItems={"center"} gap={1}>
                <Grid>
                  <img src={visitors} alt="visitors" width={"40px"} />
                </Grid>
                <Grid>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Visitors:
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: room?.socialPreferences?.visitors
                        ? "green"
                        : "red",
                    }}
                  >
                    {room?.socialPreferences?.visitors === true ? "Yes" : "No"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <hr style={{ margin: "10px 0" }} />

          <Box mb={5}>
            <Typography fontWeight={700} mb={2} fontSize={"1.3rem"}>
              Amenities
            </Typography>
            <Grid container spacing={2} sx={{ mx: "auto" }}>
              {room?.amenities?.map((data) => {
                const amenity = amenitiesData[data];
                return (
                  <Grid item key={data} xs={12} sm={6} md={4}>
                    <Grid container alignItems="center" gap={1}>
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
          <hr fontWeight="600" />

          <Box mb={5}>
            <Typography fontWeight={700} mb={2}>
              Interests
            </Typography>
            <Grid
              container
              justifyContent={"center"}
              gap={3}
              sx={{ mx: "auto" }}
            >
              {room?.interests?.map((data) => {
                const interest = InterestsData[data];
                return (
                  <Grid
                    item
                    xs={3} // Change xs={3} to xs={12} sm={6} md={3} to display 4 items per row
                    sm={2.5}
                    md={2.5}
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "1.2rem" },
                      borderRadius: "20px",
                      boxShadow: "0px 0px 15px  rgba(0,0,0,0.5)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Grid item>
                      {interest ? (
                        <img
                          src={interest}
                          alt={data}
                          width="40px"
                          height="40px"
                        />
                      ) : (
                        <img src={data} alt={data} width="40px" />
                      )}
                    </Grid>
                    <Grid item sx={{ mt: 1 }}>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        {data}
                      </Typography>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </Box>
      <BottomBackground />
      <ToastContainer />
    </Grid>
  );
};

export default ViewRoom;
