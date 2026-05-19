import axiosInstance from "./axios";

export const authService = {
  login: async (credentials) => axiosInstance.post("/auth/login", credentials),
  register: async (data) => axiosInstance.post("/auth/register", data),
  registerOrganizer: async (data) => axiosInstance.post("/organizer/register", data),
  logout: async () => axiosInstance.post("/auth/logout"),
}
