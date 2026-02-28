import { useState } from 'react';
import { deleteReview } from '../../api/adminService';
import { getReviews } from '../../api/reviewService';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';
import StarRating from '../../components/StarRating';

const AdminReviewsPage = () => {
    const [oppId, setOppId] = useState('');
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadReviews = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await getReviews(oppId);
            setReviews(res.data.reviews || []);
        } catch { toast.error('Failed to load reviews'); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this review?')) return;
        try {
            await deleteReview(id);
            toast.success('Review deleted');
            setReviews(r => r.filter(rev => rev.id !== id));
        } catch { toast.error('Delete failed'); }
    };

    return (
        <div className="page-container" style={{ maxWidth: '760px' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                <Link to="/admin" className="btn btn-secondary"><ArrowLeft size={14} /></Link>
                <h1 className="section-title" style={{ marginBottom: 0 }}>Review <span>Moderation</span></h1>
            </div>
            <form onSubmit={loadReviews} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <input className="form-control" placeholder="Opportunity ID to moderate..." value={oppId} onChange={e => setOppId(e.target.value)} required />
                <button type="submit" className="btn btn-primary">Load Reviews</button>
            </form>
            {loading && <div className="loading-screen"><div className="spinner" /></div>}
            {reviews.map(r => (
                <div key={r.id} className="card" style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                    <div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                            <span style={{ fontWeight: 600 }}>{r.profiles?.full_name || 'Anonymous'}</span>
                            <StarRating value={r.rating} readOnly />
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{r.comment}</p>
                    </div>
                    <button className="btn btn-danger" onClick={() => handleDelete(r.id)}><Trash2 size={14} /></button>
                </div>
            ))}
            {reviews.length === 0 && !loading && (
                <div className="empty-state"><div className="empty-state-icon">⭐</div><p>Enter an opportunity ID to load its reviews.</p></div>
            )}
        </div>
    );
};

export default AdminReviewsPage;
