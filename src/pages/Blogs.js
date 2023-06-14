import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopBackground from "../components/postPropertyComponents/TopBackground";
import BottomBackground from "../components/postPropertyComponents/BottomBackground";
import Footer from "../components/Footer";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const navigate = useNavigate();

  const getBlogs = async () => {
    try {
      setBlogsLoading(true);
      const { data } = await axios.get(
        "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/blog-post"
      );
      setBlogs(data);
    } catch (err) {
      console.log(err);
    } finally {
      setBlogsLoading(false);
    }
  };

  console.log(blogs);

  const blogsData = blogs.map((blog) => {
    return (
      <Grid sx={{ p: 1 }}>
        <Grid
          sx={{
            width: "70%",
            margin: "auto",
            backgroundColor: "white",
            boxShadow: "0px 0px 5px  rgba(0,0,0,0.5)",
            borderRadius: "15px",
            padding: 1,
            cursor: "pointer",
          }}
          onClick={() => navigate(`/blogs/singleBlog/${blog.id}`)}
        >
          <Box sx={{ height: "250px" }}>
            <img src={`${blog.imageUrl}`} alt="blog" height="250px" />
          </Box>
          <Typography sx={{ color: "orange", fontWeight: 600 }}>
            {blog.title}
          </Typography>
          <Typography
            style={{
              lineHeight: "1.2",
              maxHeight: "2.4em",
              overflow: "hidden",
            }}
          >
            {blog.content}...
          </Typography>
          <hr
            style={{
              height: "1px",
              backgroundColor: "slateGray",
              border: "none",
            }}
          />
          <Typography sx={{ display: "flex", justifyContent: "flex-end" }}>
            {new Date(blog.createdAt).toLocaleString("en-US", {
              weekday: "short",
              month: "numeric",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
        </Grid>
      </Grid>
    );
  });
  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <TopBackground />
      <Grid>
        {blogsLoading ? (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            minHeight="500px"
            sx={{ margin: "auto", width: "70%" }}
          >
            <CircularProgress />
          </Grid>
        ) : (
          blogsData
        )}
      </Grid>
      <BottomBackground />
      <Footer />
    </>
  );
};

export default Blogs;
