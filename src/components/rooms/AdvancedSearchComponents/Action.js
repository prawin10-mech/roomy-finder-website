import React from "react";
import { Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AdvanceSearchActions } from "../../../store/AdvanceSearch";

const Action = () => {
  const dispatch = useDispatch();
  const action = useSelector((state) => state.advanceSearch.action);

  const handleActionSelection = (data) => {
    dispatch(AdvanceSearchActions.action(data));
  };

  const cityOptions = ["NEED ROOM", "HAVE ROOM", "ALL"].map((data) => (
    <Grid
      sx={{
        border: action === data ? "2px solid orange" : "",
        textAlign: "center",
        p: 2,
        borderRadius: "15px",
        boxShadow: "0px 0px 9px  rgba(0,0,0,0.5)",
        cursor: "pointer",
      }}
      onClick={() => handleActionSelection(data)}
    >
      {data}
    </Grid>
    // <MenuItem key={city} value={city !== "ALL" ? city : ""}>
    //   {city}
    // </MenuItem>
  ));

  return (
    <Grid sx={{ width: "100%" }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
        Action
      </Typography>
      <Grid container gap={2} justifyContent="center">
        {cityOptions}
      </Grid>
    </Grid>
  );
};

export default Action;
