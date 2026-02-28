import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getOpportunityById } from '../api/opportunityService';
import { joinOpportunity } from '../api/volunteerService';
import { getReviews, createReview } from '../api/reviewService';
import { deleteOpportunity } from '../api/adminService';
import { getShareData } from '../api/shareService';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';
import { MapPin, Calendar, Clock, Users, Share2 } from 'lucide-react';
import './OpportunityDetailPage.css';

const OpportunityDetailPage = () => {
    const { id } = useParams();
    const { user, role } = useAuth();
    const navigate = useNavigate();

    const [opp, setOpp] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    useEffect(() => {
        Promise.all([
            getOpportunityById(id),
            getReviews(id)
        ]).then(([oppRes, revRes]) => {
            setOpp(oppRes.data);
            setReviews(revRes.data.reviews || []);
            setAvgRating(revRes.data.averageRating || 0);
        }).catch(() => toast.error('Failed to load opportunity'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleJoin = async () => {
        if (!user) { navigate('/login'); return; }
        setJoining(true);
        try {
            const res = await joinOpportunity(id);
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response?.data?.error || 'Join failed');
        } finally { setJoining(false); }
    };

    const handleShare = async () => {
        try {
            const res = await getShareData(id);
            if (navigator.share) {
                await navigator.share({ title: res.data.title, text: res.data.text, url: res.data.url });
            } else {
                await navigator.clipboard.writeText(res.data.url);
                toast.success('Link copied to clipboard!');
            }
        } catch { toast.error('Share failed'); }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this opportunity? This action cannot be undone.')) return;
        try {
            await deleteOpportunity(id);
            toast.success('Opportunity deleted successfully');
            navigate('/opportunities');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to delete opportunity');
        }
    };

    const handleReview = async (e) => {
        e.preventDefault();
        try {
            await createReview({ opportunityId: id, rating, comment });
            toast.success('Review submitted!');
            setComment('');
            const res = await getReviews(id);
            setReviews(res.data.reviews || []);
            setAvgRating(res.data.averageRating || 0);
        } catch (err) {
            toast.error(err.response?.data?.error || 'Review failed');
        }
    };

    if (loading) return <div className="loading-screen"><div className="spinner" /></div>;
    if (!opp) return <div className="page-container"><p>Opportunity not found.</p></div>;

    return (
        <div className="page-container detail-page">
            <div className="detail-main">
                <div className="detail-header">
                    <span className="badge badge-green">{opp.category}</span>
                    {opp.type && <span className="badge badge-gray">{opp.type}</span>}
                </div>
                <h1 className="detail-title">{opp.title}</h1>
                <div className="detail-meta">
                    {opp.location && <span><MapPin size={14} /> {opp.location}</span>}
                    {opp.date && <span><Calendar size={14} /> {new Date(opp.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>}
                    {opp.duration_hours && <span><Clock size={14} /> {opp.duration_hours} hours</span>}
                    {opp.spots_available && <span><Users size={14} /> {opp.spots_available} spots available</span>}
                </div>
                <div className="detail-desc">{opp.description}</div>
                {opp.required_skills?.length > 0 && (
                    <div className="detail-skills">
                        <h3>Required Skills</h3>
                        <div className="skills-tags">
                            {opp.required_skills.map(s => <span key={s} className="badge badge-blue">{s}</span>)}
                        </div>
                    </div>
                )}

                {/* Reviews */}
                <div className="detail-reviews">
                    <h2>Reviews <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>({reviews.length}) · ★ {avgRating}</span></h2>
                    {reviews.map(r => (
                        <div key={r.id} className="review-item">
                            <div className="review-header">
                                <span className="review-name">{r.profiles?.full_name || 'Anonymous'}</span>
                                <StarRating value={r.rating} readOnly />
                            </div>
                            <p className="review-comment">{r.comment}</p>
                        </div>
                    ))}
                    {user && (
                        <form onSubmit={handleReview} className="review-form">
                            <h3>Leave a Review</h3>
                            <StarRating value={rating} onChange={setRating} />
                            <textarea className="form-control" placeholder="Share your experience..." value={comment} onChange={e => setComment(e.target.value)} style={{ marginTop: '0.75rem' }} />
                            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.75rem' }}>Submit Review</button>
                        </form>
                    )}
                </div>
            </div>

            <aside className="detail-sidebar">
                <div className="card">
                    <button onClick={handleJoin} disabled={joining} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.8rem', marginBottom: '0.75rem' }}>
                        {joining ? 'Joining...' : 'Join Opportunity'}
                    </button>
                    <button onClick={handleShare} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                        <Share2 size={15} /> Share
                    </button>

                    {role === 'admin' && (
                        <button
                            onClick={handleDelete}
                            className="btn btn-secondary"
                            style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem', borderColor: 'transparent', color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                        >
                            Delete Opportunity
                        </button>
                    )}

                    <div className="divider" />
                    <div className="sidebar-info">
                        <div><span>Date</span><span>{opp.date ? new Date(opp.date).toLocaleDateString() : 'TBD'}</span></div>
                        <div><span>Duration</span><span>{opp.duration_hours || '?'}h</span></div>
                        <div><span>Type</span><span>{opp.type || 'In-person'}</span></div>
                        <div><span>Spots</span><span>{opp.spots_available || '∞'}</span></div>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default OpportunityDetailPage;
