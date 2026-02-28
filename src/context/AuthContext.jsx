import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../api/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('vhub_token');
        const storedUser = localStorage.getItem('vhub_user');
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await loginUser({ email, password });
        const { token: newToken, user: newUser } = res.data;
        localStorage.setItem('vhub_token', newToken);
        localStorage.setItem('vhub_user', JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
        return newUser;
    };

    const register = async (formData) => {
        const res = await registerUser(formData);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('vhub_token');
        localStorage.removeItem('vhub_user');
        setToken(null);
        setUser(null);
    };

    const role = user?.user_metadata?.role || 'volunteer';

    return (
        <AuthContext.Provider value={{ user, token, role, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
