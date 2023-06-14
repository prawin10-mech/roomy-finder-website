import React from "react";
import { Checkbox, Grid, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSelector, useDispatch } from "react-redux";
import { PropertyActions } from "../../store/Property";
import { allAmenities } from "../../utils/AllAmenities";

const InputCheckbox = ({ values, selectedValues }) => {
  const dispatch = useDispatch();
  const amenities = useSelector((state) => state.property.amenities) || [];

  const handleChange = (event) => {
    const value = event.target.value;
    const currentIndex = amenities.indexOf(value);
    const newCheckedValues = [...amenities];

    if (currentIndex === -1) {
      newCheckedValues.push(value);
    } else {
      newCheckedValues.splice(currentIndex, 1);
    }
    dispatch(PropertyActions.amenities(newCheckedValues));
  };

  if (!Array.isArray(allAmenities) || allAmenities.length === 0) {
    return <div>No values provided.</div>;
  }

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {allAmenities.map(({ value }) => (
        <Grid item xs={12} sm={6} md={4} key={value} sx={{ width: "100%" }}>
          <FormControlLabel
            label={value}
            control={
              <Checkbox
                checked={amenities.indexOf(value) !== -1}
                onChange={handleChange}
                value={value}
                inputProps={{ "aria-label": value }}
                sx={{
                  display: "none",
                }}
              />
            }
            sx={{
              "& .MuiTypography-root": {
                fontSize: "14px",
                fontWeight: "500",
              },
              "& .MuiFormControlLabel-label": {
                border: `2px solid ${
                  amenities.indexOf(value) !== -1 ? "orange" : "transparent"
                }`,
                borderRadius: "5px",
                padding: "8px 12px",
                width: "100%",
                boxSizing: "border-box",
              },
              "&.MuiFormControlLabel-root": {
                marginBottom: "8px",
                width: "100%",
              },
            }}
            checked={amenities.indexOf(value) !== -1}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default InputCheckbox;
