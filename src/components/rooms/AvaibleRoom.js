import React, { useState, useCallback, memo } from "react";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { Carousel } from "react-responsive-carousel";
import {
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import dummy from "../../assets/demo.jpg";
import { useSelector } from "react-redux";

const AvailableRoom = memo(({ room }) => {
  const [liked, setLiked] = useState(false);
  const images = room.images.length > 0 ? room.images : [dummy] || [dummy];
  const searchType = useSelector((state) => state.search.searchType);
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    setLiked((prevState) => !prevState);
  }, []);

  return (
    <Card
      key={`room-${room.id}`}
      variant="outlined"
      sx={{
        mb: 3,
        display: "flex",
        border: "1px solid #555",
        position: "relative",
      }}
    >
      <Box sx={{ width: "400px", height: "250px" }}>
        <Carousel autoPlay>
          {images.map((image, index) => (
            <CardMedia
              key={index}
              component="img"
              height="100%"
              width="100%"
              image={image}
              alt={`available room ${index}`}
              sx={{
                objectFit: "cover",
                objectPosition: "center",
                width: "300px",
                height: "250px",
                borderRadius: "15px",
                padding: "8px",
              }}
            />
          ))}
        </Carousel>
        <IconButton
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            color: liked ? "red" : "",
          }}
          onClick={handleClick}
        >
          <FavoriteIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          // justifyContent: "space-between",
          ml: 2,
          mt: 1,
        }}
      >
        <Box>
          <Box>
            {!room.action && <Typography variant="h6">{room.type}</Typography>}

            {room.action && (
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {room.poster?.firstName} {room.poster?.lastName},{" "}
                {room?.aboutYou?.age || "Unknown age"}
              </Typography>
            )}

            {!room.action && (
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {room.preferedRentType === "Monthly" &&
                  (
                    room.monthlyPrice +
                    0.1 * room.monthlyPrice
                  ).toLocaleString()}
                {room.preferedRentType === "Weekly" &&
                  (room.weeklyPrice + 0.1 * room.weeklyPrice).toLocaleString()}
                {room.preferedRentType === "Daily" &&
                  (room.dailyPrice + 0.05 * room.dailyPrice).toLocaleString()}
                <span style={{ fontSize: "0.8em" }}> AED</span>
              </Typography>
            )}
            {room.action && (
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Budget {room.budget.toLocaleString()} AED
              </Typography>
            )}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2">{room.description}</Typography>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <LocationMarkerIcon className="h-5 w-5 mr-1 text-gray-500" />
              {room.address.appartmentNumber} {room.address.buildingName}{" "}
              {room.address.city} {room.address.location}
            </Typography>
          </Box>
        </Box>
        {/* <Box
          sx={{
            // right: "0px",
            display: "flex",
            // justifyContent: "end",
            ml: "auto",
          }}
        >
          <Button
            variant="contained"
            onClick={() =>
              searchType === "property"
                ? navigate(`/rooms/view-room/${room.id}`)
                : navigate(`/upgrade-plan/user/${room.id}`)
            }
            style={{
              backgroundColor: "orange",
              color: "white",
              borderRadius: "15px",
              fontWeight: "700",
            }}
          >
            All details
          </Button>
        </Box> */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            padding: "8px",
          }}
        >
          <Button
            variant="contained"
            onClick={() =>
              searchType === "property"
                ? navigate(`/rooms/view-room/${room.id}`)
                : navigate(`/upgrade-plan/user/${room.id}`)
            }
            style={{
              backgroundColor: "orange",
              color: "white",
              borderRadius: "15px",
              fontWeight: "700",
            }}
          >
            All details
          </Button>
        </Box>
      </Box>
    </Card>
  );
});

export default AvailableRoom;
