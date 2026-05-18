import axios from "axios";
import axiosInstance from "./axios";

export const authService = {
  login: async (credentials) => axiosInstance.post("/auth/login", credentials),
  register: async (data) => axiosInstance.post("/auth/register", data),
  logout: async () => axiosInstance.post("/auth/logout"),
}
