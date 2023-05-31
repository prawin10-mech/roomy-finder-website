import React, { useState } from "react";
import {
  Grid,
  Typography,
  IconButton,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import { VideoCameraFront, Delete } from "@mui/icons-material";
import { storage } from "../../firebase/index";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { TenantActions } from "../../store/Tenant";

const VideoInput = () => {

    const dispatch = useDispatch();
    const videoSrcs = useSelector((state) => state.property.videos);
    const [isUploading, setIsUploading] = useState(false);

    const handleVideoChange = async (e) => {
      setIsUploading(true);
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const storageRef = ref(storage, `videos/${file.name}`);
        await uploadBytes(storageRef, file)
          .then(() => {
            getDownloadURL(storageRef)
              .then((url) => {
                setIsUploading(false);
                dispatch(TenantActions.videos(url));
                // dispatch(PropertyActions.videos(url));
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

    const handleDeleteVideo = (index) => {
      dispatch(TenantActions.deleteVideo(index));
      // dispatch(PropertyActions.deleteVideo(index));
    };

    const videoStyle = {
      width: "100%",
      height: "auto",
      borderRadius: "8px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      marginTop: "16px",
    };
 

  return (
    // <Button
    //   variant="contained"
    //   sx={{
    //     color: "purple",
    //     borderRadius: "20px",
    //     bgcolor: "#F7F1F3",
    //     "&:hover": {
    //       bgcolor: "#ff9900",
    //     },
    //     "@media (max-width: 600px)": {
    //       fontSize: "12px",
    //     },
    //   }}
    //   startIcon={<Videovalue />}
    // >
    //   Videos
    // </Button>

    <Grid
      container
    >
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
        >
          <VideoCameraFront />
          <input
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            multiple
          />
          <Typography
            sx={{
              color:"black",
              mx:1
            }}
          >
            VIDEOS
          </Typography>
        </IconButton>
      </Grid>

      <Grid item>
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
      </Grid>
    </Grid>
  );
};

export default VideoInput;


// export const Videovalue= ()=>{

//    const dispatch = useDispatch();
//   const videoSrcs = useSelector((state) => state.property.videos);
//   const [isUploading, setIsUploading] = useState(false);

//   const handleVideoChange = async (e) => {
//     setIsUploading(true);
//     const files = e.target.files;
//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const storageRef = ref(storage, `videos/${file.name}`);
//       await uploadBytes(storageRef, file)
//         .then(() => {
//           getDownloadURL(storageRef)
//             .then((url) => {
//               setIsUploading(false);
//               dispatch(TenantActions.videos(url));
//               // dispatch(PropertyActions.videos(url));
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         })
//         .catch((err) => {
//           console.log("uploadError", err);
//         });
//     }
//   };

//   const handleDeleteVideo = (index) => {
//     dispatch(TenantActions.deleteVideo(index));
//     // dispatch(PropertyActions.deleteVideo(index));
//   };

//   const videoStyle = {
//     width: "100%",
//     height: "auto",
//     borderRadius: "8px",
//     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//     marginTop: "16px",
//   };

//   return (

//   <Grid container spacing={2} alignItems="center">
//       <Grid item>
//         <IconButton component="label" style={{ color: "purple" }}>
//           <VideoCameraFront />
//           <input
//             type="file"
//             accept="video/*"
//             style={{ display: "none" }}
//             onChange={handleVideoChange}
//             multiple
//           />
//         </IconButton>
//       </Grid>
//       <Grid item>
//         {isUploading ? (
//           <CircularProgress size={20} />
//         ) : (
//           <Box>
//             {videoSrcs && videoSrcs.length > 0
//               ? videoSrcs.map((videoSrc, index) => (
//                   <Box key={index} display="flex" flexDirection="row">
//                     <video src={videoSrc} controls style={videoStyle}></video>
//                     <IconButton onClick={() => handleDeleteVideo(index)}>
//                       <Delete />
//                     </IconButton>
//                   </Box>
//                 ))
//               : ""}
//           </Box>
//         )}
//       </Grid>
//     </Grid>
//   )
// }
