import React from "react";
import { Box } from "@mui/material";
import HouseSearch from "../assets/houseSearch.png";

const FloatingImage = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "-25px",
        marginRight: 12,
      }}
    >
      <img
        src={HouseSearch}
        alt="Search house logo"
        width="300px"
        height="300px"
        style={{ objectFit: "cover" }}
      />
    </Box>
  );
};

export default FloatingImage;
