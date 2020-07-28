import axios from "axios";

const api = axios.create({
  baseURL: "http://api.ctracker.com.br/metronic/api"
});

export default api;
