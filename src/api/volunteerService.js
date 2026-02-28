import apiClient from './apiClient';

export const joinOpportunity = (opportunityId) => apiClient.post('/volunteer/join', { opportunityId });
export const getVolunteerHistory = (params) => apiClient.get('/volunteer/hours', { params });
