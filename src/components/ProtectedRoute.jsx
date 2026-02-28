import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { token, role, loading } = useAuth();

    if (loading) return <div className="loading-screen"><div className="spinner"></div></div>;
    if (!token) return <Navigate to="/login" replace />;
    if (adminOnly && role !== 'admin') return <Navigate to="/" replace />;

    return children;
};

export default ProtectedRoute;
