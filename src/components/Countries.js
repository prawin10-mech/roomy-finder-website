import React from "react";
import { Grid, Typography } from "@mui/material";

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
  return (
    <Grid container spacing={2}>
      {countries.map((country, index) => (
        <Grid key={index} item container alignItems="center">
          <Typography>{country.flag}</Typography>
          <Typography>{country.name}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default Countries;
