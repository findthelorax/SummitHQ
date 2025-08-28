// Central configuration for API endpoints

// Use a single API_URL environment variable that can be a complete URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Helper function to build complete URLs
export const buildUrl = (path: string) => {
	// If API_URL already ends with a slash, don't add another one
	const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
	// If path doesn't start with a slash, add one
	const formattedPath = path.startsWith('/') ? path : `/${path}`;
	return `${baseUrl}${formattedPath}`;
};

// Create a pre-configured axios instance (optional enhancement)
import axios from 'axios';

export const apiClient = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Add interceptors for common handling (optional)
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		// Log errors or handle them globally
		console.error('API Error:', error);
		return Promise.reject(error);
	}
);
