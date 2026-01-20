import api from './client';
import { ENDPOINTS } from '../config';

// --- Services ---

export const getServices = async () => {
    try {
        return await api.get(ENDPOINTS.SERVICES);
    } catch (error) {
        console.error("Failed to fetch services:", error);
        throw error;
    }
};

export const getServiceDetails = async (serviceId) => {
    return api.get(ENDPOINTS.SERVICE_DETAILS(serviceId));
};

export const submitPayment = async (data) => {
    return api.post(ENDPOINTS.PAYMENT, data);
};

// --- Complaints & Photo Upload ---

export const submitComplaint = async (data) => {
    return api.post(ENDPOINTS.COMPLAINT, data);
};

export const initPhotoSession = async (kioskId) => {
    return api.post(ENDPOINTS.PHOTO_SESSION_INIT, { kioskId });
};

export const checkUploadStatus = async (sessionId) => {
    return api.get(ENDPOINTS.PHOTO_SESSION_STATUS(sessionId));
};
