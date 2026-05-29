import axiosInstance from './axios';

export const registrationService = {
  register:           (eventId) => axiosInstance.post(`/registration/${eventId}`),
  cancel:             (eventId) => axiosInstance.delete(`/registration/${eventId}`),
  getMyRegistrations: ()        => axiosInstance.get('/registration/my-registrations'),
  getParticipants:    (eventId) => axiosInstance.get(`/registration/${eventId}/participants`),
}
