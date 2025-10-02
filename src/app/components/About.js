"use client";
import { useEffect, useState } from "react";
import api from "./api";

export default function About() {
  const [about, setAbout] = useState({});

  useEffect(() => {
    api.get("/node/page?include=field_imageabout").then((res) => {
      const node = res.data.data[0]; // get first page node
      const imgId = node.relationships.field_imageabout?.data?.id || ""; // image ID if excists
      const image = res.data.included?.find((inc) => inc.id === imgId) || null; // find image object

      setAbout({
        //update state
        title: node.attributes.title || "",
        body: node.attributes.body?.processed || "",
        imageUrl: image
          ? `https://portfolio-backend.lndo.site${image.attributes.uri.url}`
          : null,
      });
    });
  }, []); // depedency empty -> run once

  return (
    <div className="divs">
      <div className="aboutContainer">
        <h1>{about.title}</h1>
        {about.imageUrl && <img src={about.imageUrl} />}{" "}
        {/** render image only if excists */}
        <div dangerouslySetInnerHTML={{ __html: about.body }} />
      </div>
    </div>
  );
}
