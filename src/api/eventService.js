import apiClient from './apiClient';

export const getCalendarEvents = (params) => apiClient.get('/events/calendar', { params });
