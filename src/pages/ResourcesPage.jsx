import { useState, useEffect } from 'react';
import { getAllResources } from '../api/resourceService';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import './ResourcesPage.css';

const CATEGORIES = ['', 'guide', 'article', 'tutorial', 'tips'];

const ResourcesPage = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('');

    useEffect(() => {
        setLoading(true);
        getAllResources(category ? { category } : {})
            .then(res => setResources(res.data || []))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [category]);

    if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

    return (
        <div className="page-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 className="section-title" style={{ marginBottom: 0 }}>Resources <span>& Guides</span></h1>
                <select className="form-control" style={{ maxWidth: '180px' }} value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    {CATEGORIES.filter(Boolean).map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
            </div>
            {resources.length > 0 ? (
                <div className="grid-3">
                    {resources.map(r => (
                        <Link to={`/resources/${r.id}`} key={r.id} className="resource-card card">
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                <span className="badge badge-blue">{r.category || 'General'}</span>
                            </div>
                            <h3 className="resource-title">{r.title}</h3>
                            <p className="resource-preview">{r.content?.slice(0, 120)}...</p>
                            <p className="resource-author">By {r.profiles?.full_name || 'VolunteerHub'}</p>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-state-icon">📚</div>
                    <p>No resources available yet.</p>
                </div>
            )}
        </div>
    );
};

export default ResourcesPage;
