import React from "react";
import { Grid, Button } from "@mui/material";
import logo from "../assets/whatsapplogo.png";

const WhatsApp = () => {
  const handleWhatsAppClick = () => {
    window.location.href = "https://api.whatsapp.com/send?phone=971586133921";
  };
  return (
    <Grid sx={{ position: "sticky", bottom: 0, right: 0, zIndex: 1550 }}>
      <Button onClick={handleWhatsAppClick}>
        <img src={logo} alt="whatsApp logo" width="50px" />
      </Button>
    </Grid>
  );
};

export default WhatsApp;
