import { useState, useEffect } from 'react';
import { getSystemStats, exportCSV } from '../../api/adminService';
import { Link } from 'react-router-dom';
import { Download, Users, Briefcase, Clock, Activity } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSystemStats().then(res => setStats(res.data)).catch(() => toast.error('Failed to load stats')).finally(() => setLoading(false));
    }, []);

    const handleExport = async () => {
        try {
            const res = await exportCSV();
            const url = URL.createObjectURL(new Blob([res.data], { type: 'text/csv' }));
            const a = document.createElement('a');
            a.href = url; a.download = 'volunteer_report.csv'; a.click();
            toast.success('CSV Downloaded!');
        } catch { toast.error('Export failed'); }
    };

    if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

    return (
        <div className="page-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 className="section-title" style={{ marginBottom: 0 }}>Admin <span>Dashboard</span></h1>
                <button className="btn btn-secondary" onClick={handleExport}><Download size={15} /> Export CSV</button>
            </div>

            <div className="stats-grid">
                <div className="stat-card"><div className="stat-value">{stats?.total_users || 0}</div><div className="stat-label">Total Users</div></div>
                <div className="stat-card"><div className="stat-value">{stats?.total_opportunities || 0}</div><div className="stat-label">Opportunities</div></div>
                <div className="stat-card"><div className="stat-value">{stats?.total_hours_served?.toFixed(0) || 0}</div><div className="stat-label">Hours Served</div></div>
                <div className="stat-card"><div className="stat-value" style={{ color: '#22c55e', fontSize: '1.2rem' }}>{stats?.system_status}</div><div className="stat-label">System Status</div></div>
            </div>

            <div className="grid-2" style={{ marginTop: '1rem' }}>
                {[
                    { label: '👥 User Management', to: '/admin/users', desc: 'View all users and update roles' },
                    { label: '🎯 Volunteer Tracker', to: '/admin/volunteers', desc: 'Track who joined, their status, and verify hours inline' },
                    { label: '✅ Verify Hours', to: '/admin/hours', desc: 'Approve volunteer logs and verify hours' },
                    { label: '⭐ Review Moderation', to: '/admin/reviews', desc: 'Delete inappropriate reviews' },
                    { label: '📊 Export Data', to: '#', desc: 'Download volunteer data as CSV', onClick: handleExport },
                ].map(item => (
                    <Link key={item.label} to={item.to} onClick={item.onClick} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ fontFamily: 'Outfit', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{item.label}</div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{item.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
