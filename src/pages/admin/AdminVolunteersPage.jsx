import { useState, useEffect } from 'react';
import { getVolunteerLogs, updateVolunteerLog } from '../../api/adminService';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, User, Clock, CheckCircle, XCircle, AlertCircle, Hourglass } from 'lucide-react';

const STATUSES = ['registered', 'waitlisted', 'attended', 'completed', 'cancelled'];

const STATUS_META = {
    registered: { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', icon: <User size={12} />, label: 'Registered' },
    waitlisted: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', icon: <Hourglass size={12} />, label: 'Waitlisted' },
    attended: { color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', icon: <AlertCircle size={12} />, label: 'Attended' },
    completed: { color: '#22c55e', bg: 'rgba(34,197,94,0.12)', icon: <CheckCircle size={12} />, label: 'Completed' },
    cancelled: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)', icon: <XCircle size={12} />, label: 'Cancelled' },
};

const StatusBadge = ({ status }) => {
    const meta = STATUS_META[status] || { color: '#888', bg: 'rgba(136,136,136,0.1)', icon: null, label: status };
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            padding: '3px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600,
            color: meta.color, background: meta.bg, border: `1px solid ${meta.color}33`
        }}>
            {meta.icon}{meta.label}
        </span>
    );
};

const AdminVolunteersPage = () => {
    const [logs, setLogs] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('');
    const [search, setSearch] = useState('');
    const [editing, setEditing] = useState(null); // { id, status, hours_logged }
    const [saving, setSaving] = useState(false);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const res = await getVolunteerLogs();
            setLogs(res.data);
        } catch {
            toast.error('Failed to load volunteer logs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchLogs(); }, []);

    useEffect(() => {
        let result = logs;
        if (filterStatus) result = result.filter(l => l.status === filterStatus);
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(l =>
                l.profiles?.full_name?.toLowerCase().includes(q) ||
                l.profiles?.email?.toLowerCase().includes(q) ||
                l.opportunities?.title?.toLowerCase().includes(q)
            );
        }
        setFiltered(result);
    }, [logs, filterStatus, search]);

    const handleSave = async () => {
        if (!editing) return;
        setSaving(true);
        try {
            await updateVolunteerLog(editing.id, { status: editing.status, hours_logged: editing.hours_logged });
            setLogs(prev => prev.map(l => l.id === editing.id
                ? { ...l, status: editing.status, hours_logged: editing.hours_logged }
                : l
            ));
            toast.success('Updated successfully!');
            setEditing(null);
        } catch (err) {
            toast.error(err.response?.data?.error || 'Update failed');
        } finally {
            setSaving(false);
        }
    };

    const counts = STATUSES.reduce((acc, s) => {
        acc[s] = logs.filter(l => l.status === s).length;
        return acc;
    }, {});

    return (
        <div className="page-container">
            {/* Header */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <Link to="/admin" className="btn btn-secondary"><ArrowLeft size={14} /></Link>
                <h1 className="section-title" style={{ marginBottom: 0 }}>Volunteer <span>Tracker</span></h1>
                <button className="btn btn-secondary" onClick={fetchLogs} style={{ marginLeft: 'auto' }}>
                    <RefreshCw size={14} /> Refresh
                </button>
            </div>

            {/* Summary Chips */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {STATUSES.map(s => (
                    <button key={s} onClick={() => setFilterStatus(filterStatus === s ? '' : s)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            padding: '6px 14px', borderRadius: '999px', border: `1px solid ${STATUS_META[s].color}55`,
                            background: filterStatus === s ? STATUS_META[s].bg : 'var(--card-bg)',
                            color: STATUS_META[s].color, fontWeight: 600, fontSize: '0.8rem',
                            cursor: 'pointer', transition: 'all 0.2s'
                        }}>
                        {STATUS_META[s].icon}
                        {STATUS_META[s].label}
                        <span style={{
                            background: STATUS_META[s].color, color: '#fff',
                            borderRadius: '999px', padding: '0 7px', fontSize: '0.7rem', fontWeight: 700
                        }}>{counts[s] || 0}</span>
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="form-group" style={{ maxWidth: '400px', marginBottom: '1.5rem' }}>
                <input className="form-control" placeholder="Search by name, email or opportunity..."
                    value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            {/* Table */}
            {loading ? (
                <div className="loading-screen"><div className="spinner" /></div>
            ) : filtered.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem' }}>
                    No volunteer logs found.
                </div>
            ) : (
                <div className="card" style={{ overflowX: 'auto', padding: 0 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                                {['Volunteer', 'Opportunity', 'Date Joined', 'Status', 'Hours', 'Actions'].map(h => (
                                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(log => (
                                <tr key={log.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>

                                    {/* Volunteer */}
                                    <td style={{ padding: '12px 16px' }}>
                                        <div style={{ fontWeight: 600 }}>{log.profiles?.full_name || 'Unknown'}</div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{log.profiles?.email}</div>
                                    </td>

                                    {/* Opportunity */}
                                    <td style={{ padding: '12px 16px' }}>
                                        <div style={{ fontWeight: 500 }}>{log.opportunities?.title || '—'}</div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                            {log.opportunities?.location} {log.opportunities?.date ? `· ${new Date(log.opportunities.date).toLocaleDateString()}` : ''}
                                        </div>
                                    </td>

                                    {/* Date Joined */}
                                    <td style={{ padding: '12px 16px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                                        {new Date(log.created_at).toLocaleDateString()}
                                    </td>

                                    {/* Status */}
                                    <td style={{ padding: '12px 16px' }}>
                                        {editing?.id === log.id ? (
                                            <select value={editing.status}
                                                onChange={e => setEditing(p => ({ ...p, status: e.target.value }))}
                                                className="form-control" style={{ fontSize: '0.8rem', padding: '4px 8px' }}>
                                                {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                                            </select>
                                        ) : (
                                            <StatusBadge status={log.status} />
                                        )}
                                    </td>

                                    {/* Hours */}
                                    <td style={{ padding: '12px 16px' }}>
                                        {editing?.id === log.id ? (
                                            <input type="number" min="0" step="0.5"
                                                value={editing.hours_logged}
                                                onChange={e => setEditing(p => ({ ...p, hours_logged: e.target.value }))}
                                                className="form-control" style={{ width: '80px', fontSize: '0.8rem', padding: '4px 8px' }} />
                                        ) : (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Clock size={13} style={{ color: 'var(--text-muted)' }} />
                                                {log.hours_logged || 0}h
                                            </span>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                                        {editing?.id === log.id ? (
                                            <div style={{ display: 'flex', gap: '6px' }}>
                                                <button className="btn btn-primary" onClick={handleSave} disabled={saving}
                                                    style={{ padding: '5px 12px', fontSize: '0.78rem' }}>
                                                    {saving ? '...' : '✓ Save'}
                                                </button>
                                                <button className="btn btn-secondary" onClick={() => setEditing(null)}
                                                    style={{ padding: '5px 12px', fontSize: '0.78rem' }}>
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button className="btn btn-secondary"
                                                onClick={() => setEditing({ id: log.id, status: log.status, hours_logged: log.hours_logged || 0 })}
                                                style={{ padding: '5px 12px', fontSize: '0.78rem' }}>
                                                ✏️ Edit
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminVolunteersPage;
