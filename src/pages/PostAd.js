import {
  Box,
  Grid,
  TextField,
  Typography,
  Chip,
  MenuItem,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TenantActions } from "../store/Tenant";
import InputDropDown from "../components/postAdComponents/InputDropDownNew";
import TextInput from "../components/postAdComponents/TextInput";
import { allNationalities } from "../utils/AllNationalities";
import { availableLanguages } from "../utils/availableLanguages";
import ImageInput from "../components/postAdComponents/ImageInputNew";
// import CameraInputNew from "../components/postAdComponents/CameraInputNew";
import VideoInput from "../components/postAdComponents/VideoInputNew";
import {
  citydata,
  dubaiCities,
  abuDahbiCities,
  sharjahCities,
  rasAlkimaCities,
  ummAlQuwainCities,
  ajmanCities,
  jeddahCities,
  meccaCities,
  riyadhCities,
} from "../utils/citydata";
import { astrologySigns } from "../utils/AstorologicalSigns";
import { allAmenities, interestData } from "../utils/AllAmenities";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../utils/ToastOptions";

import smokingimg from "../assets/icons/smoking.png";
import smokingimg2 from "../assets/Roommate Ad display UI/sclkndslj.png";

import drinkingimg from "../assets/icons/drinking.png";
import drinkingimg2 from "../assets/comfortable with icon in post roommate Ad/1kjnwklcvde.png";

import petsimg from "../assets/icons/pets.png";
import petsimg2 from "../assets/comfortable with icon in post roommate Ad/s3cdsc.png";

import visitorimg from "../assets/icons/visitors.png";
import visitorimg2 from "../assets/Roommate Ad display UI/wcdewd.png";

import partyimg from "../assets/icons/party.png";
import partyimg2 from "../assets/comfortable with in Post property/sclkndslj.png";

import owlimg from "../assets/Lifestyle icon in roommate ad/owl1.png";
import owlimg2 from "../assets/Lifestyle icon in roommate ad/owl2.png";
import birdimg from "../assets/Lifestyle icon in roommate ad/bird1.png";
import birdimg2 from "../assets/Lifestyle icon in roommate ad/bird2.png";
import CameraIcon from "@mui/icons-material/Camera";

const PostAd = () => {
  const dispatch = useDispatch();
  const [locationdata, setlocationdata] = useState([]);
  const token = localStorage.getItem("token");
  const {
    type,
    rentType,
    action,
    budget,
    description,
    movingDate,
    images,
    videos,
    amenities,
    interests,
    city,
    location,
    yourNationality,
    yourAstrologicalSign,
    yourAge,
    yourGender,
    yourOccupation,
    yourLanguages,
    yourLifeStyle,

    gender,
    lifeStyle,
    nationality,

    smoking,
    drinking,
    visitors,
    pets,
    party,

    grouping,
    cooking,
  } = useSelector((state) => state.tenant);
  console.log(images);
  console.log(
    "tttttttttttttttt",
    type,
    rentType,
    action,
    budget,
    description,
    movingDate,
    images,
    videos,
    amenities,
    interests,
    city,
    location,
    yourNationality,
    yourAstrologicalSign,
    yourAge,
    yourGender,
    yourOccupation,
    yourLanguages,
    yourLifeStyle,

    gender,
    lifeStyle,
    nationality,

    smoking,
    drinking,
    visitors,
    pets,
    party,

    grouping,
    cooking
  );

  const handleOptionChange = (option) => {
    dispatch(TenantActions.action(option));
  };

  const handleLanguageSelection = (event) => {
    const selectedLanguages = event.target.value;
    dispatch(TenantActions.yourLanguages(selectedLanguages));
  };

  const handleDeleteLanguage = (language) => {
    const updatedLanguages = yourLanguages.filter((lang) => lang !== language);
    dispatch(TenantActions.yourLanguages(updatedLanguages));
  };

  const handlePostAd = async () => {
    try {
      const aboutYou = {
        age: yourAge,
        astrologicalSign: yourAstrologicalSign,
        gender: yourGender,
        languages: yourLanguages,
        nationality: yourNationality,
        occupation: yourOccupation,
        lifeStyle: yourLifeStyle,
      };

      const address = {
        countryCode: "AE",
        city,
        location,
      };

      const socialPreferences = {
        cooking,
        drinking,
        friendParty: party,
        gender,
        grouping,
        gym: false,
        lifeStyle,
        nationality,
        pet: pets,
        smoking,
        swimming: false,
        tv: false,
        visitors,
        wifi: false,
      };

      const obj = {
        aboutYou,
        action,
        address,
        amenities,
        budget,
        images,
        interests,
        movingDate,
        rentType,
        socialPreferences,
        type,
        videos,
      };
      if (handleValidations()) {
        console.log("ghjk",obj);
        console.log("tokentyu", token);

        const { data } = await axios.post(
          "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/roommate-ad",
          obj,
          { headers: { Authorization: token } }
        );
        console.log(data);
        toast.success("Ad posted auccessfully", toastOptions);
        dispatch(TenantActions.clear());
      }
    } catch (err) {
      console.log(err);
      toast.error("Please try again after some time", toastOptions);
    }
  };

  const handleValidations = () => {
    if (!budget) {
      toast.error("Please enter budget", toastOptions);
      return false;
    }

    if (!/^\d+$/.test(budget)) {
      console.log(budget);
      console.log(/^\d+$/.test("210aa0"));
      console.log("failed");
      toast.error("Budget must be a number", toastOptions);
      return false;
    }

    if (!city) {
      toast.error("Please select city", toastOptions);
      return false;
    }
    if (!location) {
      toast.error("Please select Area", toastOptions);
      return false;
    }

    return true;
  };

  const viewArrayData = () => {
    if (city === "Dubai") {
      setlocationdata(dubaiCities);
    } else if (city === "Abu Dhabi") {
      setlocationdata(abuDahbiCities);
    } else if (city === "Sharjah") {
      setlocationdata(sharjahCities);
    } else if (city === "Ras Al Kima") {
      setlocationdata(rasAlkimaCities);
    } else if (city === "Umm Al-Quwain") {
      setlocationdata(ummAlQuwainCities);
    } else if (city === "Ajman") {
      setlocationdata(ajmanCities);
    } else if (city === "Riyadh") {
      setlocationdata(riyadhCities);
    } else if (city === "Mecca") {
      setlocationdata(meccaCities);
    } else if (city === "Jeddah") {
      setlocationdata(jeddahCities);
    } else {
      setlocationdata([]);
    }
  };
  useEffect(() => {
    viewArrayData();
  }, [city]);

  return (
    <Grid
      container
      spacing={2}
      p={3}
      maxWidth={"700px"}
      margin={"auto"}
      justifyContent="center"
    >
      <Grid container xs={12} justifyContent="center" my={2} gap={2}>
        <Typography variant="h5" component="h1">
          <Box
            component="span"
            onClick={() => handleOptionChange("HAVE ROOM")}
            sx={{
              cursor: "pointer",
              color: action === "HAVE ROOM" ? "#fff" : "none",
              fontWeight: "600",
              borderRadius: "15px",
              bgcolor: action === "HAVE ROOM" ? "orange" : "none",
              border: "1px solid",
              borderColor: action === "HAVE ROOM" ? "#000" : "none",
              padding: 1,
            }}
          >
            HAVE ROOM
          </Box>
        </Typography>
        <Typography variant="h5" component="h1">
          <Box
            component="span"
            onClick={() => handleOptionChange("NEED ROOM")}
            sx={{
              cursor: "pointer",
              color: action === "NEED ROOM" ? "#fff" : "none",
              fontWeight: "600",
              bgcolor: action === "NEED ROOM" ? "orange" : "none",
              borderRadius: "15px",
              border: "1px solid",
              borderColor: action === "NEED ROOM" ? "#000" : "none",
              padding: 1,
            }}
          >
            NEED ROOM
          </Box>
        </Typography>
      </Grid>
      {action === "NEED ROOM" && (
        <Grid item xs={12} my={2}>
          <Typography sx={{ fontWeight: "600" }}>
            Please tell us about yourself:
          </Typography>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                mt: 2,
                justifyContent: "space-around",
              }}
            >
              <Typography sx={{ width: "30%" }}>Gender</Typography>
              <InputDropDown
                name="yourGender"
                values={["Male", "Female"]}
                value={yourGender}
                sx={{ width: "100%" }}
              />
              {/* </Box> */}
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                mt: 2,
                justifyContent: "space-around",
              }}
            >
              <Typography sx={{ width: "30%" }}>Age</Typography>
              <TextInput name="yourAge" value={yourAge} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                mt: 2,
                justifyContent: "space-around",
              }}
            >
              <Typography sx={{ width: "30%" }}>Occupation</Typography>
              <InputDropDown
                name="yourOccupation"
                values={["Professional", "Student", "Other"]}
                value={yourOccupation}
                sx={{ width: "100%" }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ mt: 2 }}>
                <InputDropDown
                  label="Nationality"
                  name="yourNationality"
                  values={[...allNationalities]}
                  value={yourNationality}
                  sx={{ width: "100%" }}
                />
              </Box>
            </Grid> */}
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                mt: 2,
                justifyContent: "space-around",
              }}
            >
              <Typography sx={{ width: "30%" }}>Nationality</Typography>
              {/* <Box sx={{ mt: 2 }}> */}
              <InputDropDown
                // label="Nationality"
                name="nationality"
                values={[...allNationalities]}
                value={nationality}
                sx={{ width: "100%" }}
              />
              {/* </Box> */}
            </Grid>
            {/* <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ mt: 2 }}>
                <InputDropDown
                  label="Astrological Sign"
                  name="yourAstrologicalSign"
                  values={[...astrologySigns]}
                  value={yourAstrologicalSign}
                  sx={{ width: "100%" }}
                />
              </Box>
            </Grid> */}
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                mt: 2,
                justifyContent: "space-around",
              }}
            >
              <Typography sx={{ width: "30%" }}>Astrological Sign</Typography>
              {/* <Box sx={{ mt: 2 }}> */}
              <InputDropDown
                // label="Astrological Sign"
                name="yourAstrologicalSign"
                values={[...astrologySigns]}
                value={yourAstrologicalSign}
                sx={{ width: "100%" }}
              />
              {/* </Box> */}
            </Grid>
            {/* <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ mt: 2 }}>
                <TextField
                  label="Languages you speak"
                  name="languages"
                  select
                  SelectProps={{
                    multiple: true,
                    value: yourLanguages,
                    onChange: handleLanguageSelection,
                    renderValue: (selected) => (
                      <div>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            style={{ margin: 2 }}
                            onDelete={() => handleDeleteLanguage(value)}
                          />
                        ))}
                      </div>
                    ),
                  }}
                  variant="outlined"
                  fullWidth
                  sx={{ width: "100%" }}
                >
                  {availableLanguages.map((language) => (
                    <MenuItem key={language} value={language}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span>{language}</span>
                      </div>
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid> */}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography sx={{ width: "30%" }}>Languages you speak</Typography>
              <TextField
                name="languages"
                select
                SelectProps={{
                  multiple: true,
                  value: yourLanguages,
                  onChange: handleLanguageSelection,
                  renderValue: (selected) => (
                    <div>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          style={{ margin: 2 }}
                          onDelete={() => handleDeleteLanguage(value)}
                        />
                      ))}
                    </div>
                  ),
                }}
                variant="filled"
                fullWidth
                sx={{
                  width: { md: "100%" },
                  borderBottom: "none",
                  "& .MuiFilledInput-underline:before": {
                    borderBottom: "none",
                  },
                  "& .MuiFilledInput-underline:after": {
                    borderBottom: "none",
                  },
                }}
              >
                {availableLanguages.map((language) => (
                  <MenuItem key={language} value={language}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span>{language}</span>
                    </div>
                  </MenuItem>
                ))}
              </TextField>
              {/* </Box> */}
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid
        container
        justifyContent="flex-start"
        px={2}
        sx={{
          display: "flex",
          flexDirection: "column",
         
        }}
      >
        <Typography sx={{ my: 2, fontWeight: "600" }}>
          Please add IMAGES/VIDEOS:{" "}
        </Typography>
        <Box sx={{display:"flex",flexDirection:"row",width:{md:"50%"}}}>

          <ImageInput />
          {/* <CameraInputNew /> */}
        
          <VideoInput />
        </Box>
        
         
      </Grid>

      {action === "NEED ROOM" && (
        // <Grid xs={12} justifyContent="center" my={2} gap={2} px={2}>
        //   <Typography mb={2} fontWeight={600}>
        //     Your LIFESTYLE
        //   </Typography>
        //   <Grid container gap={2} justifyContent={"center"}>
        //     <Typography variant="h6" component="h3">
        //       <Box
        //         component="span"
        //         onClick={() =>
        //           dispatch(TenantActions.yourLifeStyle("Early Brird"))
        //         }
        //         sx={{
        //           cursor: "pointer",
        //           fontWeight: "500",
        //           borderRadius: "15px",
        //           color: yourLifeStyle === "Early Brird" ? "orange" : "black",
        //           border: "1px solid",
        //           borderColor:
        //             yourLifeStyle === "Early Brird" ? "orange" : "white",
        //           padding: 1,
        //         }}
        //       >
        //         Early Brird
        //       </Box>
        //     </Typography>
        //     <Typography variant="h6" component="h3">
        //       <Box
        //         component="span"
        //         onClick={() =>
        //           dispatch(TenantActions.yourLifeStyle("Night Owl"))
        //         }
        //         sx={{
        //           cursor: "pointer",
        //           fontWeight: "500",
        //           borderRadius: "15px",
        //           color: yourLifeStyle === "Night Owl" ? "orange" : "black",
        //           border: "1px solid",
        //           borderColor:
        //             yourLifeStyle === "Night Owl" ? "orange" : "white",
        //           padding: 1,
        //         }}
        //       >
        //         Night Owl
        //       </Box>
        //     </Typography>
        //   </Grid>
        // </Grid>
        <Grid container spacing={2}>
          <Grid item>
            <Typography mb={2} sx={{ fontWeight: "600", my: 2 }}>
              Your LIFESTYLE
            </Typography>
          </Grid>
          <Grid container sx={{ paddingX: 2 }}>
            <Grid item gap={2} xs={12} sm={4} md={3}>
              <Box
                sx={{
                  color: yourLifeStyle === "Early Brird" ? "orange" : "black",
                  borderColor:
                    yourLifeStyle === "Early Brird" ? "orange" : "white",
                  boxShadow: 9,
                  borderRadius: 5,
                  // fontWeight: 500,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() =>
                  dispatch(TenantActions.yourLifeStyle("Early Brird"))
                }
              >
                {/* {yourLifeStyle === "Early Brird" ? (
                  <img
                    src={birdimg2}
                    alt="birdimg"
                    style={{
                      width: "70px",
                      height: "70px",
                    }}
                  />
                ) : (
                  <img
                    src={birdimg}
                    alt="birdimg"
                    style={{
                      width: "70px",
                      height: "70px",
                    }}
                  />
                )} */}

                <img
                  src={birdimg}
                  alt="birdimg"
                  style={{
                    width: "70px",
                    height: "70px",
                  }}
                />

                <Typography
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Early Brird
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Box
                sx={{
                  color: yourLifeStyle === "Night Owl" ? "orange" : "black",
                  borderColor:
                    yourLifeStyle === "Night Owl" ? "orange" : "white",
                  boxShadow: 9,
                  borderRadius: 5,
                  // fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  ml: "10px",
                }}
                onClick={() =>
                  dispatch(TenantActions.yourLifeStyle("Night Owl"))
                }
              >
                {/* {yourLifeStyle === "Night Owl" ? (
                  <img
                    src={owlimg2}
                    alt="owlimg"
                    style={{
                      width: "70px",
                      height: "70px",
                    }}
                  />
                ) : (
                  <img
                    src={owlimg}
                    alt="owlimg"
                    style={{
                      width: "70px",
                      height: "70px",
                    }}
                  />
                )} */}
                <img
                  src={owlimg}
                  alt="owlimg"
                  style={{
                    width: "70px",
                    height: "70px",
                  }}
                />

                <Typography
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Night Owl
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )}

      {action === "NEED ROOM" && (
        // <Grid xs={12} justifyContent="center" my={2} gap={2}>
        //   <Typography sx={{ fontWeight: "600" }}>
        //     Please choose your HOBBIES/INTERESTS:{" "}
        //   </Typography>
        //   <Grid container xs={12}>
        //     {interestData.map((interest) => (
        //       <Grid item xs={12} sm={4} key={interest.value}>
        //         <Box
        //           sx={{
        //             cursor: "pointer",
        //             fontWeight: "500",
        //             borderRadius: "15px",
        //             color: interests.includes(interest.value)
        //               ? "orange"
        //               : "black",
        //             border: "1px solid",
        //             borderColor: interests.includes(interest.value)
        //               ? "orange"
        //               : "purple",
        //             padding: 1,
        //             // margin: 1,
        //             display: "flex",
        //             flexDirection: "column",
        //             justifyContent: "center",
        //             alignItems: "center",
        //           }}
        //           onClick={() => {
        //             const updatedInterests = interests.includes(interest.value)
        //               ? interests.filter((item) => item !== interest.value)
        //               : [...interests, interest.value];
        //             dispatch(TenantActions.interests(updatedInterests));
        //           }}
        //         >
        //           <img
        //             src={interest.pictureimg}
        //             alt={interest.value}
        //             style={{
        //               height: "40%",
        //               width: "40%",
        //             }}
        //           />
        //           <Typography
        //             sx={{
        //               fontWeight: "500",
        //             }}
        //           >
        //             {interest.value}
        //           </Typography>
        //         </Box>
        //       </Grid>
        //     ))}
        //   </Grid>
        // </Grid>
        <Grid xs={12} justifyContent="center" my={2} gap={2}>
          <Typography sx={{ fontWeight: "600" }}>
            Please choose your HOBBIES/INTERESTS:
          </Typography>

          <Grid container xs={12}>
            {interestData.map((interest) => (
              <Grid item xs={12} sm={4} md={3} key={interest.value}>
                <Box
                  sx={{
                    boxShadow: 9,
                    height: "70%",
                    width: "70%",
                    cursor: "pointer",
                    fontWeight: "500",
                    borderRadius: "15px",
                    color: interests.includes(interest.value)
                      ? "orange"
                      : "black",
                    border: "1px solid",
                    borderColor: interests.includes(interest.value)
                      ? "orange"
                      : "white",
                    padding: 1,
                    margin: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    // ml:"25%",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    const updatedInterests = interests.includes(interest.value)
                      ? interests.filter((item) => item !== interest.value)
                      : [...interests, interest.value];
                    dispatch(TenantActions.interests(updatedInterests));
                  }}
                >
                  {/* {interests.includes(interest.value) ? (
                    <img
                      src={interest.pictureimg1}
                      alt={interest.value}
                      style={{
                        height: "60%",
                        width: "60%",
                      }}
                    />
                  ) : (
                    <img
                      src={interest.pictureimg}
                      alt={interest.value}
                      style={{
                        height: "60%",
                        width: "60%",
                      }}
                    />
                  )} */}
                  <img
                    src={interest.pictureimg}
                    alt={interest.value}
                    style={{
                      height: "60%",
                      width: "60%",
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: "500",
                    }}
                  >
                    {interest.value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}

      <Grid item xs={12} sx={{ my: 2 }}>
        <Typography sx={{ fontWeight: "600" }}>
          Please fill in PREFERRED ROOM DETAILS:
        </Typography>
        <Grid container spacing={2}>
          <Grid
            justifyContent="center"
            sx={{ display: "flex", flexDirection: "row", mt: 2 }}
            item
            xs={12}
            sm={12}
          >
            <Typography sx={{ width: "30%" }}>Property type</Typography>
            <Grid container gap={2}>
              <Typography variant="h6" component="h3">
                <Box
                  component="span"
                  onClick={() => dispatch(TenantActions.type("Studio"))}
                  sx={{
                    boxShadow: 6,
                    cursor: "pointer",
                    fontWeight: "500",
                    borderRadius: "15px",
                    color: type === "Studio" ? "orange" : "black",
                    border: "1px solid",
                    borderColor: type === "Studio" ? "orange" : "white",
                    padding: 1,
                  }}
                >
                  Studio
                </Box>
              </Typography>
              <Typography variant="h6" component="h3">
                <Box
                  component="span"
                  onClick={() => dispatch(TenantActions.type("Apartment"))}
                  sx={{
                    boxShadow: 6,
                    cursor: "pointer",
                    fontWeight: "500",
                    borderRadius: "15px",
                    color: type === "Apartment" ? "orange" : "black",
                    border: "1px solid",
                    borderColor: type === "Apartment" ? "orange" : "white",
                    padding: 1,
                  }}
                >
                  Apartment
                </Box>
              </Typography>
              <Typography variant="h6" component="h3">
                <Box
                  component="span"
                  onClick={() => dispatch(TenantActions.type("House"))}
                  sx={{
                    boxShadow: 6,
                    cursor: "pointer",
                    fontWeight: "500",
                    borderRadius: "15px",
                    color: type === "House" ? "orange" : "black",
                    border: "1px solid",
                    borderColor: type === "House" ? "orange" : "white",
                    padding: 1,
                  }}
                >
                  House
                </Box>
              </Typography>
            </Grid>
          </Grid>
          <Grid
            justifyContent="center"
            item
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              mt: 2,
              justifyContent: "space-around",
            }}
          >
            <Typography sx={{ width: "30%" }}>Rent type</Typography>

            <InputDropDown
              // label="Rent type"
              name="rentType"
              values={["Monthly", "Weekly", "Daily"]}
              value={rentType}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              mt: 2,
              justifyContent: "space-around",
            }}
          >
            <Typography sx={{ width: "30%" }}>Budget</Typography>
            {/* <Box sx={{ mt: 2 }}> */}
            <TextInput label="Budget *" name="budget" value={budget} />
            {/* </Box> */}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              mt: 2,
              justifyContent: "space-around",
            }}
          >
            <Typography sx={{ width: "30%" }}>Moving date</Typography>
            {/* <Box sx={{ mt: 2 }}> */}
            <TextField
              // label="Moving date"
              name="movingDate"
              type="date"
              value={movingDate}
              onChange={(event) => {
                dispatch(TenantActions.movingDate(event.target.value));
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              fullWidth
              sx={{
                width: { md: "100%" },
                borderBottom: "none",
                "& .MuiFilledInput-underline:before": {
                  borderBottom: "none",
                },
                "& .MuiFilledInput-underline:after": {
                  borderBottom: "none",
                },
              }}
            />
            {/* </Box> */}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              mt: 2,
              justifyContent: "space-around",
            }}
          >
            <Typography sx={{ width: "30%" }}>City</Typography>
            {/* <Box sx={{ mt: 2 }}> */}
            <InputDropDown
              label="City *"
              name="city"
              value={city}
              values={citydata}
              sx={{ width: "100%" }}
            />
            {/* </Box> */}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              mt: 2,
              justifyContent: "space-around",
            }}
          >
            <Typography sx={{ width: "30%" }}>Area</Typography>
            {/* <Box sx={{ mt: 2 }}> */}
            <InputDropDown
              label="Area *"
              name="location"
              value={location}
              values={locationdata}
              sx={{ width: "100%" }}
            />
            {/* </Box> */}
          </Grid>
        </Grid>
      </Grid>

      <Grid xs={12} justifyContent="center">
        <Typography sx={{ fontWeight: "600", my: 2 }}>
          Please select PREFERRED AMENITIES:{" "}
        </Typography>
        <Grid container spacing={4} sx={{}}>
          {allAmenities.map((amenity) => (
            <Grid item xs={3} sm={3} md={3} key={amenity.value}>
              <Box
                sx={{
                  height: "100px",
                  width: "100%",
                  cursor: "pointer",
                  fontWeight: "500",
                  borderRadius: "15px",
                  fontSize: { xs: "0.7rem", sm: "1rem" },
                  color: amenities.includes(amenity.value) ? "orange" : "black",
                  boxShadow: amenities.includes(amenity.value)
                    ? "0px 0px 15px rgba(255, 127, 0, 0.5)"
                    : "0px 0px 15px rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  const updatedAmenities = amenities.includes(amenity.value)
                    ? amenities.filter((item) => item !== amenity.value)
                    : [...amenities, amenity.value];
                  dispatch(TenantActions.amenities(updatedAmenities));
                }}
              >
                <Grid
                  item
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  padding={2}
                >
                  <img
                    src={amenity.pictureimg}
                    alt={amenity.value}
                    style={{
                      height: "40px",
                      width: "40px",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      justifySelf: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "500",
                      }}
                    >
                      {amenity.value1}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "500",
                      }}
                    >
                      {amenity.value2}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography sx={{ fontWeight: "600" }}>
          Please select your PREFERENCES:
        </Typography>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              mt: 2,
              justifyContent: "space-around",
            }}
          >
            <Typography sx={{ width: "30%" }}>Gender</Typography>
            {/* <Box sx={{ mt: 2 }}> */}
            <InputDropDown
              // label="Gender"
              name="gender"
              values={["Male", "Female", "Mix"]}
              value={gender}
              sx={{ width: "100%" }}
            />
            {/* </Box> */}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              mt: 2,
              justifyContent: "space-around",
            }}
          >
            <Typography sx={{ width: "30%" }}>Area</Typography>
            {/* <Box sx={{ mt: 2 }}> */}
            <InputDropDown
              label="Nationality"
              name="nationality"
              values={[...allNationalities]}
              value={nationality}
              sx={{ width: "100%" }}
            />
            {/* </Box> */}
          </Grid>

          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "600", my: 1 }}>
              Comfortable with:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={3}>
                <Box
                  sx={{
                    color: smoking ? "orange" : "black",
                    border: smoking ? "1px solid orange" : "1px solid white",
                    boxShadow: 9,
                    p: 2,
                    borderRadius: 5,
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => dispatch(TenantActions.smoking(!smoking))}
                >
                  {/* {
                    smoking ? <img
                    src={smokingimg2}
                    alt="Peoples"
                    style={{ width: "80px", height: "40px" }}
                  /> : <img
                    src={smokingimg}
                    alt="Peoples"
                    style={{ width: "80px", height: "40px" }}
                  />
                  } */}
                  <img
                    src={smokingimg}
                    alt="Peoples"
                    style={{ width: "80px", height: "40px" }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    Smoking
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Box
                  sx={{
                    color: drinking ? "orange" : "black",
                    border: drinking ? "1px solid orange" : "1px solid white",
                    p: 2,
                    boxShadow: 9,
                    borderRadius: 5,
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => dispatch(TenantActions.drinking(!drinking))}
                >
                  {/* {drinking ? (
                    <img
                      src={drinkingimg2}
                      alt="Peoples"
                      style={{ width: "80px", height: "40px" }}
                    />
                  ) : (
                    <img
                      src={drinkingimg}
                      alt="Peoples"
                      style={{ width: "80px", height: "40px" }}
                    />
                  )} */}
                  <img
                    src={drinkingimg}
                    alt="Peoples"
                    style={{ width: "80px", height: "40px" }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    Drinking
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Box
                  sx={{
                    color: visitors ? "orange" : "black",
                    border: visitors ? "1px solid orange" : "1px solid white",
                    p: 2,
                    boxShadow: 9,
                    borderRadius: 5,
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => dispatch(TenantActions.visitors(!visitors))}
                >
                  {/* {visitors ? (
                    <img
                      src={visitorimg2}
                      alt="Peoples"
                      style={{ width: "80px", height: "40px" }}
                    />
                  ) : (
                    <img
                      src={visitorimg}
                      alt="Peoples"
                      style={{ width: "80px", height: "40px" }}
                    />
                  )} */}
                  <img
                    src={visitorimg}
                    alt="Peoples"
                    style={{ width: "80px", height: "40px" }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    Visitors
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Box
                  sx={{
                    color: party ? "orange" : "black",
                    border: party ? "1px solid orange" : "1px solid white",
                    p: 2,
                    boxShadow: 9,
                    borderRadius: 5,
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => dispatch(TenantActions.party(!party))}
                >
                  {/* {party ? (
                    <img
                      src={partyimg2}
                      alt="Peoples"
                      style={{ width: "80px", height: "40px" }}
                    />
                  ) : (
                    <img
                      src={partyimg}
                      alt="Peoples"
                      style={{ width: "80px", height: "40px" }}
                    />
                  )} */}
                  <img
                    src={partyimg}
                    alt="Peoples"
                    style={{ width: "80px", height: "40px" }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    Party
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Box
                  sx={{
                    color: pets ? "orange" : "black",
                    border: pets ? "1px solid orange" : "1px solid white",
                    p: 2,
                    boxShadow: 9,
                    borderRadius: 5,
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => dispatch(TenantActions.pets(!pets))}
                >
                  {/* {pets ? (
                    <img
                      src={petsimg2}
                      alt="Peoples"
                      style={{ width: "80px", height: "40px" }}
                    />
                  ) : (
                    <img
                      src={petsimg}
                      alt="Peoples"
                      style={{ width: "80px", height: "40px" }}
                    />
                  )} */}
                  <img
                    src={petsimg}
                    alt="Peoples"
                    style={{ width: "80px", height: "40px" }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    Pets
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {action === "HAVE ROOM" && (
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "600" }}>
            Please tell us about yourself:
          </Typography>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                mt: 2,
                justifyContent: "space-around",
              }}
            >
              <Typography sx={{ width: "30%" }}>Gender</Typography>
              <InputDropDown
                name="yourGender"
                values={["Male", "Female"]}
                value={yourGender}
                sx={{ width: "100%" }}
              />
              {/* </Box> */}
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                mt: 2,
                justifyContent: "space-around",
              }}
            >
              <Typography sx={{ width: "30%" }}>Age</Typography>
              <TextInput name="yourAge" value={yourAge} />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                mt: 2,
                justifyContent: "space-around",
              }}
            >
              <Typography sx={{ width: "30%" }}>Occupation</Typography>
              <InputDropDown
                name="yourOccupation"
                values={["Professional", "Student", "Other"]}
                value={yourOccupation}
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                mt: 2,
                justifyContent: "space-around",
              }}
            >
              <Typography sx={{ width: "30%" }}>Nationality</Typography>
              <InputDropDown
                name="yourNationality"
                values={[...allNationalities]}
                value={yourNationality}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                mt: 2,
                justifyContent: "space-around",
              }}
            >
              <Typography sx={{ width: "30%" }}>Astrological Sign</Typography>
              <InputDropDown
                name="yourAstrologicalSign"
                values={[...astrologySigns]}
                value={yourAstrologicalSign}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography sx={{ width: "30%" }}>Languages you speak</Typography>
              <TextField
                name="languages"
                select
                SelectProps={{
                  multiple: true,
                  value: yourLanguages,
                  onChange: handleLanguageSelection,
                  renderValue: (selected) => (
                    <div>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          style={{ margin: 2 }}
                          onDelete={() => handleDeleteLanguage(value)}
                        />
                      ))}
                    </div>
                  ),
                }}
                variant="filled"
                fullWidth
                sx={{
                  width: { md: "100%" },
                  borderBottom: "none",
                  "& .MuiFilledInput-underline:before": {
                    borderBottom: "none",
                  },
                  "& .MuiFilledInput-underline:after": {
                    borderBottom: "none",
                  },
                }}
              >
                {availableLanguages.map((language) => (
                  <MenuItem key={language} value={language}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span>{language}</span>
                    </div>
                  </MenuItem>
                ))}
              </TextField>
              {/* </Box> */}
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mt: 2 }}>
                <TextField
                  placeholder="Add description here"
                  fullWidth
                  value={description}
                  onChange={(e) =>
                    dispatch(TenantActions.description(e.target.value))
                  }
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )}

      {action === "HAVE ROOM" && (
        <Grid xs={12} justifyContent="center" my={2} gap={2}>
          <Typography sx={{ fontWeight: "600" }}>
            Please choose your HOBBIES/INTERESTS:
          </Typography>

          <Grid container xs={12}>
            {interestData.map((interest) => (
              <Grid item xs={12} sm={4} md={3} key={interest.value}>
                <Box
                  sx={{
                    boxShadow: 9,
                    height: "70%",
                    width: "70%",
                    cursor: "pointer",
                    fontWeight: "500",
                    borderRadius: "15px",
                    color: interests.includes(interest.value)
                      ? "orange"
                      : "black",
                    border: "1px solid",
                    borderColor: interests.includes(interest.value)
                      ? "orange"
                      : "white",
                    padding: 1,
                    margin: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    // ml:"25%",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    const updatedInterests = interests.includes(interest.value)
                      ? interests.filter((item) => item !== interest.value)
                      : [...interests, interest.value];
                    dispatch(TenantActions.interests(updatedInterests));
                  }}
                >
                  {/* {interests.includes(interest.value) ? (
                    <img
                      src={interest.pictureimg1}
                      alt={interest.value}
                      style={{
                        height: "60%",
                        width: "60%",
                      }}
                    />
                  ) : (
                    <img
                      src={interest.pictureimg}
                      alt={interest.value}
                      style={{
                        height: "60%",
                        width: "60%",
                      }}
                    />
                  )} */}
                  <img
                    src={interest.pictureimg}
                    alt={interest.value}
                    style={{
                      height: "60%",
                      width: "60%",
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: "500",
                    }}
                  >
                    {interest.value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}

      {action === "HAVE ROOM" && (
        <Grid container spacing={2}>
          <Grid item>
            <Typography mb={2} sx={{ fontWeight: "600", my: 2 }}>
              Your LIFESTYLE
            </Typography>
          </Grid>
          <Grid container sx={{ paddingX: 2 }}>
            <Grid item gap={2} xs={12} sm={4} md={3}>
              <Box
                sx={{
                  color: yourLifeStyle === "Early Brird" ? "orange" : "black",
                  borderColor:
                    yourLifeStyle === "Early Brird" ? "orange" : "white",
                  boxShadow: 9,
                  borderRadius: 5,
                  // fontWeight: 500,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() =>
                  dispatch(TenantActions.yourLifeStyle("Early Brird"))
                }
              >
                {/* {yourLifeStyle === "Early Brird" ? (
                  <img
                    src={birdimg2}
                    alt="birdimg"
                    style={{
                      width: "70px",
                      height: "70px",
                    }}
                  />
                ) : (
                  <img
                    src={birdimg}
                    alt="birdimg"
                    style={{
                      width: "70px",
                      height: "70px",
                    }}
                  />
                )} */}

                <img
                  src={birdimg}
                  alt="birdimg"
                  style={{
                    width: "70px",
                    height: "70px",
                  }}
                />

                <Typography
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Early Brird
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Box
                sx={{
                  color: yourLifeStyle === "Night Owl" ? "orange" : "black",
                  borderColor:
                    yourLifeStyle === "Night Owl" ? "orange" : "white",
                  boxShadow: 9,
                  borderRadius: 5,
                  // fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  ml: "10px",
                }}
                onClick={() =>
                  dispatch(TenantActions.yourLifeStyle("Night Owl"))
                }
              >
                {/* {yourLifeStyle === "Night Owl" ? (
                  <img
                    src={owlimg2}
                    alt="owlimg"
                    style={{
                      width: "70px",
                      height: "70px",
                    }}
                  />
                ) : (
                  <img
                    src={owlimg}
                    alt="owlimg"
                    style={{
                      width: "70px",
                      height: "70px",
                    }}
                  />
                )} */}
                <img
                  src={owlimg}
                  alt="owlimg"
                  style={{
                    width: "70px",
                    height: "70px",
                  }}
                />

                <Typography
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Night Owl
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )}

      <Grid item xs={12}>
        <Typography sx={{ my: 2 }}>
          Please tell us more about yourself, your preferred roommate & housing
          details
        </Typography>
        <TextField
          fullWidth
          placeholder="description"
          value={description}
          onChange={(e) => dispatch(TenantActions.description(e.target.value))}
        />
      </Grid>

      <Grid my={2}>
        <Button
          onClick={handlePostAd}
          sx={{
            borderRadius: "20px",
            bgcolor: "orange",
            "&:hover": {
              "&:hover": {
                bgcolor: "#ff9900",
              },
            },
          }}
          variant="contained"
        >
          Submit
        </Button>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};

export default PostAd;
