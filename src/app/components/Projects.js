"use client";
import { useEffect, useState } from "react";
import api from "./api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectImages, setProjectImages] = useState([]);

  useEffect(() => {
    api
      .get("/node/project_card?include=field_project_image")
      .then((res) => {
        setProjects(res.data.data);
        setProjectImages(res.data.included);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="divs">
      <h1 id="projectHeading">Projects</h1>
      <div className="projectsContainer">
        {projects.map((item) => {
          const imgId = item.relationships.field_project_image?.data?.id || "";
          const image =
            projectImages.find((include) => include.id === imgId) || "";
          const imageUrl = image
            ? `https://portfolio-backend.lndo.site${image.attributes.uri.url}`
            : null;

          return (
            <div key={item.id} className="projects">
              <h2>{item.attributes.title}</h2>
              {imageUrl && <img src={imageUrl} />}
              <p>{item.attributes.field_textportfolio}</p>
              {item.attributes.field_project_link?.uri && (
                <a
                  href={item.attributes.field_project_link.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Project
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
