//data service

import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3001/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getUserView = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};

const getAdminView = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

const UserService = {
    getPublicContent,
    getUserView,
    getAdminView
};

export default UserService;