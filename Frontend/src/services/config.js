// Application Configuration

// In a real Vite app, these would come from import.meta.env
export const API_BASE_URL = 'http://localhost:8000';
export const KIOSK_ID = 'K-IND-TN-CH-01';

export const ENDPOINTS = {
    COMPLAINT: '/complaints',
    PHOTO_SESSION_INIT: '/upload/session/init',
    PHOTO_SESSION_STATUS: (sessionId) => `/upload/session/${sessionId}/status`,
    SERVICES: '/services',
    SERVICE_DETAILS: (id) => `/services/${id}`,
    PAYMENT: '/payments'
};
