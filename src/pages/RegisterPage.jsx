import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { UserPlus } from 'lucide-react';

const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ full_name: '', email: '', password: '', role: 'volunteer' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(form);
            toast.success('Account created! Please check your email or log in.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Try again.');
        } finally { setLoading(false); }
    };

    return (
        <div className="auth-page">
            <div className="auth-box">
                <h1 className="auth-title">Join VolunteerHub</h1>
                <p className="auth-subtitle">Create your free account and start making a difference</p>
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input className="form-control" type="text" placeholder="Jane Doe" value={form.full_name}
                            onChange={e => setForm(p => ({ ...p, full_name: e.target.value }))} required />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input className="form-control" type="email" placeholder="you@example.com" value={form.email}
                            onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" type="password" placeholder="At least 8 characters" value={form.password}
                            onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required minLength={8} />
                    </div>
                    <div className="form-group">
                        <label>I am joining as</label>
                        <select className="form-control" value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}>
                            <option value="volunteer">🙋 Volunteer</option>
                            <option value="organization">🏢 Organization</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}
                        style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', marginTop: '0.5rem' }}>
                        {loading ? 'Creating account...' : <><UserPlus size={16} /> Create Account</>}
                    </button>
                </form>
                <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
