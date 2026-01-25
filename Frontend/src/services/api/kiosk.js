import api from './client';
import { ENDPOINTS } from '../config';

// Toggle this to switch between Real API and Mock Data
const USE_MOCK = false;  // Set to false to use real backend

// --- Mock Data ---

const MOCK_SERVICES = [
    { id: 'electricity', name: 'Electricity', icon: 'Zap' },
    { id: 'water', name: 'Water', icon: 'Droplet' },
    { id: 'gas', name: 'Gas', icon: 'Flame' },
    { id: 'grievance', name: 'Grievance', icon: 'MessageSquare' }
];

const MOCK_SERVICE_DETAILS = {
    electricity: { id: 'electricity', name: 'Electricity', provider: 'TNEB', status: 'Active' },
    water: { id: 'water', name: 'Water', provider: 'TWAD', status: 'Active' }
};

// --- Services ---

export const getServices = async () => {
    try {
        console.log('[Mock] Fetching Services');
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_SERVICES;
    } catch (error) {
        console.error("Failed to fetch services:", error);
        throw error;
    }
};

export const getServiceDetails = async (serviceId) => {
    if (USE_MOCK) {
        console.log(`[Mock] Fetching Service Details for ${serviceId}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_SERVICE_DETAILS[serviceId] || { id: serviceId, name: 'Unknown Service' };
    }
    return api.get(ENDPOINTS.SERVICE_DETAILS(serviceId));
};

export const submitPayment = async (data) => {
    if (USE_MOCK) {
        console.log('[Mock] Submitting Payment:', data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true, transactionId: 'MOCK-TXN-' + Date.now() };
    }
    return api.post(ENDPOINTS.PAYMENT, data);
};

// --- Complaints & Photo Upload ---

export const submitComplaint = async (data) => {
    // Map frontend fields to backend expected fields
    const payload = {
        consumer_service: data.department,
        consumer_phone: data.phoneNumber || '',
        consumer_description: data.description
    };

    if (USE_MOCK) {
        console.log('[Mock] Submitting Complaint:', payload);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true, ticketId: 'MOCK-TICKET-' + Date.now() };
    }

    try {
        const response = await api.post(ENDPOINTS.COMPLAINT, payload);
        return { success: true, ...response };
    } catch (error) {
        console.error('Submit complaint error:', error);
        throw error;
    }
};

export const initPhotoSession = async () => {
    if (USE_MOCK) {
        console.log('[Mock] Init Photo Session');
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            sessionId: 'mock-session-123',
            uploadUrl: 'http://localhost:8000/upload/mock'
        };
    }

    try {
        const response = await api.post(ENDPOINTS.PHOTO_SESSION_INIT);
        // Backend returns: { session_id, qr_code, upload_url }
        return {
            sessionId: response.session_id,
            qrCode: response.qr_code,
            uploadUrl: response.upload_url
        };
    } catch (error) {
        console.error('Init photo session error:', error);
        throw error;
    }
};

export const checkUploadStatus = async (sessionId) => {
    if (USE_MOCK) {
        console.log('[Mock] Checking Upload Status for:', sessionId);
        // Simulate random completion
        const done = Math.random() > 0.7;
        return { status: done ? 'COMPLETED' : 'PENDING' };
    }

    try {
        const response = await api.get(ENDPOINTS.PHOTO_SESSION_STATUS(sessionId));
        return response;
    } catch (error) {
        console.error('Check upload status error:', error);
        return { status: 'PENDING' };
    }
};

export const getQuickPayUrl = async () => {
    try {
        const response = await fetch('http://localhost:8000/user/quickpay');
        const data = await response.json();
        return data.url;
    } catch (error) {
        console.error('Error fetching Quick Pay URL:', error);
        return null;
    }
};

