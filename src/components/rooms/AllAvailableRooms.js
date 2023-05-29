import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import AvailableRoom from "./AvaibleRoom";

const AllAvailableRooms = () => {
  const availableRooms = useSelector((state) => state.search.availableRooms);
  const minPrice = useSelector((state) => state.search.minPrice);
  const maxPrice = useSelector((state) => state.search.maxPrice);

  let allAvailableRoomsData = "";
  if (availableRooms.length !== 0) {
    console.log(availableRooms);
    allAvailableRoomsData = availableRooms?.map((room, index) => {
      if (minPrice && !maxPrice && room.monthlyPrice > minPrice) {
        return <AvailableRoom room={room} key={index} />;
      }
      if (maxPrice && !minPrice && room.monthlyPrice < maxPrice) {
        return <AvailableRoom room={room} key={index} />;
      }
      if (
        minPrice &&
        maxPrice &&
        room.monthlyPrice >= minPrice &&
        room.monthlyPrice <= maxPrice
      ) {
        return <AvailableRoom room={room} key={index} />;
      } else {
        return <AvailableRoom room={room} key={index} />;
      }
    });
  } else {
    allAvailableRoomsData = <p>No Results Found</p>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        "& > div": {
          width: "100%",
          "@media (min-width: 600px)": {
            width: "100%",
          },
        },
      }}
    >
      {allAvailableRoomsData}
    </Box>
  );
};

export default AllAvailableRooms;
