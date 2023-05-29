import {
  Box,
  Grid,
  TextField,
  Typography,
  Chip,
  MenuItem,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TenantActions } from "../store/Tenant";
import InputDropDown from "../components/postAdComponents/InputDropDown";
import TextInput from "../components/postAdComponents/TextInput";
import { allNationalities } from "../utils/AllNationalities";
import { availableLanguages } from "../utils/availableLanguages";
import ImageInput from "../components/postAdComponents/ImageInput";
import VideoInput from "../components/postAdComponents/VideoInput";
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
import { allAmenities } from "../utils/AllAmenities";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../utils/ToastOptions";

const interestData = [
  "Reading",
  "Yoga",
  "Sports",
  "Photography",
  "Cooking",
  "Hiking",
  "Game",
  "Music",
  "Arts",
  "Dance",
  "Volunteering",
  "Fishing",
];

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
      console.log(obj);
      if (handleValidations()) {
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
              color: "purple",
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
              color: "purple",
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
          <Typography>Please tell us about yourself:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ mt: 2 }}>
                <InputDropDown
                  label="Gender"
                  name="yourGender"
                  values={["Male", "Female"]}
                  value={yourGender}
                  sx={{ width: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ mt: 2 }}>
                <TextInput
                  label="Age"
                  name="yourAge"
                  value={yourAge}
                  sx={{ width: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ mt: 2 }}>
                <InputDropDown
                  label="Occupation"
                  name="yourOccupation"
                  values={["Professional", "Student", "Other"]}
                  value={yourOccupation}
                  sx={{ width: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ mt: 2 }}>
                <InputDropDown
                  label="Nationality"
                  name="yourNationality"
                  values={[...allNationalities]}
                  value={yourNationality}
                  sx={{ width: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ mt: 2 }}>
                <InputDropDown
                  label="Astrological Sign"
                  name="yourAstrologicalSign"
                  values={[...astrologySigns]}
                  value={yourAstrologicalSign}
                  sx={{ width: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
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
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid container justifyContent={"flex-start"} px={2}>
        <ImageInput />
        <VideoInput />
      </Grid>
      {action === "NEED ROOM" && (
        <Grid xs={12} justifyContent="center" my={2} gap={2} px={2}>
          <Typography mb={2} fontWeight={600}>
            Your LIFESTYLE
          </Typography>
          <Grid container gap={2} justifyContent={"center"}>
            <Typography variant="h6" component="h3">
              <Box
                component="span"
                onClick={() =>
                  dispatch(TenantActions.yourLifeStyle("Early Brird"))
                }
                sx={{
                  cursor: "pointer",
                  fontWeight: "600",
                  borderRadius: "15px",
                  color: yourLifeStyle === "Early Brird" ? "orange" : "purple",
                  border: "1px solid",
                  borderColor:
                    yourLifeStyle === "Early Brird" ? "orange" : "purple",
                  padding: 1,
                }}
              >
                Early Brird
              </Box>
            </Typography>
            <Typography variant="h6" component="h3">
              <Box
                component="span"
                onClick={() =>
                  dispatch(TenantActions.yourLifeStyle("Night Owl"))
                }
                sx={{
                  cursor: "pointer",
                  fontWeight: "600",
                  borderRadius: "15px",
                  color: yourLifeStyle === "Night Owl" ? "orange" : "purple",
                  border: "1px solid",
                  borderColor:
                    yourLifeStyle === "Night Owl" ? "orange" : "purple",
                  padding: 1,
                }}
              >
                Night Owl
              </Box>
            </Typography>
          </Grid>
        </Grid>
      )}

      {action === "NEED ROOM" && (
        <Grid xs={12} justifyContent="center" my={2} gap={2}>
          <Typography>Please choose your HOBBIES/INTERESTS: </Typography>
          <Grid container xs={12}>
            {interestData.map((interest) => (
              <Grid item xs={12} sm={6} md={4} key={interest}>
                <Typography
                  onClick={() => {
                    const updatedInterests = interests.includes(interest)
                      ? interests.filter((item) => item !== interest)
                      : [...interests, interest];
                    dispatch(TenantActions.interests(updatedInterests));
                  }}
                  sx={{
                    cursor: "pointer",
                    fontWeight: "600",
                    borderRadius: "15px",
                    color: interests.includes(interest) ? "orange" : "purple",
                    border: "1px solid",
                    borderColor: interests.includes(interest)
                      ? "orange"
                      : "purple",
                    padding: 1,
                    margin: 1,
                  }}
                >
                  {interest}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}

      <Grid item xs={12}>
        <Typography>Please fill in PREFERRED ROOM DETAILS:</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={3}>
            <Box sx={{ mt: 2 }}>
              <InputDropDown
                label="Property type"
                name="type"
                values={["Studio", "Apartment", "House"]}
                value={type}
                sx={{ width: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Box sx={{ mt: 2 }}>
              <InputDropDown
                label="Rent type"
                name="rentType"
                values={["Monthly", "Weekly", "Daily"]}
                value={rentType}
                sx={{ width: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ mt: 2 }}>
              <TextInput label="Budget *" name="budget" value={budget} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Moving date"
                name="movingDate"
                type="date"
                value={movingDate}
                onChange={(event) => {
                  dispatch(TenantActions.movingDate(event.target.value));
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ mt: 2 }}>
              <InputDropDown
                label="City *"
                name="city"
                value={city}
                values={citydata}
                sx={{ width: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ mt: 2 }}>
              <InputDropDown
                label="Area *"
                name="location"
                value={location}
                values={locationdata}
                sx={{ width: "100%" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid xs={12} justifyContent="center" my={2} gap={2}>
        <Typography>Please select PREFERRED AMENITIES: </Typography>
        <Grid container xs={12} spacing={2}>
          {allAmenities.map((amenity) => (
            <Grid item xs={12} sm={4} key={amenity.value}>
              <Typography
                onClick={() => {
                  const updatedAmenities = amenities.includes(amenity.value)
                    ? amenities.filter((item) => item !== amenity.value)
                    : [...amenities, amenity.value];
                  dispatch(TenantActions.amenities(updatedAmenities));
                }}
                sx={{
                  cursor: "pointer",
                  fontWeight: "600",
                  borderRadius: "15px",
                  color: amenities.includes(amenity.value)
                    ? "orange"
                    : "purple",
                  border: "1px solid",
                  borderColor: amenities.includes(amenity.value)
                    ? "orange"
                    : "purple",
                  padding: 1,
                  margin: 1,
                }}
              >
                {amenity.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography>Please select your PREFERENCES:</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={3}>
            <Box sx={{ mt: 2 }}>
              <InputDropDown
                label="Gender"
                name="gender"
                values={["Male", "Female", "Mix"]}
                value={gender}
                sx={{ width: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Box sx={{ mt: 2 }}>
              <InputDropDown
                label="Nationality"
                name="nationality"
                values={[...allNationalities]}
                value={nationality}
                sx={{ width: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Box sx={{ mt: 2 }}>
              <InputDropDown
                label="Lifestyle"
                name="lifeStyle"
                values={["Early Brird", "Night Owl"]}
                value={lifeStyle}
                sx={{ width: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography>Comfortable with:</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={3}>
                <Typography
                  sx={{
                    color: smoking ? "orange" : "purple",
                    border: smoking ? "1px solid orange" : "1px solid purple",
                    p: 2,
                    borderRadius: 5,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onClick={() => dispatch(TenantActions.smoking(!smoking))}
                >
                  Smoking
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Typography
                  sx={{
                    color: drinking ? "orange" : "purple",
                    border: drinking ? "1px solid orange" : "1px solid purple",
                    p: 2,
                    borderRadius: 5,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onClick={() => dispatch(TenantActions.drinking(!drinking))}
                >
                  Drinking
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Typography
                  sx={{
                    color: visitors ? "orange" : "purple",
                    border: visitors ? "1px solid orange" : "1px solid purple",
                    p: 2,
                    borderRadius: 5,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onClick={() => dispatch(TenantActions.visitors(!visitors))}
                >
                  Visitors
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Typography
                  sx={{
                    color: party ? "orange" : "purple",
                    border: party ? "1px solid orange" : "1px solid purple",
                    p: 2,
                    borderRadius: 5,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onClick={() => dispatch(TenantActions.party(!party))}
                >
                  Party
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Typography
                  sx={{
                    color: pets ? "orange" : "purple",
                    border: pets ? "1px solid orange" : "1px solid purple",
                    p: 2,
                    borderRadius: 5,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onClick={() => dispatch(TenantActions.pets(!pets))}
                >
                  Pets
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {action === "HAVE ROOM" && (
        <Grid item xs={12}>
          <Typography>Please tell us about yourself:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3}>
              <Box sx={{ mt: 2 }}>
                <InputDropDown
                  label="Gender"
                  name="yourGender"
                  values={["Male", "Female"]}
                  value={yourGender}
                  sx={{ width: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Box sx={{ mt: 2 }}>
                <TextInput label="Age" name="yourAge" value={yourAge} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Box sx={{ mt: 2 }}>
                <InputDropDown
                  label="Occupation"
                  name="yourOccupation"
                  values={["Professional", "Student", "Other"]}
                  value={yourOccupation}
                  sx={{ width: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Box sx={{ mt: 2 }}>
                <InputDropDown
                  label="Nationality"
                  name="yourNationality"
                  values={[...allNationalities]}
                  value={yourNationality}
                  sx={{ width: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Box sx={{ mt: 2 }}>
                <InputDropDown
                  label="Astrological Sign"
                  name="yourAstrologicalSign"
                  values={[...astrologySigns]}
                  value={yourAstrologicalSign}
                  sx={{ width: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
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
          <Typography>Please choose your HOBBIES/INTERESTS: </Typography>
          <Grid container xs={12} spacing={1}>
            {interestData.map((interest) => (
              <Grid item xs={4} key={interest}>
                <Typography
                  onClick={() => {
                    const updatedInterests = interests.includes(interest)
                      ? interests.filter((item) => item !== interest)
                      : [...interests, interest];
                    dispatch(TenantActions.interests(updatedInterests));
                  }}
                  sx={{
                    cursor: "pointer",
                    fontWeight: "600",
                    borderRadius: "15px",
                    color: interests.includes(interest) ? "orange" : "purple",
                    border: "1px solid",
                    borderColor: interests.includes(interest)
                      ? "orange"
                      : "purple",
                    padding: 1,
                    margin: 1,
                  }}
                >
                  {interest}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}

      {action === "HAVE ROOM" && (
        <Grid xs={12} justifyContent="center" my={2} gap={2}>
          <Typography mb={2}>Your LIFESTYLE</Typography>
          <Grid container spacing={1}>
            <Grid item>
              <Typography>
                <Box
                  component="span"
                  onClick={() =>
                    dispatch(TenantActions.yourLifeStyle("Early Brird"))
                  }
                  sx={{
                    cursor: "pointer",
                    fontWeight: "600",
                    borderRadius: "15px",
                    color:
                      yourLifeStyle === "Early Brird" ? "orange" : "purple",
                    border: "1px solid",
                    borderColor:
                      yourLifeStyle === "Early Brird" ? "orange" : "purple",
                    padding: 1,
                  }}
                >
                  Early Brird
                </Box>
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <Box
                  component="span"
                  onClick={() =>
                    dispatch(TenantActions.yourLifeStyle("Night Owl"))
                  }
                  sx={{
                    cursor: "pointer",
                    fontWeight: "600",
                    borderRadius: "15px",
                    color: yourLifeStyle === "Night Owl" ? "orange" : "purple",
                    border: "1px solid",
                    borderColor:
                      yourLifeStyle === "Night Owl" ? "orange" : "purple",
                    padding: 1,
                  }}
                >
                  Night Owl
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}

      <Grid item xs={12}>
        <Typography>
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
        <Button onClick={handlePostAd} variant="contained">
          Submit
        </Button>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};

export default PostAd;
