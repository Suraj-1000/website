import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

// Interceptor for Authorization header
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor for Token Refresh (Mirroring AuthContext logic but for general use)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/refresh' && originalRequest.url !== '/auth/login') {
            originalRequest._retry = true;
            try {
                const res = await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
                const { accessToken } = res.data;
                localStorage.setItem('token', accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                // Handle logout if needed or let components handle it
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
export { API_URL };
