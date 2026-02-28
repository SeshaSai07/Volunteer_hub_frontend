import { useState, useEffect } from 'react';
import { getVolunteerHistory } from '../api/volunteerService';
import { Clock, CheckCircle, Users, Calendar } from 'lucide-react';

const statusBadge = (status) => {
    const map = { completed: 'badge-green', attended: 'badge-blue', registered: 'badge-yellow', waitlisted: 'badge-gray', cancelled: 'badge-red' };
    return map[status] || 'badge-gray';
};

const VolunteerDashboardPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        getVolunteerHistory({ page, limit: 10 })
            .then(res => setData(res.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [page]);

    if (loading && !data) return <div className="loading-screen"><div className="spinner" /></div>;

    const totalPages = data ? Math.ceil(data.total_logs / 10) : 1;

    return (
        <div className="page-container">
            <h1 className="section-title">Volunteer <span>Dashboard</span></h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-value">{data?.total_hours?.toFixed(1) || '0'}</div>
                    <div className="stat-label">✅ Hours Verified</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{data?.total_logs || 0}</div>
                    <div className="stat-label">📋 Total Events</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{data?.history?.filter(h => h.status === 'completed').length || 0}</div>
                    <div className="stat-label">🏆 Completed</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{data?.history?.filter(h => h.status === 'registered').length || 0}</div>
                    <div className="stat-label">📝 Upcoming</div>
                </div>
            </div>

            <div className="card">
                <h2 style={{ marginBottom: '1rem', fontFamily: 'Outfit', fontSize: '1.1rem' }}>Activity History</h2>
                {data?.history?.length > 0 ? (
                    <>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Opportunity</th>
                                        <th>Date</th>
                                        <th>Location</th>
                                        <th>Status</th>
                                        <th>Hours</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.history.map(log => (
                                        <tr key={log.id}>
                                            <td>{log.opportunities?.title || '—'}</td>
                                            <td>{log.opportunities?.date ? new Date(log.opportunities.date).toLocaleDateString() : '—'}</td>
                                            <td>{log.opportunities?.location || '—'}</td>
                                            <td><span className={`badge ${statusBadge(log.status)}`}>{log.status}</span></td>
                                            <td>{log.hours_logged || '—'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {totalPages > 1 && (
                            <div className="pagination" style={{ marginTop: '1rem' }}>
                                <button className="btn btn-secondary" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
                                <span className="page-info">{page} / {totalPages}</span>
                                <button className="btn btn-secondary" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next →</button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">📋</div>
                        <p>No activity yet. Join an opportunity to get started!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VolunteerDashboardPage;
