import apiClient from './apiClient';

export const getProfile = () => apiClient.get('/users/profile');
export const updateProfile = (data) => apiClient.put('/users/profile', data);
