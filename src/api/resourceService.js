import apiClient from './apiClient';

export const getAllResources = (params) => apiClient.get('/resources', { params });
export const getResourceById = (id) => apiClient.get(`/resources/${id}`);
export const createResource = (data) => apiClient.post('/resources', data);
