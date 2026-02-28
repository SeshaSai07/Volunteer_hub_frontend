import { useState, useEffect } from 'react';
import { getAllUsers, updateUserRole, deleteUser } from '../../api/adminService';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';

const ROLES = ['volunteer', 'organization', 'admin'];

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState({});

    useEffect(() => {
        getAllUsers().then(res => setUsers(res.data || [])).catch(() => toast.error('Failed to load users')).finally(() => setLoading(false));
    }, []);

    const handleRoleChange = async (userId, role) => {
        setSaving(s => ({ ...s, [userId]: true }));
        try {
            await updateUserRole({ userId, role });
            toast.success('Role updated!');
            setUsers(us => us.map(u => u.id === userId ? { ...u, role } : u));
        } catch (err) { toast.error(err.response?.data?.error || 'Failed to update role'); }
        finally { setSaving(s => ({ ...s, [userId]: false })); }
    };

    const handleDeleteUser = async (userId, name) => {
        if (!window.confirm(`Are you sure you want to delete user "${name}"? This action cannot be undone.`)) return;

        setSaving(s => ({ ...s, [userId]: true }));
        try {
            await deleteUser(userId);
            toast.success('User deleted successfully!');
            setUsers(us => us.filter(u => u.id !== userId));
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to delete user');
        } finally {
            setSaving(s => ({ ...s, [userId]: false }));
        }
    };

    if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

    return (
        <div className="page-container">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                <Link to="/admin" className="btn btn-secondary"><ArrowLeft size={14} /></Link>
                <h1 className="section-title" style={{ marginBottom: 0 }}>User <span>Management</span></h1>
            </div>
            <div className="card table-container">
                <table>
                    <thead>
                        <tr><th>Name</th><th>Email</th><th>Current Role</th><th>Change Role</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.full_name || '—'}</td>
                                <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{u.email}</td>
                                <td><span className={`badge ${u.role === 'admin' ? 'badge-red' : u.role === 'organization' ? 'badge-blue' : 'badge-green'}`}>{u.role}</span></td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                        {ROLES.filter(r => r !== u.role).map(r => (
                                            <button key={r} className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                                                disabled={saving[u.id]} onClick={() => handleRoleChange(u.id, r)}>
                                                → {r}
                                            </button>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-secondary"
                                        style={{ color: '#ef4444', borderColor: 'transparent', background: 'rgba(239, 68, 68, 0.1)', padding: '0.35rem 0.6rem' }}
                                        onClick={() => handleDeleteUser(u.id, u.full_name || u.email)}
                                        disabled={saving[u.id]}
                                    >
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsersPage;
