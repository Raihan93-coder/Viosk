import api from './client';
import { ENDPOINTS } from '../config';

// Toggle this to switch between Real API and Mock Data
// In production, this should ideally be false or controlled via env vars
const USE_MOCK = true;

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
        if (USE_MOCK) {
            console.log('[Mock] Fetching Services');
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 500));
            return MOCK_SERVICES;
        }
        return await api.get(ENDPOINTS.SERVICES);
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
    if (USE_MOCK) {
        console.log('[Mock] Submitting Complaint:', data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true, ticketId: 'MOCK-TICKET-' + Date.now() };
    }
    return api.post(ENDPOINTS.COMPLAINT, data);
};

export const initPhotoSession = async (kioskId) => {
    if (USE_MOCK) {
        console.log('[Mock] Init Photo Session for:', kioskId);
        return { sessionId: 'mock-session-123', uploadUrl: 'http://mock-upload-url' };
    }
    return api.post(ENDPOINTS.PHOTO_SESSION_INIT, { kioskId });
};

export const checkUploadStatus = async (sessionId) => {
    if (USE_MOCK) {
        console.log('[Mock] Checking Upload Status for:', sessionId);
        return { status: 'uploaded', fileUrl: 'http://mock-file-url.jpg' };
    }
    return api.get(ENDPOINTS.PHOTO_SESSION_STATUS(sessionId));
};
