"use client"; //important

import api from "./api";
import { useEffect, useState } from "react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]); // state for blog posts
  const [blogImages, setBlogImages] = useState([]); // state for images

  useEffect(() => {
    // get posts and images
    api
      .get("/node/blog?include=field_blog_image")
      .then((res) => {
        setBlogs(res.data.data); // save post
        setBlogImages(res.data.included); // save image
      })
      .catch((error) => console.error(error)); // error handling
  }, []);

  return (
    <div>
      <div className="blogsContainer">
        <h1 id="blogHeading">Blogs</h1>
        {blogs.map((item) => {
          // loop over blogs and render all
          const imgId = item.relationships.field_blog_image?.data?.id || ""; // get id
          const image =
            blogImages.find((include) => include.id === imgId) || null; // find full image
          const imageUrl = image
            ? `https://portfolio-backend.lndo.site${image.attributes.uri.url}` // if exsists build
            : null;

          return (
            // render
            <div key={item.id} className="blogCard">
              <h2>{item.attributes.title}</h2>
              {imageUrl && <img src={imageUrl} />}
              <p>{item.attributes.field_blog_text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
