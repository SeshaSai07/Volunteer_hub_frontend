import apiClient from './apiClient';

export const getAllUsers = () => apiClient.get('/admin/users');
export const updateUserRole = (data) => apiClient.put('/admin/users/role', data);
export const verifyHours = (data) => apiClient.put('/admin/verify-hours', data);
export const deleteReview = (id) => apiClient.delete(`/admin/reviews/${id}`);
export const getSystemStats = () => apiClient.get('/admin/stats');
export const exportCSV = () => apiClient.get('/admin/export/csv', { responseType: 'blob' });
export const getVolunteerLogs = (status) => apiClient.get('/admin/volunteer-logs', { params: status ? { status } : {} });
export const updateVolunteerLog = (id, data) => apiClient.put(`/admin/volunteer-logs/${id}`, data);
export const deleteUser = (id) => apiClient.delete(`/admin/users/${id}`);
export const deleteOpportunity = (id) => apiClient.delete(`/admin/opportunities/${id}`);
