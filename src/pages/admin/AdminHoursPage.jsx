import { useState } from 'react';
import { verifyHours } from '../../api/adminService';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const STATUSES = ['completed', 'attended', 'cancelled'];

const AdminHoursPage = () => {
    const [form, setForm] = useState({ logId: '', status: 'completed', hoursLogged: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await verifyHours({ logId: form.logId, status: form.status, hoursLogged: parseFloat(form.hoursLogged) || 0 });
            toast.success('Hours verified successfully!');
            setForm({ logId: '', status: 'completed', hoursLogged: '' });
        } catch (err) {
            toast.error(err.response?.data?.error || 'Verification failed');
        } finally { setLoading(false); }
    };

    return (
        <div className="page-container" style={{ maxWidth: '620px' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                <Link to="/admin" className="btn btn-secondary"><ArrowLeft size={14} /></Link>
                <h1 className="section-title" style={{ marginBottom: 0 }}>Verify <span>Volunteer Hours</span></h1>
            </div>
            <div className="card">
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                    Enter the Log ID from the volunteer's dashboard to verify and update their status.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Log ID <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>(UUID from volunteer_logs)</span></label>
                        <input className="form-control" placeholder="e.g. a8c6f1d2-3b4e-..." value={form.logId}
                            onChange={e => setForm(f => ({ ...f, logId: e.target.value }))} required />
                    </div>
                    <div className="form-group">
                        <label>New Status</label>
                        <select className="form-control" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                            {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Hours Logged</label>
                        <input className="form-control" type="number" min="0" step="0.5" placeholder="4.5" value={form.hoursLogged}
                            onChange={e => setForm(f => ({ ...f, hoursLogged: e.target.value }))} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        <CheckCircle size={15} /> {loading ? 'Verifying...' : 'Verify Hours'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminHoursPage;
