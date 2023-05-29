import React, { useState } from "react";
import { FormGroup, Typography, TextField, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AdvanceSearchActions } from "../../../store/AdvanceSearch";

const Budget = () => {
  const dispatch = useDispatch();
  const minBudget = useSelector((state) => state.search.minBudget);
  const maxBudget = useSelector((state) => state.search.maxBudget);

  const handleMinBudgetChange = (event) => {
    const newValue = parseInt(event.target.value);
    dispatch(AdvanceSearchActions.minBudget(newValue));
  };

  const handleMaxBudgetChange = (event) => {
    const newValue = parseInt(event.target.value);
    dispatch(AdvanceSearchActions.maxBudget(newValue));
  };

  return (
    <FormGroup sx={{ my: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
        Budget Monthly
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Min Budget"
            type="number"
            value={minBudget}
            onChange={handleMinBudgetChange}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Max Budget"
            type="number"
            value={maxBudget}
            onChange={handleMaxBudgetChange}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
        </Grid>
      </Grid>
    </FormGroup>
  );
};

export default Budget;
