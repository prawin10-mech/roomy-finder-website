import React, { useState } from "react";
import {
  Grid,
  Select,
  MenuItem,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { roomsTypeActions } from "../store/Rooms";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../utils/ToastOptions";

import UAE from "../assets/flags/UAE.png";
import SA from "../assets/flags/SA.png";
import QA from "../assets/flags/QA.png";
import BH from "../assets/flags/BH.png";
import KW from "../assets/flags/KW.png";
import OM from "../assets/flags/OM.png";
// import US from "../assets/flags/US.png";
// import GB from "../assets/flags/GB.png";
// import IN from "../assets/flags/IN.png";
// import TR from "../assets/flags/TR.png";

const countries = [
  { name: "United Arab Emirates", flag: UAE, code: "AE" },
  { name: "Saudi Arabia", flag: SA, code: "SA" },
  { name: "Qatar", flag: QA, code: "QA" },
  { name: "Bahrain", flag: BH, code: "BH" },
  { name: "Kuwait", flag: KW, code: "KW" },
  { name: "Oman", flag: OM, code: "OM" },
  { name: "United States", flag: "🇺🇸", code: "US" },
  { name: "United Kingdom", flag: "🇬🇧", code: "GB" },
  { name: "India", flag: "🇮🇳", code: "IN" },
  { name: "Turkey", flag: "🇹🇷", code: "TR" },
];

const Countries = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const [CountryButton, setCountryButton] = useState(UAE);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Grid>
      <Button onClick={handleOpenDialog}>
        <img src={CountryButton} alt="country flag" width="40px" />
      </Button>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Select Country</DialogTitle>
        <DialogContent>
          <List>
            {countries.map((country) => (
              <ListItem
                key={country.name}
                button
                onClick={() => {
                  if (
                    country.name === "United Arab Emirates" ||
                    country.name === "Saudi Arabia"
                  ) {
                    handleCloseDialog();
                    dispatch(roomsTypeActions.country(country.code));
                    setCountryButton(country.flag);
                  } else {
                    handleCloseDialog();
                    toast.success("Coming soon", toastOptions);
                  }
                }}
              >
                <ListItemText primary={`${country.name}`} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </Grid>
  );
};

export default Countries;
