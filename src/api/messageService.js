import apiClient from './apiClient';

export const sendMessage = (data) => apiClient.post('/messages/send', data);
export const getConversation = (otherUserId) => apiClient.get(`/messages/${otherUserId}`);
