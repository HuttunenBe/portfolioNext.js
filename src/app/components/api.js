import axios from "axios";

const api = axios.create({
  baseURL: "https://portfolio-backend.lndo.site/jsonapi",
  headers: {
    Accept: "application/json",
  },
});

export default api;
