//authentication service

import axios from "axios";

const API_URL = "http://localhost:3001/";

const register = ( name, email, password, address, phone, dob ) => {
    return axios.post(API_URL + "register", {
        name,
        email,
        password,
        address,
        phone,
        dob
    });
};

const login = ( email, password ) => {
    return axios.post(API_URL + "login", {
        email,
        password
    })
    .then((response) => {
        if( response.data.token ) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser
};

export default AuthService;