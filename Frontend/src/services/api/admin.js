import api from './client';

// @TODO: BACKEND - Implement Admin Dashboard Endpoints
// These endpoints need to be created on the backend to support the admin dashboard.

export const getDashboardStats = async () => {
    // @TODO: Create endpoint GET /admin/stats
    // Expected response: { totalTransactions: Number, activeKiosks: Number, ... }
    return api.get('/admin/stats');
};

export const getAnalyticsData = async () => {
    // @TODO: Create endpoint GET /admin/analytics
    // Expected response: [{ name: 'Mon', value: 400 }, ...]
    return api.get('/admin/analytics');
};

export const toggleAnnouncement = async (message, active) => {
    // @TODO: Create endpoint POST /admin/announcement
    return api.post('/admin/announcement', { message, active });
};
