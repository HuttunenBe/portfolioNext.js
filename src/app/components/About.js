"use client";
import { useEffect, useState } from "react";
import api from "./api";

export default function About() {
  const [about, setAbout] = useState({});
  const [aboutImages, setAboutImages] = useState([]); 

  useEffect(() => {
    api.get("/node/page?include=field_imageabout")
      .then(res => {
        const node = res.data.data.find(n => n.attributes.title === "About me")
        setAboutImages(res.data.included || []); 

        const imgId = node.relationships.field_imageabout?.data?.id
        const image = res.data.included?.find(include => include.id === imgId);

        setAbout({
          title: node.attributes.title,
          body: node.attributes.body?.processed || node.attributes.body?.value || "",
          imageUrl: image ? `https://portfolio-backend.lndo.site${image.attributes.uri.url}` : null,
          imageAlt: image?.attributes?.alt || "",
        });
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="aboutContainer">
      <h1>{about.title}</h1>
      {about.imageUrl && <img src={about.imageUrl} alt={about.imageAlt} />}
      <div className="aboutBody" dangerouslySetInnerHTML={{ __html: about.body }} />
    </div>
  );
}
