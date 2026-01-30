import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const API_URL = 'http://localhost:5000/api';

    // Axios Interceptor for Token Refresh
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // If error is 401 and not already retrying
                if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== `${API_URL}/auth/refresh`) {
                    originalRequest._retry = true;

                    try {
                        const res = await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
                        const { accessToken } = res.data;

                        localStorage.setItem('token', accessToken);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                        return axios(originalRequest);
                    } catch (refreshError) {
                        logout();
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => axios.interceptors.response.eject(interceptor);
    }, []);

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }

                const res = await axios.get(`${API_URL}/auth/me`);
                if (res.data.success) {
                    setUser(res.data.data);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                // Interceptor handles logout if refresh fails
            } finally {
                setLoading(false);
            }
        };

        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        const res = await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
        const { accessToken, user: userData } = res.data;

        localStorage.setItem('token', accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        setUser(userData);
        setIsAuthenticated(true);
        return true;
    };

    const logout = async () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
