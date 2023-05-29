import React from "react";
import { citydata } from "../../../utils/citydata";
import { Grid, FormControl, Select, MenuItem, Typography } from "@mui/material";
import { AdvanceSearchActions } from "../../../store/AdvanceSearch";
import { useDispatch, useSelector } from "react-redux";

const City = () => {
  const dispatch = useDispatch();
  const selectedCity = useSelector((state) => state.advanceSearch.city);

  const handleCitySelection = (e) => {
    dispatch(AdvanceSearchActions.city(e.target.value));
  };

  const cityOptions = citydata.map((city) => (
    <MenuItem key={city} value={city}>
      {city}
    </MenuItem>
  ));

  return (
    <FormControl sx={{ width: "100%" }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
        City
      </Typography>
      <Select
        value={selectedCity}
        onChange={handleCitySelection}
        displayEmpty
        renderValue={(selected) => selected || "Select City"}
      >
        <MenuItem disabled value="">
          <em>Select City</em>
        </MenuItem>
        {cityOptions}
      </Select>
    </FormControl>
  );
};

export default City;
