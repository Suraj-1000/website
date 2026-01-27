import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Set default base URL for axios
    // Assuming backend is on localhost:5000 based on standard practice, but need to be sure. 
    // Ideally this should be in an env file or proxy.
    // For now I'll assume relative path /api if handling proxy in vite, or localhost:5000
    // I will try to detect environment or just set a default.

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const token = localStorage.getItem('token'); // Or check cookie if httpOnly

                // If using httpOnly cookie, we just hit the /me endpoint
                // But earlier I implemented token in response + cookie. 
                // Let's allow bearer token for simplicity in frontend if cookies fail or cross-origin

                if (token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }

                const res = await axios.get('http://localhost:5000/api/auth/me'); // Hardcoded URL for now, strictly local
                if (res.data.success) {
                    setUser(res.data.data);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                // Not authenticated
                localStorage.removeItem('token');
                delete axios.defaults.headers.common['Authorization'];
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);

        // Set token for immediate requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

        setUser(res.data.user); // API might not return user object in login response, might need to fetch me or just decode
        // My controller sends { success: true, token }. It does NOT send user object directly in top level.
        // Let's quick fetch user or simplified decoding. 
        // Controller: sendTokenResponse -> json({ success: true, token })

        // Fetch user immediately to populate state
        const userRes = await axios.get('http://localhost:5000/api/auth/me');
        setUser(userRes.data.data);
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
