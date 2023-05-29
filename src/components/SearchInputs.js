import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchActions } from "../store/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
  Input,
  InputLabel,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import {
  citydata,
  dubaiCities,
  abuDahbiCities,
  sharjahCities,
  rasAlkimaCities,
  ummAlQuwainCities,
  ajmanCities,
  jeddahCities,
  meccaCities,
  riyadhCities,
} from "../utils/citydata";

const SearchInputs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredCities, setFilteredCities] = useState([]);
  const searchType = useSelector((state) => state.search.searchType);
  const searchText = useSelector((state) => state.search.searchText);
  const propertyType = useSelector((state) => state.search.propertyType);
  const location = useSelector((state) => state.search.location);
  const price = useSelector((state) => state.search.price);
  const minPrice = useSelector((state) => state.search.minPrice);
  const maxPrice = useSelector((state) => state.search.maxPrice);
  const gender = useSelector((state) => state.search.gender);
  const rentPeriod = useSelector((state) => state.search.PreferredRentType);
  const commercialProperty = useSelector(
    (state) => state.search.commercialProperty
  );
  const [advanceSearch, setAdvanceSearch] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [locationdata, setlocationdata] = useState([]);
  const [error, setError] = useState(null);

  const propertyTypeOptions =
    searchType === "property"
      ? ["All", "Bed", "Master Room", "Partition", "Room"]
      : ["All", "Studio", "Apartment", "House"];

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
  useEffect(() => {
    viewArrayData();
  }, [searchText]);

  const handleSearchTextChange = (event, value) => {
    const searchText = value || "";
    const filtered = citydata.filter((city) =>
      city.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCities(filtered);
    dispatch(SearchActions.searchText(searchText));
  };

  const handleCityClick = (event, value) => {
    dispatch(SearchActions.searchText(value));
  };

  const handleLocationClick = (event, value) => {
    dispatch(SearchActions.location(value));
  };

  const handlePropertyTypeChange = (e) => {
    dispatch(SearchActions.propertyType(e.target.value));
  };

  const commercialPropertyHandle = (e) => {
    dispatch(SearchActions.commercialProperty(e.target.checked));
  };

  const handleGenderChange = (e) => {
    dispatch(SearchActions.gender(e.target.value));
  };

  const handleRentPeriodChange = (e) => {
    dispatch(SearchActions.PreferredRentType(e.target.value));
  };

  const handleAdvanceSearch = (e) => {
    setAdvanceSearch(!advanceSearch);
  };
  const handleMinPriceInput = (e) => {
    dispatch(SearchActions.minPrice(e.target.value));
  };
  const handleMaxPriceInput = (e) => {
    dispatch(SearchActions.maxPrice(e.target.value));
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const obj = { countryCode: "AE" };

      if (searchText) {
        obj.city = searchText;
      }
      if (location) {
        obj.location = location;
      }

      if (propertyType && propertyType !== "All") {
        obj.type = propertyType;
      }
      if (price && price !== "All") {
        obj.price = price;
      }

      if (gender && gender !== "All") {
        obj.gender = gender;
      }

      if (rentPeriod) {
        obj.preferedRentType = rentPeriod;
      }

      // if (commercialProperty) {
      //   obj.commercialProperty = commercialProperty;
      // }

      if (Object.keys(obj).length > 0) {
        const { data } = await axios.post(
          `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/${searchType}-ad/available`,
          obj
        );
        dispatch(SearchActions.availableRooms(data));
        navigate("/sp");
      } else {
        console.log("obj is empty");
      }
    } catch (error) {
      setError("An error occurred while searching. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    searchContainer: {
      display: "flex",
      gap: 2,
      flexDirection: { xs: "column", lg: "row" },
      marginBottom: 2,
    },
    formControl: {
      flex: { xs: "1 1 100%", lg: "1 1 auto" },
      marginRight: { xs: 0, lg: 2 },
      width: "100%", // Add this line to set the width to 100%
    },
    buttonContainer: {
      flex: { xs: "1 1 100%", lg: "1 1 auto" },
      display: "flex",
      alignItems: "center",
      marginTop: { xs: 2, lg: 0 },
      justifyContent: { xs: "flex-start", lg: "flex-end" },
    },
    button: {
      padding: 2,
      border: "2px solid slate",
      marginLeft: { xs: 0, lg: 2 },
      backgroundColor: "purple.700",
      borderRadius: "md",
    },
    advancedSearchContainer: {
      marginTop: 2,
      display: "flex",
      flexDirection: { xs: "column", lg: "row" },
      justifyContent: { xs: "flex-start", lg: "space-between" },
      alignItems: { xs: "flex-start", lg: "center" },
    },
    commercialCheckboxContainer: {
      display: "flex",
      alignItems: "center",
    },
    advancedSearchText: {
      marginTop: { xs: 2, lg: 0 },
      marginLeft: { xs: 0, lg: 2 },
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
  };

  return (
    <Box>
      <Box sx={styles.searchContainer}>
        <Box sx={styles.formControl}>
          <Autocomplete
            options={filteredCities}
            value={searchText}
            onChange={handleCityClick}
            onInputChange={handleSearchTextChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                type="text"
                fullWidth
                variant="outlined"
              />
            )}
          />
        </Box>

        <Box sx={styles.formControl}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="propertyType">Property Type</InputLabel>
            <Select
              id="propertyType"
              label="Property Type"
              value={propertyType}
              onChange={handlePropertyTypeChange}
              fullWidth
            >
              {propertyTypeOptions.map((property) => (
                <MenuItem key={property} value={property}>
                  {property}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={styles.formControl}>
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
              />
            )}
            style={{ width: "100%" }}
          />
        </Box>

        {/* <Box sx={styles.formControl}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="price">Price</InputLabel>
            <Select
              id="price"
              label="Price"
              value={price}
              onChange={searchPriceHandle}
              fullWidth
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="1 to 5">1 to 5</MenuItem>
              <MenuItem value="5 to 10">5 to 10</MenuItem>
              <MenuItem value="10 to 15">10 to 15</MenuItem>
              <MenuItem value="15 to 20">15 to 20</MenuItem>
              <MenuItem value="+20">+20</MenuItem>
            </Select>
          </FormControl>
        </Box> */}

        <Box sx={styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            sx={styles.button}
            onClick={handleSearch}
            startIcon={<SearchIcon />}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Search"}
          </Button>
        </Box>
      </Box>

      <Box sx={styles.advancedSearchContainer}>
        <Box sx={styles.commercialCheckboxContainer}>
          <FormControlLabel
            control={
              <Checkbox
                id="commercial"
                checked={commercialProperty}
                onChange={commercialPropertyHandle}
              />
            }
            label="Show commercial properties only"
          />
        </Box>

        <Box sx={styles.advancedSearchContainer}>
          <Typography
            variant="body1"
            sx={styles.advancedSearchText}
            onClick={handleAdvanceSearch}
          >
            Advanced search
            {advanceSearch ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </Typography>
        </Box>
      </Box>

      {advanceSearch && (
        <Box sx={{ display: "flex" }}>
          <Box sx={styles.formControl}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="rentPeriod">Rent Period</InputLabel>
              <Select
                id="rentPeriod"
                label="RentPeriod"
                value={rentPeriod}
                onChange={handleRentPeriodChange}
                fullWidth
              >
                {["Monthly", "Weekly", "Daily"].map((property) => (
                  <MenuItem key={property} value={property}>
                    {property}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={styles.formControl}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="gender">Gender</InputLabel>
              <Select
                id="gender"
                label="Gender"
                value={gender}
                onChange={handleGenderChange}
                fullWidth
              >
                {["Male", "Female"].map((property) => (
                  <MenuItem key={property} value={property}>
                    {property}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={styles.formControl}>
            <FormControl variant="outlined" fullWidth>
              {/* <InputLabel htmlFor="minPrice">Min Price</InputLabel> */}
              <TextField
                type="number"
                id="minPrice"
                label="minPrice"
                value={minPrice}
                onChange={handleMinPriceInput}
                fullWidth
              />
            </FormControl>
          </Box>
          <Box sx={styles.formControl}>
            <FormControl variant="outlined" fullWidth>
              {/* <InputLabel htmlFor="maxPrice">Max Price</InputLabel> */}
              <TextField
                type="number"
                id="maxPrice"
                label="maxPrice"
                value={maxPrice}
                onChange={handleMaxPriceInput}
                fullWidth
              />
            </FormControl>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SearchInputs;
