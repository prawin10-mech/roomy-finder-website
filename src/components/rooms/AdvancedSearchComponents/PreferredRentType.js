import React from "react";
import { MenuItem, FormControl, Select, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AdvanceSearchActions } from "../../../store/AdvanceSearch";

const PreferredRentType = () => {
  const dispatch = useDispatch();
  const rentType = useSelector(
    (state) => state.advanceSearch.preferredRentType
  );

  const handleGenderSelection = (e) => {
    dispatch(AdvanceSearchActions.preferredRentType(e.target.value));
  };

  const cityOptions = ["Monthly", "Weekly", "Daily"].map((city) => (
    <MenuItem key={city} value={city}>
      {city}
    </MenuItem>
  ));

  return (
    <FormControl sx={{ width: "100%" }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
        Rent
      </Typography>
      <Select
        value={rentType}
        onChange={handleGenderSelection}
        displayEmpty
        renderValue={(selected) => selected || "Rent type"}
      >
        <MenuItem disabled value="">
          <em>Select Rent type</em>
        </MenuItem>
        {cityOptions}
      </Select>
    </FormControl>
  );
};

export default PreferredRentType;
