import React from "react";
import { MenuItem, FormControl, Select, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AdvanceSearchActions } from "../../../store/AdvanceSearch";

const Action = () => {
  const dispatch = useDispatch();
  const action = useSelector((state) => state.advanceSearch.action);

  const handleActionSelection = (e) => {
    if (e.target.value !== "ALL")
      dispatch(AdvanceSearchActions.action(e.target.value));
  };

  const cityOptions = ["NEED ROOM", "HAVE ROOM", "ALL"].map((city) => (
    <MenuItem key={city} value={city}>
      {city}
    </MenuItem>
  ));

  return (
    <FormControl sx={{ width: "100%" }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
        Action
      </Typography>
      <Select
        value={action}
        onChange={handleActionSelection}
        displayEmpty
        renderValue={(selected) => selected || "Action"}
      >
        <MenuItem disabled value="">
          <em>Select Gender</em>
        </MenuItem>
        {cityOptions}
      </Select>
    </FormControl>
  );
};

export default Action;
