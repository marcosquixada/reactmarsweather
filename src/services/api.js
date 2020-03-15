import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/sols/all"
});

export default api;