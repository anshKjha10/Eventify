import axiosInstance from './axios';

export const eventService = {
  getAll:    (params) => axiosInstance.get('/event', { params }),
  getById:   (id)     => axiosInstance.get(`/event/${id}`),
  getNearby: ()       => axiosInstance.get('/event'),
  getMyEvents: ()     => axiosInstance.get('/event/my-events'),

  create: (data) => {
    const fd = new FormData();
    fd.append('title',       data.title);
    fd.append('description', data.description || '');
    fd.append('category',    data.category);
    fd.append('date',        data.date);
    fd.append('location',    JSON.stringify({
      city:    data.city,
      country: data.country,
      address: data.address || '',
    }));
    fd.append('prize',    data.prize    || 0);
    fd.append('maxSeats', data.maxSeats);
    if (data.image) fd.append('image', data.image);
    return axiosInstance.post('/event/create-event', fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  update: (id, data) => {
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (k === 'image' && v instanceof File) { fd.append('image', v); return; }
      if (['city', 'country', 'address'].includes(k)) return; // handled below
      fd.append(k, v ?? '');
    });
    if (data.city || data.country) {
      fd.append('location', JSON.stringify({
        city:    data.city    || '',
        country: data.country || '',
        address: data.address || '',
      }));
    }
    return axiosInstance.put(`/event/update-event/${id}`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  remove: (id) => axiosInstance.delete(`/event/delete-event/${id}`),
}
