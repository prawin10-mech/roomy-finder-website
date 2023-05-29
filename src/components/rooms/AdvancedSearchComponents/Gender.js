import React from "react";
import { MenuItem, FormControl, Select, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AdvanceSearchActions } from "../../../store/AdvanceSearch";

const Gender = () => {
  const dispatch = useDispatch();
  const gender = useSelector((state) => state.advanceSearch.gender);

  const handleGenderSelection = (e) => {
    dispatch(AdvanceSearchActions.gender(e.target.value));
  };

  const cityOptions = ["Male", "Female", "Mix"].map((city) => (
    <MenuItem key={city} value={city}>
      {city}
    </MenuItem>
  ));

  return (
    <FormControl sx={{ width: "100%" }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
        Gender
      </Typography>
      <Select
        value={gender}
        onChange={handleGenderSelection}
        displayEmpty
        renderValue={(selected) => selected || "Gender you prefer"}
      >
        <MenuItem disabled value="">
          <em>Select Gender</em>
        </MenuItem>
        {cityOptions}
      </Select>
    </FormControl>
  );
};

export default Gender;
