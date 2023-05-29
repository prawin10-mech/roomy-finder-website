import { Grid, Typography } from "@mui/material";
import React from "react";
import TopBackground from "../components/postPropertyComponents/TopBackground";
import BottomBackground from "../components/postPropertyComponents/BottomBackground";

const AboutUs = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TopBackground />
      </Grid>
      <Grid item container maxWidth={700} margin="auto" spacing={4} my={2}>
        <Grid item xs={12}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            About Roomy Finder
          </Typography>
          <Typography variant="body1" paragraph>
            Roomy Finder is an innovative room and roommate finder app designed
            to simplify your search for the perfect living space. Whether you're
            looking for an affordable room to rent or seeking a compatible
            roommate, Roomy Finder is here to help.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" fontWeight={600} gutterBottom>
            Find Rooms with Ease
          </Typography>
          <Typography variant="body1" paragraph>
            Our unique search engine allows you to browse through a large
            database of available rooms in your desired location. Specify your
            preferences such as price range, amenities, and location to narrow
            down your search and discover the best options that suit your needs.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" fontWeight={600} gutterBottom>
            Connect with Potential Roommates
          </Typography>
          <Typography variant="body1" paragraph>
            Finding the right roommate is just as important as finding the right
            room. Roomy Finder provides a platform for you to connect with
            potential roommates who share your interests, lifestyle, and
            compatibility. Browse through detailed profiles, including shared
            interests, habits, and preferences, to find someone who matches your
            vibe and living preferences.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" paragraph>
            Don't settle for less when it comes to your living situation.
            Download Roomy Finder today and discover a world of possibilities in
            finding the perfect room and compatible roommates. Take the stress
            out of your search and start enjoying the benefits of shared living
            with Roomy Finder!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" paragraph>
            "Discover available rooms, connect with compatible roommates, and
            create your ideal living arrangement with the Roomy Finder app."
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <BottomBackground />
      </Grid>
    </Grid>
  );
};

export default AboutUs;
