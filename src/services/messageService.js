import api from './api';

export const messageService = {
  send: (data) => api.post('/api/messages', data).then((r) => r.data),
  getBySession: (sessionId, params) =>
    api.get(`/api/messages/${sessionId}`, { params }).then((r) => r.data),
};
