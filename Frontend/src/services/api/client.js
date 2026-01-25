import axios from 'axios';
import { API_BASE_URL, KIOSK_ID } from '../config';

/**
 * Axios Instance Configuration
 */
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-Kiosk-ID': KIOSK_ID,
    },
});

/**
 * Request Interceptor
 * Useful for logging or injecting tokens dynamically if needed
 */
apiClient.interceptors.request.use(
    (config) => {
        console.debug(`[API] ${config.method?.toUpperCase()} ${config.url}`);
        // You could add Authorization header here if needed
        // config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 * Handles global errors and response formatting
 */
apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            // Server responded with a status code outside 2xx
            const status = error.response.status;
            const data = error.response.data;

            if (status === 401) {
                console.error('Session expired or unauthorized. Initiating logout sequence.');
                window.dispatchEvent(new CustomEvent('auth:unauthorized'));
            } else if (status === 403) {
                console.error('Access Forbidden: Insufficient permissions.');
            }

            // Standardize error message
            const message = data.message || data.error || `Request failed with status ${status}`;
            console.error(`API Error (${status}): ${message}`);

            // Re-throw with a clean message or the original error object
            return Promise.reject(new Error(message));
        } else if (error.request) {
            // Request was made but no response received
            console.error('API Network Error: No response received', error.request);
            return Promise.reject(new Error('Network Error: Please check your connection.'));
        } else {
            // Something happened in setting up the request
            console.error('API Client Error:', error.message);
            return Promise.reject(error);
        }
    }
);

export default apiClient;
