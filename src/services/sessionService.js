import api from './api';

export const sessionService = {
  create: (data) => api.post('/api/sessions', data).then((r) => r.data),
  list: () => api.get('/api/sessions').then((r) => r.data),
  delete: (id) => api.delete(`/api/sessions/${id}`).then((r) => r.data),
};
