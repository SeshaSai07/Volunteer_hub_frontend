import apiClient from './apiClient';

export const createGroup = (data) => apiClient.post('/groups', data);
export const joinGroup = (groupId) => apiClient.post('/groups/join', { groupId });
export const getGroupById = (id) => apiClient.get(`/groups/${id}`);
