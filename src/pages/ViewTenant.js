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
import {
  NavigateNext as CustomNextIcon,
  NavigateBefore as CustomPrevIcon,
} from "@mui/icons-material";
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

  const handleOpenChat = () => {
    if (room) {
      navigate(`/directchat/${room.poster.id}`, {
        state: { property: room, type: room.poster.type },
      });
    }
  };

  console.log(room);

  return (
    <Grid sx={{ overFlowX: "hidden" }}>
      <TopBackground />
      <Box
        sx={{
          mx: "auto",
          maxWidth: { xs: "95%", md: "70%", lg: "60%" },
          my: 3,
          px: 1,
          overFlowX: "hidden",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            borderRadius: "20px",
            width: "100%",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-around",
            mb: 3,
            position: "relative",
            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.5)",
          }}
        >
          {room && (
            <Grid>
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
            </Grid>
          )}

          {room && (
            <Grid
            // sx={{
            //   display: "flex",
            //   justifyContent: "center",
            //   alignItems: "center",
            //   flexDirection: "column",
            //   margin: "auto",
            // }}
            >
              <Grid
                gap={1}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: { xs: "row", sm: "column" },
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                <Grid sx={{}}>
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
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    ml: { xs: 0, sm: 2 }, // Added marginLeft for spacing on smaller screens
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
                  <Typography sx={{ mt: 1, fontWeight: 700 }}>
                    {room?.budget.toLocaleString()} AED Budget
                  </Typography>
                </Grid>
              </Grid>
              {room && (
                <Grid
                  sx={{
                    height: "30px",
                    display: "flex",
                    justifyContent: "center",
                    mr: { xs: 2, sm: 0 },
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
                      onClick={() => {
                        handleOpenChat(room.poster.id);
                      }}
                    >
                      Chat
                    </Button>
                  )}
                </Grid>
              )}

              <Divider orientation="vertical" flexItem />
            </Grid>
          )}
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
        </Grid>

        <hr style={{ margin: "20px 0" }} />

        <Box mb={5}>
          <Typography fontWeight={700}>About Me</Typography>
          {room && (
            <Grid container spacing={1} sx={{}}>
              {room?.aboutYou?.age && (
                <Grid item xs={4} sm={4} md={4}>
                  <Grid
                    container
                    gap={1}
                    sx={{ flexDirection: { xs: "column", sm: "row" } }}
                  >
                    <Grid item>
                      <img src={people} alt="peoples" width="30px" />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        Age
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { xs: "13px", sm: "1rem" },
                        }}
                      >
                        {room.aboutYou.age}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {room?.aboutYou?.occupation && (
                <Grid item xs={4} sm={4} md={4}>
                  <Grid
                    container
                    gap={1}
                    sx={{ flexDirection: { xs: "column", sm: "row" } }}
                  >
                    <Grid item>
                      <img src={occupation} alt="occupation" width="30px" />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        Occupation
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { xs: "12px", sm: "1rem" },
                        }}
                      >
                        {room.aboutYou.occupation}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {room?.aboutYou?.astrologicalSign && (
                <Grid item xs={4} sm={4} md={4}>
                  <Grid
                    container
                    gap={1}
                    sx={{ flexDirection: { xs: "column", sm: "row" } }}
                  >
                    <Grid item>
                      <img src={sign} alt="astrological sign" width="30px" />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        Sign
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { xs: "12px", sm: "1rem" },
                        }}
                      >
                        {room.aboutYou.astrologicalSign}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {room?.aboutYou?.gender && (
                <Grid item xs={4} sm={4} md={4}>
                  <Grid
                    container
                    gap={1}
                    sx={{ flexDirection: { xs: "column", sm: "row" } }}
                  >
                    <Grid item>
                      <img
                        src={gender}
                        alt="gender"
                        width="30px"
                        color="black"
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        Gender
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { xs: "12px", sm: "1rem" },
                        }}
                      >
                        {room.aboutYou.gender}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {room?.poster?.country && (
                <Grid item xs={4} sm={4} md={4}>
                  <Grid
                    container
                    gap={1}
                    sx={{ flexDirection: { xs: "column", sm: "row" } }}
                  >
                    <Grid item>
                      <img src={nationality} alt="nationality" width="25px" />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        Nationality
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { xs: "12px", sm: "1rem" },
                        }}
                      >
                        {room.poster.country}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {room?.aboutYou?.lifeStyle && (
                <Grid item xs={4} sm={4} md={4}>
                  <Grid
                    container
                    gap={1}
                    sx={{ flexDirection: { xs: "column", sm: "row" } }}
                  >
                    <Grid item>
                      <img src={lifestyle} alt="lifestyle" width="30px" />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        Lifestyles:
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { xs: "12px", sm: "1rem" },
                        }}
                      >
                        {room.aboutYou.lifeStyle}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {room?.aboutYou?.languages.length !== 0 && (
                <Grid item xs={4} sm={4} md={4}>
                  <Grid
                    container
                    gap={1}
                    sx={{ flexDirection: { xs: "column", sm: "row" } }}
                  >
                    <Grid item>
                      <img src={language} alt="languages" width="30px" />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        Languages
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: { xs: "12px", sm: "1rem" },
                          whiteSpace: "pre-wrap",
                          wordWrap: "break-word",
                        }}
                      >
                        {room.aboutYou.languages.join(", ")}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          )}
        </Box>

        <hr style={{ margin: "10px 0" }} />

        <Box mb={5}>
          <Typography fontWeight={700}>Preffered Roommate</Typography>
          <Grid container spacing={2} sx={{ mx: "auto" }}>
            <Grid item xs={4} sm={4} md={4}>
              <Grid
                container
                gap={1}
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
                <Grid>
                  <img src={gender} alt="gender" width={"30px"} />
                </Grid>
                <Grid>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Gender
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: { xs: "12px", sm: "1rem" },
                    }}
                  >
                    {room?.aboutYou?.gender ? room?.aboutYou?.gender : "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Grid
                container
                gap={1}
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
                <Grid>
                  <img src={nationality} alt="nationality" width={"30px"} />
                </Grid>
                <Grid>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Nationality
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: { xs: "12px", sm: "1rem" },
                    }}
                  >
                    {room?.aboutYou?.nationality
                      ? room?.aboutYou?.nationality
                      : "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Grid
                container
                gap={1}
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
                <Grid>
                  <img src={language} alt="languages" width={"30px"} />
                </Grid>
                <Grid>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    languages
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: { xs: "12px", sm: "1rem" },
                      display: "flex",
                      textWrap: "flex-wrap",
                    }}
                  >
                    {room?.aboutYou?.languages.length !== 0
                      ? room?.aboutYou?.languages.join(", ")
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
            <Grid item xs={4} sm={4} md={4}>
              <Grid
                container
                gap={1}
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
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
            <Grid item xs={4} sm={4} md={4}>
              <Grid
                container
                gap={1}
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
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
            <Grid item xs={4} sm={4} md={4}>
              <Grid
                container
                gap={1}
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
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
            <Grid item xs={4} sm={4} md={4}>
              <Grid
                container
                gap={1}
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
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
            <Grid item xs={4} sm={4} md={4}>
              <Grid
                container
                gap={1}
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
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
              {room?.amenities?.map((data, index) => {
                const amenity = amenitiesData[data];
                return (
                  <Grid item key={data} xs={4} sm={4} md={4}>
                    <Grid
                      container
                      gap={1}
                      sx={{ flexDirection: { xs: "column", sm: "row" } }}
                    >
                      <Grid item>
                        {amenity ? (
                          <img src={amenity} alt={data} width="30px" />
                        ) : (
                          <img src={data} alt={data} width="40px" />
                        )}
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body1"
                          sx={{ mb: 1, display: "flex", wrap: "flex-wrap" }}
                        >
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
            <Grid container justifyContent="center">
              {room?.interests?.map((data) => {
                const interest = InterestsData[data];
                return (
                  <Grid
                    item
                    xs={3.5}
                    sm={3.5}
                    md={2.5}
                    sx={{
                      fontSize: { xs: "0.5rem", sm: "1rem" },
                      borderRadius: "20px",
                      boxShadow: "0px 0px 15px rgba(0,0,0,0.5)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      m: { xs: 0.5, sm: 1, md: 2 },
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
