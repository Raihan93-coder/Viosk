import { API_BASE_URL, KIOSK_ID } from '../config';

/**
 * Enhanced Fetch Wrapper for API calls
 */
const apiClient = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    // Default Headers
    const headers = {
        'Content-Type': 'application/json',
        'X-Kiosk-ID': KIOSK_ID,
        ...options.headers,
    };

    const config = {
        ...options,
        headers,
    };

    try {
        console.debug(`[API] ${options.method || 'GET'} ${url}`);
        const response = await fetch(url, config);

        // Global Error Handling
        if (response.status === 401) {
            console.error('Session expired or unauthorized. Initiating logout sequence.');
            // Dispatch a global event for the app to handle cleanup and redirection
            window.dispatchEvent(new CustomEvent('auth:unauthorized'));
            throw new Error('Unauthorized');
        }

        if (response.status === 403) {
            throw new Error('Access Forbidden: Insufficient permissions.');
        }

        const data = await response.json();

        if (!response.ok) {
            // Standardize error messages from backend
            throw new Error(data.message || data.error || `Request failed with status ${response.status}`);
        }

        return data;
    } catch (error) {
        // Log to monitoring service (e.g., Sentry) in production
        console.error(`API Request Failed: ${endpoint}`, error);
        throw error;
    }
};

export default {
    get: (endpoint) => apiClient(endpoint, { method: 'GET' }),
    post: (endpoint, body) => apiClient(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    put: (endpoint, body) => apiClient(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (endpoint) => apiClient(endpoint, { method: 'DELETE' }),
};
