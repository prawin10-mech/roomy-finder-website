import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  dubaiCities,
  abuDahbiCities,
  sharjahCities,
  rasAlkimaCities,
  ummAlQuwainCities,
  ajmanCities,
  jeddahCities,
  meccaCities,
  riyadhCities,
} from "../../../utils/citydata";
import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { AdvanceSearchActions } from "../../../store/AdvanceSearch";

const Location = () => {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.advanceSearch.city);
  const location = useSelector((state) => state.search.location);
  const [locationdata, setlocationdata] = useState([]);
  const viewArrayData = () => {
    if (searchText === "Dubai") {
      setlocationdata(dubaiCities);
    } else if (searchText === "Abu Dhabi") {
      setlocationdata(abuDahbiCities);
    } else if (searchText === "Sharjah") {
      setlocationdata(sharjahCities);
    } else if (searchText === "Ras Al Kima") {
      setlocationdata(rasAlkimaCities);
    } else if (searchText === "Umm Al-Quwain") {
      setlocationdata(ummAlQuwainCities);
    } else if (searchText === "Ajman") {
      setlocationdata(ajmanCities);
    } else if (searchText === "Riyadh") {
      setlocationdata(riyadhCities);
    } else if (searchText === "Mecca") {
      setlocationdata(meccaCities);
    } else if (searchText === "Jeddah") {
      setlocationdata(jeddahCities);
    } else {
      setlocationdata([]);
    }
  };
  const handleLocationClick = (event, value) => {
    dispatch(AdvanceSearchActions.location(value));
  };

  useEffect(() => {
    viewArrayData();
  }, [searchText]);

  const styles = {
    formControl: {
      flex: { xs: "1 1 100%", lg: "1 1 auto" },
      marginRight: { xs: 0, lg: 2 },
      width: "100%", // Add this line to set the width to 100%
    },
  };
  return (
    <Grid sx={styles.formControl}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
        Location
      </Typography>
      <Autocomplete
        options={locationdata}
        value={location}
        onChange={handleLocationClick}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Location"
            type="text"
            fullWidth
            variant="outlined"
            value={location}
          />
        )}
        style={{ width: "100%" }}
      />
    </Grid>
  );
};

export default Location;
