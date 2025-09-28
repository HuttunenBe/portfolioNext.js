"use client";
import { useEffect, useState } from "react";
import api from "./api";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [blogImages, setBlogImages] = useState([]);

  useEffect(() => {
    api
      .get("/node/blog?include=field_blog_image")
      .then((res) => {
        setBlogs(res.data.data || []);
        setBlogImages(res.data.included || []);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1 id="blogHeading">Blogs</h1>
      <div className="blogsContainer">
        {blogs.map((item) => {
          const imgId = item.relationships.field_blog_image?.data?.id;
          const image = blogImages.find((inc) => inc.id === imgId);
          const imageUrl = image
            ? `https://portfolio-backend.lndo.site${image.attributes.uri.url}`
            : null;
          const imageAlt = image?.attributes?.alt;

          return (
            <div key={item.id} className="blogCard">
              <h2>{item.attributes.title}</h2>
              {imageUrl && <img src={imageUrl} alt={imageAlt} />}
              <p>{item.attributes.field_blog_text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
