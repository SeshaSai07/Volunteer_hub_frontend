import { useState } from 'react';
import { createResource } from '../api/resourceService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

const CATEGORIES = ['education', 'environment', 'health', 'community', 'animals', 'arts', 'general'];

const PostResourcePage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '', content: '', category: 'general',
        external_link: '', related_opportunity_id: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await createResource(form);
            toast.success('Resource posted!');
            navigate(`/resources/${res.data[0]?.id || ''}`);
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to post resource');
        } finally { setLoading(false); }
    };

    const f = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }));

    return (
        <div className="page-container" style={{ maxWidth: '700px' }}>
            <h1 className="section-title">Post a <span>New Resource</span></h1>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input className="form-control" placeholder="Guide to Beach Cleanups" value={form.title} onChange={f('title')} required />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select className="form-control" value={form.category} onChange={f('category')}>
                            {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Content</label>
                        <textarea className="form-control" placeholder="Provide helpful information or instructions..." value={form.content} onChange={f('content')} required rows={6} />
                    </div>

                    <div className="form-group">
                        <label>External Link <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>(Optional)</span></label>
                        <input className="form-control" type="url" placeholder="https://example.com/guide" value={form.external_link} onChange={f('external_link')} />
                    </div>

                    <div className="form-group">
                        <label>Related Opportunity ID <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>(Optional)</span></label>
                        <input className="form-control" placeholder="UUID of an existing opportunity" value={form.related_opportunity_id} onChange={f('related_opportunity_id')} />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '1rem' }}>
                        <Plus size={15} /> {loading ? 'Posting...' : 'Post Resource'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostResourcePage;
