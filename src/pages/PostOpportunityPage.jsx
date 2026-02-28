import { useState } from 'react';
import { createOpportunity } from '../api/opportunityService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

const CATEGORIES = ['education', 'environment', 'health', 'community', 'animals', 'arts'];
const TYPES = ['in-person', 'remote', 'hybrid'];

const PostOpportunityPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '', description: '', category: 'education',
        location: '', type: 'in-person', date: '', duration_hours: '', required_skills: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...form,
                duration_hours: parseFloat(form.duration_hours) || 0,
                required_skills: form.required_skills.split(',').map(s => s.trim()).filter(Boolean),
            };
            const res = await createOpportunity(payload);
            toast.success('Opportunity posted!');
            navigate(`/opportunities/${res.data.id}`);
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to post opportunity');
        } finally { setLoading(false); }
    };

    const f = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }));

    return (
        <div className="page-container" style={{ maxWidth: '700px' }}>
            <h1 className="section-title">Post a <span>New Opportunity</span></h1>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input className="form-control" placeholder="Beach Cleanup Drive" value={form.title} onChange={f('title')} required />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" placeholder="Describe the opportunity in detail..." value={form.description} onChange={f('description')} required rows={4} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label>Category</label>
                            <select className="form-control" value={form.category} onChange={f('category')}>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Type</label>
                            <select className="form-control" value={form.type} onChange={f('type')}>
                                {TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input className="form-control" placeholder="City, Country or Remote" value={form.location} onChange={f('location')} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label>Date</label>
                            <input className="form-control" type="datetime-local" value={form.date} onChange={f('date')} />
                        </div>
                        <div className="form-group">
                            <label>Duration (hours)</label>
                            <input className="form-control" type="number" min="0.5" step="0.5" placeholder="4" value={form.duration_hours} onChange={f('duration_hours')} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Required Skills <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>(comma-separated)</span></label>
                        <input className="form-control" placeholder="Teaching, First Aid, Coding" value={form.required_skills} onChange={f('required_skills')} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        <Plus size={15} /> {loading ? 'Posting...' : 'Post Opportunity'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostOpportunityPage;
