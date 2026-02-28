import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Mail, Lock, LogIn } from 'lucide-react';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(form.email, form.password);
            toast.success('Welcome back!');
            navigate('/opportunities');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Check your credentials.');
        } finally { setLoading(false); }
    };

    return (
        <div className="auth-page">
            <div className="auth-box">
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">Sign in to your VolunteerHub account</p>
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input className="form-control" type="email" placeholder="you@example.com" value={form.email}
                            onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" type="password" placeholder="••••••••" value={form.password}
                            onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}
                        style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', marginTop: '0.5rem' }}>
                        {loading ? 'Signing in...' : <><LogIn size={16} /> Sign In</>}
                    </button>
                </form>
                <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Don't have an account? <Link to="/register" className="auth-link">Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
