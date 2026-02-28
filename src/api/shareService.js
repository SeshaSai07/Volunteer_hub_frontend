import apiClient from './apiClient';

export const getShareData = (opportunityId) => apiClient.get(`/share/${opportunityId}`);
