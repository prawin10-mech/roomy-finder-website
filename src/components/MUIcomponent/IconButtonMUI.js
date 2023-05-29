import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SearchActions } from "../../store/Search";

export default function IconButtonMUI(props) {
  const dispatch = useDispatch();

  const searchType = useSelector((state) => state.search.searchType);
  const city = useSelector((state) => state.search.searchText);
  const propertyType = useSelector((state) => state.search.propertyType);
  const location = useSelector((state) => state.search.location);
  const gender = useSelector((state) => state.search.gender);
  const rentType = useSelector((state) => state.search.PreferredRentType);
  const action = useSelector((state) => state.search.action);

  const handleClick = async () => {
    try {
      const obj = { countryCode: "AE" };
      if (location) {
        obj.location = location;
      }
      if (city) {
        obj.city = city;
      }
      if (gender && gender !== "All") {
        obj.gender = gender;
      }
      if (rentType && rentType !== "All") {
        obj.preferedRentType = rentType;
      }
      if (propertyType && propertyType !== "All") {
        obj.type = propertyType;
      }
      if (action && action !== "All") {
        obj.action = action;
      }
      if (Object.keys(obj).length > 0) {
        const { data } = await axios.post(
          `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/ads/${searchType}-ad/available`,
          obj
        );
        dispatch(SearchActions.availableRooms(data));
      } else {
        console.log("obj is empty");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ ...props.IconButtonsx }}>
      <Button
        onClick={handleClick}
        sx={{
          background: "purple",
          color: "#fff",
          "&:hover": {
            background: "#fff",
            color: "purple",
            border: "2px solid purple",
          },
        }}
      >
        <SearchIcon />
      </Button>
    </Box>
  );
}
