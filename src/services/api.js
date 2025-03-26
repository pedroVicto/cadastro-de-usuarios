import axios from "axios";

const api = axios.create({
    baseURL: 'https://api-users-devclub.onrender.com'
})

export default api;