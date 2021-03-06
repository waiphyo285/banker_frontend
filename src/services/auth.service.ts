import axios from "axios";
require('dotenv').config();

const API_URL = process.env.API_URL || 'http://localhost:7070';

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL + "/users/login", {
        username,
        password
      })
      .then(response => {
        if (response.data.status === 200) {
          console.log("RESP DATA ", response.data.data)
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, password: string) {
    return axios.post(API_URL + "/users/create", {
      username,
      password
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    console.log("userStr ", userStr)
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
