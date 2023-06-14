import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import TopBackground from "../components/postPropertyComponents/TopBackground";
import BottomBackground from "../components/postPropertyComponents/BottomBackground";
import Footer from "../components/Footer";

const SingleBlog = () => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState("");

  const getSingleBlog = async () => {
    const { data } = await axios.get(
      `http://roomy-finder-evennode.ap-1.evennode.com/api/v1/blog-post/${id}`
    );
    setBlogPost(data);
  };

  console.log(blogPost);

  const blogPostData = (
    <Grid sx={{ margin: "auto", width: "70%", textAlign: "justify" }}>
      <Grid sx={{ height: "200px" }}>
        <img src={blogPost.imageUrl} alt="blog" />
      </Grid>
      <Typography sx={{ fontWeight: 600 }}>{blogPost.title}</Typography>
      <Grid container sx={{ color: "orange" }}>
        {blogPost.author && (
          <Typography sx={{ marginRight: 2 }}>{blogPost.author}</Typography>
        )}
        {blogPost.createdAt && (
          <Typography>
            {new Date(blogPost.createdAt).toLocaleString("en-US", {
              weekday: "short",
              month: "numeric",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
        )}
      </Grid>
      <br />
      <Typography>
        {blogPost && blogPost.content ? (
          blogPost.content.split("\n").map((paragraph, index) => (
            <p key={index} style={{ marginBottom: "1em" }}>
              {paragraph}
            </p>
          ))
        ) : (
          <p>No content available</p>
        )}
      </Typography>

      <br />
      <br />
      <Typography>{blogPost.conclusion}</Typography>
    </Grid>
  );

  useEffect(() => {
    getSingleBlog();
  }, []);
  return (
    <>
      <TopBackground />
      <Grid>{blogPostData}</Grid>
      <BottomBackground />
      <Footer />
    </>
  );
};

export default SingleBlog;
