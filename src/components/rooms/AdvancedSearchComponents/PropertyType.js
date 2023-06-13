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
  const searchType = useSelector((state) => state.search.searchType);
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.45)",
    boxShadow: "0px 0px 15px  rgba(0,0,0,0.5)",
  };

  const selectedCheckboxStyle = {
    border: "2px solid #800080",
    bgcolor: "#fff",
  };

  const checkboxLabelStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    height: "100%",
    ml: 2,
  };

  return (
    <FormGroup sx={{ my: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
        Property Type
      </Typography>

      {searchType === "property" ? (
        <Grid container direction="column" sx={{ mt: 2, mb: 2 }}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <Grid
                container
                sx={{
                  ...checkboxContainerStyle,
                  ...(selectedPropertyType === "Room" && selectedCheckboxStyle),
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedPropertyType === "Room"}
                      onChange={handleCheckboxChange}
                      value="Room"
                      sx={{ display: "none" }}
                    />
                  }
                  label="Room"
                  sx={checkboxLabelStyle}
                />
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
      ) : (
        <Grid container direction="column" sx={{ mt: 2, mb: 2 }}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <Grid
                container
                sx={{
                  ...checkboxContainerStyle,
                  ...(selectedPropertyType === "Studio" &&
                    selectedCheckboxStyle),
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedPropertyType === "Studio"}
                      onChange={handleCheckboxChange}
                      value="Studio"
                      sx={{ display: "none" }}
                    />
                  }
                  label="Studio"
                  sx={checkboxLabelStyle}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid
                container
                sx={{
                  ...checkboxContainerStyle,
                  ...(selectedPropertyType === "Apartment" &&
                    selectedCheckboxStyle),
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedPropertyType === "Apartment"}
                      onChange={handleCheckboxChange}
                      value="Apartment"
                      sx={{ display: "none" }}
                    />
                  }
                  label="Apartment"
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
                  ...(selectedPropertyType === "House" &&
                    selectedCheckboxStyle),
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedPropertyType === "House"}
                      onChange={handleCheckboxChange}
                      value="House"
                      sx={{ display: "none" }}
                    />
                  }
                  label="House"
                  sx={checkboxLabelStyle}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} visibility="hidden">
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
      )}
    </FormGroup>
  );
};

export default PropertyType;
