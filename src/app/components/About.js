"use client";
import { useEffect, useState } from "react";
import api from "./api";

export default function About() {
  const [about, setAbout] = useState({});

  useEffect(() => {
    api.get("/node/page?include=field_imageabout").then((res) => {
      const node = res.data.data[0];
      const imgId = node.relationships.field_imageabout?.data?.id || "";
      const image = res.data.included?.find((inc) => inc.id === imgId) || null;

      setAbout({
        title: node.attributes.title || "",
        body: node.attributes.body?.processed || "",
        imageUrl: image
          ? `https://portfolio-backend.lndo.site${image.attributes.uri.url}`
          : null,
      });
    });
  }, []);

  return (
    <div className="aboutContainer">
      <h1>{about.title}</h1>
      {about.imageUrl && <img src={about.imageUrl} />}
      <div dangerouslySetInnerHTML={{ __html: about.body }} />
    </div>
  );
}
