import { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../api/userService';
import toast from 'react-hot-toast';
import { Save, User } from 'lucide-react';

const INTEREST_OPTIONS = ['education', 'environment', 'health', 'community', 'animals', 'arts'];

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({ bio: '', location: '', skills: '', interests: [] });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getProfile().then(res => {
            const p = res.data;
            setProfile(p);
            setForm({
                bio: p.bio || '',
                location: p.location || '',
                skills: Array.isArray(p.skills) ? p.skills.join(', ') : (p.skills || ''),
                interests: p.interests || [],
            });
        }).catch(() => toast.error('Failed to load profile'))
            .finally(() => setLoading(false));
    }, []);

    const toggleInterest = (interest) => {
        setForm(f => ({
            ...f,
            interests: f.interests.includes(interest)
                ? f.interests.filter(i => i !== interest)
                : [...f.interests, interest],
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const skills = form.skills.split(',').map(s => s.trim()).filter(Boolean);
            await updateProfile({ bio: form.bio, location: form.location, skills, interests: form.interests });
            toast.success('Profile updated!');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Update failed');
        } finally { setSaving(false); }
    };

    if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

    return (
        <div className="page-container" style={{ maxWidth: '700px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--accent)' }}>
                    <User size={28} color="var(--accent)" />
                </div>
                <div>
                    <h1 style={{ fontFamily: 'Outfit', fontSize: '1.5rem', fontWeight: 700 }}>{profile?.full_name || 'My Profile'}</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{profile?.email} · <span className="badge badge-green">{profile?.role}</span></p>
                </div>
            </div>

            <div className="card">
                <form onSubmit={handleSave}>
                    <div className="form-group">
                        <label>Bio</label>
                        <textarea className="form-control" placeholder="Tell us about yourself..." value={form.bio}
                            onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={3} />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input className="form-control" placeholder="City, Country" value={form.location}
                            onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                    </div>
                    <div className="form-group">
                        <label>Skills <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>(comma-separated)</span></label>
                        <input className="form-control" placeholder="Teaching, Public Speaking, First Aid" value={form.skills}
                            onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} />
                    </div>
                    <div className="form-group">
                        <label>Interests</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                            {INTEREST_OPTIONS.map(interest => (
                                <button key={interest} type="button"
                                    className={`btn ${form.interests.includes(interest) ? 'btn-primary' : 'btn-secondary'}`}
                                    style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}
                                    onClick={() => toggleInterest(interest)}>
                                    {interest.charAt(0).toUpperCase() + interest.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                        <Save size={15} /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
