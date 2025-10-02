import axios from "axios";

const api = axios.create({
  baseURL: "https://portfolio-backend.lndo.site/jsonapi", //endpoint
  headers: {
    Accept: "application/json", //accept JSON response
  },
});

export default api;
