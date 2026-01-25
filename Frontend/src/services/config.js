// Application Configuration

// In a real Vite app, these would come from import.meta.env
export const API_BASE_URL = 'http://localhost:8000';
export const KIOSK_ID = 'K-IND-TN-CH-01';

export const ENDPOINTS = {
    COMPLAINT: '/user/consumercomplaint',
    PHOTO_SESSION_INIT: '/qr/init_session',
    PHOTO_SESSION_STATUS: (sessionId) => `/qr/status/${sessionId}`,
    SERVICES: '/services',
    SERVICE_DETAILS: (id) => `/services/${id}`,
    PAYMENT: '/payments'
};

