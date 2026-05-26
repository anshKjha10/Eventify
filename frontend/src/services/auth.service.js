import axiosInstance from "./axios";

export const authService = {
  login: async (credentials) => axiosInstance.post("/auth/login", credentials),
  register: async (data) => axiosInstance.post("/auth/register", data),
  registerOrganizer: async (data) => axiosInstance.post("/organizer/register", data),
  logout: async () => axiosInstance.post("/auth/logout"),
  updateProfilePhoto: async (file) => {
    const fd = new FormData();
    fd.append('avatar', file);
    return axiosInstance.patch('/auth/profile-photo', fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
}
