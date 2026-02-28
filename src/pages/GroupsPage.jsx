import { useState, useEffect } from 'react';
import { createGroup, joinGroup, getGroupById } from '../api/groupService';
import toast from 'react-hot-toast';
import { Users, Plus, LogIn } from 'lucide-react';

const GroupsPage = () => {
    const [tab, setTab] = useState('create');
    const [createForm, setCreateForm] = useState({ name: '', description: '', opportunityId: '' });
    const [joinId, setJoinId] = useState('');
    const [viewId, setViewId] = useState('');
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await createGroup(createForm);
            toast.success(`Group "${res.data.name}" created!`);
            setCreateForm({ name: '', description: '', opportunityId: '' });
        } catch (err) { toast.error(err.response?.data?.error || 'Failed to create group'); }
    };

    const handleJoin = async (e) => {
        e.preventDefault();
        try {
            await joinGroup(joinId);
            toast.success('Joined group successfully!');
            setJoinId('');
        } catch (err) { toast.error(err.response?.data?.error || 'Failed to join group'); }
    };

    const handleView = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await getGroupById(viewId);
            setGroup(res.data);
        } catch { toast.error('Group not found'); }
        finally { setLoading(false); }
    };

    return (
        <div className="page-container">
            <h1 className="section-title"><Users style={{ verticalAlign: 'middle' }} size={24} /> Volunteer <span>Groups</span></h1>

            <div className="tab-bar">
                {['create', 'join', 'view'].map(t => (
                    <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                ))}
            </div>

            {tab === 'create' && (
                <div className="card" style={{ maxWidth: '600px' }}>
                    <h2 style={{ fontFamily: 'Outfit', marginBottom: '1.25rem', fontSize: '1.1rem' }}>Create a New Group</h2>
                    <form onSubmit={handleCreate}>
                        <div className="form-group">
                            <label>Group Name</label>
                            <input className="form-control" placeholder="Green Warriors" value={createForm.name}
                                onChange={e => setCreateForm(f => ({ ...f, name: e.target.value }))} required />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control" placeholder="What is this group about?" value={createForm.description}
                                onChange={e => setCreateForm(f => ({ ...f, description: e.target.value }))} />
                        </div>
                        <div className="form-group">
                            <label>Linked Opportunity ID <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>(optional)</span></label>
                            <input className="form-control" placeholder="UUID of opportunity..." value={createForm.opportunityId}
                                onChange={e => setCreateForm(f => ({ ...f, opportunityId: e.target.value }))} />
                        </div>
                        <button type="submit" className="btn btn-primary"><Plus size={15} /> Create Group</button>
                    </form>
                </div>
            )}

            {tab === 'join' && (
                <div className="card" style={{ maxWidth: '600px' }}>
                    <h2 style={{ fontFamily: 'Outfit', marginBottom: '1.25rem', fontSize: '1.1rem' }}>Join an Existing Group</h2>
                    <form onSubmit={handleJoin}>
                        <div className="form-group">
                            <label>Group ID</label>
                            <input className="form-control" placeholder="Paste group UUID here..." value={joinId}
                                onChange={e => setJoinId(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary"><LogIn size={15} /> Join Group</button>
                    </form>
                </div>
            )}

            {tab === 'view' && (
                <div className="card" style={{ maxWidth: '700px' }}>
                    <h2 style={{ fontFamily: 'Outfit', marginBottom: '1.25rem', fontSize: '1.1rem' }}>View Group Details</h2>
                    <form onSubmit={handleView} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <input className="form-control" placeholder="Group ID..." value={viewId} onChange={e => setViewId(e.target.value)} required />
                        <button type="submit" className="btn btn-primary">View</button>
                    </form>
                    {loading && <div className="loading-screen"><div className="spinner" /></div>}
                    {group && (
                        <div>
                            <h3 style={{ fontFamily: 'Outfit', fontSize: '1.3rem', marginBottom: '0.5rem' }}>{group.name}</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{group.description}</p>
                            <div className="divider" />
                            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                                <div><span className="stat-value" style={{ fontSize: '1.5rem' }}>{group.group_members?.length || 0}</span><div className="stat-label">Members</div></div>
                                <div><span className="stat-value" style={{ fontSize: '1.5rem' }}>{group.totalGroupHours || 0}</span><div className="stat-label">Hours Served</div></div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <style>{`
        .tab-bar { display:flex; gap:0.5rem; margin-bottom:1.5rem; }
        .tab-btn { padding:0.5rem 1.25rem; border-radius:99px; border:1px solid var(--border); background:transparent; color:var(--text-muted); font-size:0.875rem; font-weight:500; cursor:pointer; transition:all 0.2s; }
        .tab-btn.active { background:var(--accent-dim); border-color:var(--accent); color:var(--accent); }
      `}</style>
        </div>
    );
};

export default GroupsPage;
