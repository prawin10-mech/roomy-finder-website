import React from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import { PhotoCamera, Delete,  } from "@mui/icons-material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/index";
import { useDispatch, useSelector } from "react-redux";
 import { TenantActions } from "../../store/Tenant";
// import { PropertyActions } from "../../store/Property";

const ImageInput = () => {
  const imageUrls = useSelector((state) => state.property.images);
  const dispatch = useDispatch();

  const handleImageChange = async (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file)
        .then(() => {
          getDownloadURL(storageRef)
            .then((url) => {
              dispatch(TenantActions.images(url));
              // dispatch(PropertyActions.images(url));
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log("uploadError", err);
        });
    }
  };

  const handleDeleteImage = (index) => {
    dispatch(TenantActions.deleteImage(index));
    // dispatch(PropertyActions.deleteImage(index));
  };

  const imageUrlsData = imageUrls.map((imageUrl, index) => (
    <Grid item key={index}>
      <div style={{ position: "relative" }}>
        <img
          src={imageUrl}
          alt={` ${index + 1}`}
          style={{ maxWidth: 150, maxHeight: 100 }}
        />
        <IconButton
          style={{ position: "absolute", top: 0, right: 0 }}
          onClick={() => handleDeleteImage(index)}
        >
          <Delete />
        </IconButton>
      </div>
    </Grid>
  ));

  return (
    // <Grid container spacing={2} alignItems="center">
    //   <Grid item onChange={handleImageChange}>
    //     {/* <Grid container direction="row" justify="center">
    //       {imageUrls.length > 0 ? (
    //         imageUrlsData
    //       ) : (
    //         <Typography>IMAGES </Typography>
    //       )}
    //     </Grid> */}
    //     <IconButton component="label" style={{ color: "purple" }}>
    //       <CameraAltIcon />
    //       <input
    //         type="file"
    //         accept="image/*"
    //         style={{ display: "none" }}
    //         multiple
    //       />
    //     </IconButton>
    //     {/* <Typography>Select image</Typography> */}
    //   </Grid>
    // </Grid>

    <Grid container>
      <Grid item>
        <IconButton
          component="label"
          style={{ color: "purple", height: "50px" }}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            color: "purple",
            borderRadius: "20px",
            bgcolor: "#F7F1F3",
            "&:hover": {
              bgcolor: "#ff9900",
            },
            "@media (max-width: 600px)": {
              fontSize: "12px",
            },
          }}
          onChange={handleImageChange}
        >
          <CameraAltIcon />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            multiple
          />
          <Typography
            sx={{
              color: "black",
              mx: 1,
            }}
          >
            Images
          </Typography>
        </IconButton>
      </Grid>

      {/* <Grid item>
        {isUploading ? (
          <CircularProgress size={20} />
        ) : (
          <Box>
            {videoSrcs && videoSrcs.length > 0
              ? videoSrcs.map((videoSrc, index) => (
                  <Box key={index} display="flex" flexDirection="row">
                    <video src={videoSrc} controls style={videoStyle}></video>
                    <IconButton onClick={() => handleDeleteVideo(index)}>
                      <Delete />
                    </IconButton>
                  </Box>
                ))
              : ""}
          </Box>
        )}
      </Grid> */}
    </Grid>
  );
};

export default ImageInput;
