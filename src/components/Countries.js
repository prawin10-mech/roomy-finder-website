import React, { useState } from "react";
import { Grid, Select, MenuItem, Typography } from "@mui/material";
import { roomsTypeActions } from "../store/Rooms";
import { useSelector, useDispatch } from "react-redux";

const countries = [
  { name: "United Arab Emirates", flag: "🇦🇪" },
  { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "Qatar", flag: "🇶🇦" },
  { name: "Bahrain", flag: "🇧🇭" },
  { name: "Kuwait", flag: "🇰🇼" },
  { name: "Oman", flag: "🇴🇲" },
  { name: "United States", flag: "🇺🇸" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "India", flag: "🇮🇳" },
  { name: "Turkey", flag: "🇹🇷" },
];

const Countries = () => {
  // const [selectedCountry, setSelectedCountry] = useState("");
  const dispatch = useDispatch();
  const selectedCountry = useSelector((state) => state.room.country);

  const handleCountryChange = (event) => {
    console.log(event.target.value);
    dispatch(roomsTypeActions.country(selectedCountry));
  };

  const renderValue = (value) => {
    if (!value) {
      return <em>Select a country</em>;
    }
    console.log(value);
    // const selectedCountryObj = countries.find(
    //   (country) => country.flag === value
    // );

    // return (
    //   <>
    //     <span>{selectedCountryObj.flag}</span>{" "}
    //   </>
    // );
  };

  return (
    <Grid container spacing={2} sx={{ position: "absolute" }}>
      <Grid item>
        <Select
          value={selectedCountry}
          onChange={handleCountryChange}
          renderValue={renderValue}
        >
          <MenuItem value="" disabled>
            Select a country
          </MenuItem>
          {countries.map((country, index) => (
            <MenuItem key={index} value={country.flag + " " + country.name}>
              {country.flag} {country.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default Countries;
