import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getResourceById } from '../api/resourceService';
import { ArrowLeft } from 'lucide-react';

const ResourceDetailPage = () => {
    const { id } = useParams();
    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getResourceById(id).then(res => setResource(res.data))
            .catch(() => { }).finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="loading-screen"><div className="spinner" /></div>;
    if (!resource) return <div className="page-container"><p>Resource not found.</p></div>;

    return (
        <div className="page-container" style={{ maxWidth: '800px' }}>
            <Link to="/resources" className="btn btn-secondary" style={{ marginBottom: '1.5rem' }}>
                <ArrowLeft size={15} /> Back to Resources
            </Link>
            <div className="card">
                <span className="badge badge-blue" style={{ marginBottom: '1rem', display: 'inline-block' }}>{resource.category}</span>
                <h1 style={{ fontFamily: 'Outfit', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, marginBottom: '0.5rem' }}>{resource.title}</h1>
                <p style={{ color: 'var(--accent)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                    By {resource.profiles?.full_name || 'VolunteerHub'}
                </p>
                <div className="divider" />
                <div style={{ marginTop: '1.5rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)', whiteSpace: 'pre-wrap' }}>
                    {resource.content}
                </div>
            </div>
        </div>
    );
};

export default ResourceDetailPage;
