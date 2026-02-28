import apiClient from './apiClient';

export const getOpportunities = (params) => apiClient.get('/opportunities', { params });
export const getOpportunityById = (id) => apiClient.get(`/opportunities/${id}`);
export const createOpportunity = (data) => apiClient.post('/opportunities', data);
