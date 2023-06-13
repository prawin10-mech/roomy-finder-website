import React, { useState } from "react";
import AdvancedSearchBg from "../../assets/AdvanceSearchBg.jpg";
import { Grid, Paper, Typography, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { SearchActions } from "../../store/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Budget from "./AdvancedSearchComponents/Budget";
import PropertyType from "./AdvancedSearchComponents/PropertyType";
import Gender from "./AdvancedSearchComponents/Gender";
import PreferredRentType from "./AdvancedSearchComponents/PreferredRentType";
import City from "./AdvancedSearchComponents/City";
import Location from "./AdvancedSearchComponents/Location";
import Action from "./AdvancedSearchComponents/Action";
import { AdvanceSearchActions } from "../../store/AdvanceSearch";

const AdvancedSearch = () => {
  const navigate = useNavigate();
  const [advance, setAdvance] = useState(false);
  const dispatch = useDispatch();
  const searchType = useSelector((state) => state.search.searchType);
  const [loading, setLoading] = useState(false);
  const type = useSelector((state) => state.advanceSearch.propertyType);
  const minBudget = useSelector((state) => state.advanceSearch.minBudget);
  const maxBudget = useSelector((state) => state.advanceSearch.maxBudget);
  const gender = useSelector((state) => state.advanceSearch.gender);
  const action = useSelector((state) => state.advanceSearch.action);

  const preferredRentType = useSelector(
    (state) => state.advanceSearch.preferredRentType
  );

  const handleClearFilter = async () => {
    const { data } = await axios.post(
      `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/${searchType}-ad/available`,
      { countryCode: "AE" }
    );
    dispatch(SearchActions.availableRooms(data));
    dispatch(AdvanceSearchActions.clear());
  };

  const advanceSearchHandler = async () => {
    try {
      setLoading(true);
      const obj = { countryCode: "AE" };

      if (type) {
        obj.type = type;
      }

      if (searchType === "roommate" && action) {
        obj.action = action;
      }

      // if (minBudget) {
      //   obj.minBudget = minBudget;
      // }

      // if (maxBudget) {
      //   obj.maxBudget = maxBudget;
      // }

      if (gender) {
        obj.gender = gender;
      }
      if (action && action !== "All") {
        obj.action = action;
      }

      if (preferredRentType) {
        obj.preferedRentType = preferredRentType;
      }

      if (Object.keys(obj).length > 0) {
        const { data } = await axios.post(
          `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/${searchType}-ad/available`,
          obj
        );

        let filteredData;
        if (minBudget && !maxBudget) {
          filteredData = data.filter((room) => {
            return room.monthlyPrice > minBudget;
          });
        } else if (!minBudget && maxBudget) {
          filteredData = data.filter((room) => {
            return room.monthlyPrice < minBudget;
          });
        } else if (minBudget && maxBudget) {
          filteredData = data.filter((room) => {
            return (
              room.monthlyPrice > minBudget && room.monthlyPrice < maxBudget
            );
          });
        } else {
          filteredData = data;
        }

        console.log(filteredData);
        dispatch(SearchActions.availableRooms(filteredData));
      } else {
        console.log("obj is empty");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        height: "100%",
        p: 2,
        background: "#fff",
        backgroundSize: "cover",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: "bolder", marginBottom: "1rem" }}
      >
        Advanced Search
      </Typography>
      {searchType === "Roommate" && <Action />}
      <PropertyType />

      <PreferredRentType />
      <City />
      <Location />
      <Gender />
      <Budget />

      <Grid
        container
        justifyContent="center"
        mt={2}
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Button
            variant="contained"
            onClick={handleClearFilter}
            sx={{
              bgcolor: "orange",
              color: "#fff",
              "&:hover": {
                bgcolor: "darkorange",
                color: "#fff",
              },
            }}
          >
            Clear Filter
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={advanceSearchHandler}
            disabled={loading}
            sx={{
              bgcolor: "orange",
              color: "#fff",
              "&:hover": {
                bgcolor: "darkorange",
                color: "#fff",
              },
            }}
          >
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
            Search
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AdvancedSearch;
