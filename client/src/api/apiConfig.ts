import axios from 'axios';

// Use environment variables with fallbacks for local development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Helper function to build complete URLs
export const buildUrl = (path: string) => {
    // If API_URL already ends with a slash, don't add another one
    const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
    // If path doesn't start with a slash, add one
    const formattedPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${formattedPath}`;
};

// Create a pre-configured axios instance
export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    // Add timeout to prevent hanging requests
    timeout: 30000,
});

// Add request interceptor for common headers
apiClient.interceptors.request.use(
    (config) => {
        // Could add auth tokens here if needed
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptors for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Only log detailed errors in development
        if (import.meta.env.DEV) {
            console.error('API Error:', error);
        } else {
            // Simplified logging for production
            console.error(
                `API Error: ${error.response?.status || 'unknown'} - ${error.response?.statusText || error.message}`
            );
        }
        return Promise.reject(error);
    }
);

// Export API_URL for cases where it's needed directly
export { API_URL };