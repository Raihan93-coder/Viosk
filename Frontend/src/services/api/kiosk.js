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

import CryptoJS from 'crypto-js';

// @TODO: Use environment variable in production
const SECRET_KEY = 'VIOSK_SECRET_KEY_123';

const encryptData = (text) => {
    if (!text) return text;
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const submitComplaint = async (data) => {
    // Encrypt sensitive data before sending to API (or Mock)
    const encryptedPayload = {
        ...data,
        description: encryptData(data.description),
        phoneNumber: encryptData(data.phoneNumber),
        department: encryptData(data.department)
    };

    if (USE_MOCK) {
        console.log('[Mock] Submitting Complaint (Encrypted Payload):', encryptedPayload);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true, ticketId: 'MOCK-TICKET-' + Date.now() };
    }

    return api.post(ENDPOINTS.COMPLAINT, encryptedPayload);
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

export const getQuickPayUrl = async () => {
    try {
        const response = await fetch('http://localhost:8000/quickpay');
        const data = await response.json();
        return data.url;
    } catch (error) {
        console.error('Error fetching Quick Pay URL:', error);
        return null;
    }
};
