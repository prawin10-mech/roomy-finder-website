import React from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";
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

  // Check if camera is supported by the browser
  const isCameraSupported =
    "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices;

  if (isCameraSupported) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.createElement("video");
      document.body.appendChild(videoElement);
      videoElement.srcObject = stream;
      await videoElement.play();

      const canvasElement = document.createElement("canvas");
      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;
      const context = canvasElement.getContext("2d");

      const captureButton = document.createElement("button");
      captureButton.textContent = "Capture";
      document.body.appendChild(captureButton);

      captureButton.addEventListener("click", async () => {
        context.drawImage(
          videoElement,
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );

        // Stop the video stream
        stream.getTracks().forEach((track) => track.stop());
        videoElement.remove();
        captureButton.remove();

        const capturedImage = canvasElement.toDataURL("image/jpeg");

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadString(storageRef, capturedImage, "data_url")
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
      });
    } catch (error) {
      console.log("Camera access denied or error occurred:", error);
    }
  } else {
    console.log("Camera not supported by the browser.");
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
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        {/* <Grid container direction="row" justify="center">
          {imageUrls.length > 0 ? (
            imageUrlsData
          ) : ( 
            <Typography>IMAGES </Typography>
          )}
        </Grid> */}
        <IconButton component="label" style={{ color: "purple" }}>
          <CameraAltIcon />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
            multiple
          />
        </IconButton>
        {/* <Typography>Select image</Typography> */}
      </Grid>
    </Grid>
  );
};

export default ImageInput;
