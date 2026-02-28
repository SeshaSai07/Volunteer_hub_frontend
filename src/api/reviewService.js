import apiClient from './apiClient';

export const createReview = (data) => apiClient.post('/reviews', data);
export const getReviews = (oppId) => apiClient.get(`/reviews/${oppId}`);
