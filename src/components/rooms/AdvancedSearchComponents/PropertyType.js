import React from "react";
import {
  FormGroup,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AdvanceSearchActions } from "../../../store/AdvanceSearch";

const PropertyType = () => {
  const selectedPropertyType = useSelector(
    (state) => state.advanceSearch.propertyType
  );
  const dispatch = useDispatch();

  const handleCheckboxChange = (event) => {
    const selectedItem = event.target.value;

    if (selectedPropertyType === selectedItem) {
      dispatch(AdvanceSearchActions.propertyType(null));
    } else {
      dispatch(AdvanceSearchActions.propertyType(selectedItem));
    }
  };

  const checkboxContainerStyle = {
    height: "80px",
    borderRadius: "20px",
    // textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.45)",
  };

  const selectedCheckboxStyle = {
    border: "2px solid #800080",
    bgcolor: "#fff",
  };

  const checkboxLabelStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center", // Add this line to center the text
  };

  return (
    <FormGroup sx={{ my: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
        Property Type
      </Typography>

      <Grid container direction="column" sx={{ mt: 2, mb: 2 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              sx={{
                ...checkboxContainerStyle,
                ...(selectedPropertyType === "Room" && selectedCheckboxStyle),
              }}
              onClick={handleCheckboxChange}
            >
              <label
                htmlFor="room-checkbox"
                sx={{ width: "100%", height: "100%", cursor: "pointer" }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      id="room-checkbox"
                      checked={selectedPropertyType === "Room"}
                      onChange={handleCheckboxChange}
                      value="Room"
                      sx={{ display: "none" }}
                    />
                  }
                  label="Room"
                  sx={checkboxLabelStyle}
                />
              </label>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              sx={{
                ...checkboxContainerStyle,
                ...(selectedPropertyType === "Partition" &&
                  selectedCheckboxStyle),
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedPropertyType === "Partition"}
                    onChange={handleCheckboxChange}
                    value="Partition"
                    sx={{ display: "none" }}
                  />
                }
                label="Partition"
                sx={checkboxLabelStyle}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              sx={{
                ...checkboxContainerStyle,
                ...(selectedPropertyType === "Master Room" &&
                  selectedCheckboxStyle),
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedPropertyType === "Master Room"}
                    onChange={handleCheckboxChange}
                    value="Master Room"
                    sx={{ display: "none" }}
                  />
                }
                label="Master Room"
                sx={checkboxLabelStyle}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              sx={{
                ...checkboxContainerStyle,
                ...(selectedPropertyType === "Bed" && selectedCheckboxStyle),
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedPropertyType === "Bed"}
                    onChange={handleCheckboxChange}
                    value="Bed"
                    sx={{ display: "none" }}
                  />
                }
                label="Bed"
                sx={checkboxLabelStyle}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FormGroup>
  );
};

export default PropertyType;
