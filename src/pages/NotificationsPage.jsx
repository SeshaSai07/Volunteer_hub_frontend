import { useState, useEffect } from 'react';
import { getNotifications } from '../api/notificationService';
import OpportunityCard from '../components/OpportunityCard';
import '../components/OpportunityCard.css';
import { Bell } from 'lucide-react';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNotifications()
            .then(res => setNotifications(res.data || []))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

    return (
        <div className="page-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Bell size={22} color="var(--accent)" />
                <h1 className="section-title" style={{ marginBottom: 0 }}>
                    Personalized <span>Alerts</span>
                </h1>
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Opportunities matching your interests and location.
            </p>
            {notifications.length > 0 ? (
                <div className="grid-3">
                    {notifications.map(opp => <OpportunityCard key={opp.id} opp={opp} />)}
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-state-icon">🔔</div>
                    <p>No personalized alerts yet. Update your profile interests and location to get matches!</p>
                </div>
            )}
        </div>
    );
};

export default NotificationsPage;
