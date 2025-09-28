"use client";
import { useEffect, useState } from "react";
import api from "./api";

export default function HomePage() {
  const [home, setHome] = useState({})
  const [homeImages, setHomeImages] = useState([]); 

  useEffect(() => {
    api.get("/node/homepage?include=field_portfolioimage")
      .then(res => {
        const node = res.data.data[0];
        setHomeImages(res.data.included || []);

        const imgId = node.relationships.field_portfolioimage?.data?.id;
        const image = res.data.included?.find(include => include.id === imgId)

        setHome({
          title: node.attributes.title,
          text: node.attributes.field_home_text,
          github: node.attributes.field_githublink?.uri,
          linkedin: node.attributes.field_linkedinlink?.uri,
          imageUrl: image ? `https://portfolio-backend.lndo.site${image.attributes.uri.url}` : null,
          imageAlt: image?.attributes?.alt || "",
        });
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="homeContainer">
      <h1>{home.title}</h1>
      {home.imageUrl && <img src={home.imageUrl} alt={home.imageAlt} />}
      <p>{home.text}</p>
      <div>
        {home.github && <a href={home.github}>Github</a>}
        {home.linkedin && <a href={home.linkedin}>Linkedin</a>}
      </div>
    </div>
  );
}
