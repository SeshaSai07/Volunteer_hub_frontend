import apiClient from './apiClient';

export const getNotifications = () => apiClient.get('/notifications');
