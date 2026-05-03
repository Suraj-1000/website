import axios from 'axios';

/**
 * Global API configuration using Axios.
 * Handles base URL, credentials, and JWT token injection.
 */
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/v1';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

/**
 * Request Interceptor:
 * Automatically attaches the JWT access token to every request if available.
 */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/**
 * Response Interceptor:
 * Handles global error responses, specifically 401 Unauthorized errors.
 * Attempts to refresh the access token using the refresh cookie once before failing.
 */
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // If 401 and not already retried, try refreshing the token
        if (error.response?.status === 401 && !originalRequest._retry && 
            originalRequest.url !== '/auth/refresh' && originalRequest.url !== '/auth/login') {
            
            originalRequest._retry = true;
            try {
                const res = await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
                const { accessToken } = res.data;
                
                localStorage.setItem('token', accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                
                return axios(originalRequest);
            } catch (refreshError) {
                // If refresh fails, the user is likely unauthenticated
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
export { API_URL };
