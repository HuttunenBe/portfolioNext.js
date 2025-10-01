"use client";
import api from "./api";
import { useEffect, useState } from "react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [blogImages, setBlogImages] = useState([]);

  useEffect(() => {
    api
      .get("/node/blog?include=field_blog_image")
      .then((res) => {
        setBlogs(res.data.data);
        setBlogImages(res.data.included);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div className="blogsContainer">
        <h1 id="blogHeading">Blogs</h1>
        {blogs.map((item) => {
          const imgId = item.relationships.field_blog_image?.data?.id || "";
          const image =
            blogImages.find((include) => include.id === imgId) || null;
          const imageUrl = image
            ? `https://portfolio-backend.lndo.site${image.attributes.uri.url}`
            : null;

          return (
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
