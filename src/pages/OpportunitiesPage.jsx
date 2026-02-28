import { useState, useEffect, useCallback } from 'react';
import { getOpportunities } from '../api/opportunityService';
import OpportunityCard from '../components/OpportunityCard';
import '../components/OpportunityCard.css';
import { Search, Filter } from 'lucide-react';
import './OpportunitiesPage.css';

const CATEGORIES = ['', 'education', 'environment', 'health', 'community', 'animals', 'arts'];
const TYPES = ['', 'in-person', 'remote', 'hybrid'];

const OpportunitiesPage = () => {
    const [opps, setOpps] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const limit = 9;

    const [filters, setFilters] = useState({ search: '', location: '', type: '', category: '' });
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(filters.search), 450);
        return () => clearTimeout(timer);
    }, [filters.search]);

    const fetchData = useCallback(() => {
        setLoading(true);
        getOpportunities({
            search: debouncedSearch,
            location: filters.location,
            type: filters.type,
            category: filters.category,
            page,
            limit,
        })
            .then(res => {
                setOpps(res.data.results || []);
                setTotal(res.data.total || 0);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [debouncedSearch, filters.location, filters.type, filters.category, page]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const totalPages = Math.ceil(total / limit);

    const handleFilter = (key, val) => {
        setFilters(prev => ({ ...prev, [key]: val }));
        setPage(1);
    };

    return (
        <div className="page-container">
            <div className="page-hero" style={{ textAlign: 'left', paddingTop: '2rem' }}>
                <h1 className="section-title">Volunteer <span>Opportunities</span></h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    {total > 0 ? `${total} opportunities available` : 'Find meaningful ways to contribute'}
                </p>
            </div>

            {/* Filters */}
            <div className="opp-filters">
                <div className="search-input-wrap">
                    <Search size={16} className="search-icon" />
                    <input
                        className="form-control search-input"
                        placeholder="Search opportunities..."
                        value={filters.search}
                        onChange={e => handleFilter('search', e.target.value)}
                    />
                </div>
                <input
                    className="form-control"
                    placeholder="Location..."
                    value={filters.location}
                    onChange={e => handleFilter('location', e.target.value)}
                    style={{ flex: 1, minWidth: '160px' }}
                />
                <select className="form-control" value={filters.category} onChange={e => handleFilter('category', e.target.value)} style={{ minWidth: '150px' }}>
                    <option value="">All Categories</option>
                    {CATEGORIES.filter(Boolean).map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
                <select className="form-control" value={filters.type} onChange={e => handleFilter('type', e.target.value)} style={{ minWidth: '120px' }}>
                    <option value="">All Types</option>
                    {TYPES.filter(Boolean).map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
            </div>

            {/* Results */}
            {loading ? (
                <div className="loading-screen"><div className="spinner" /></div>
            ) : opps.length > 0 ? (
                <>
                    <div className="grid-3">{opps.map(opp => <OpportunityCard key={opp.id} opp={opp} />)}</div>
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button className="btn btn-secondary" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
                            <span className="page-info">{page} / {totalPages}</span>
                            <button className="btn btn-secondary" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next →</button>
                        </div>
                    )}
                </>
            ) : (
                <div className="empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <p>No opportunities found. Try a different search.</p>
                </div>
            )}
        </div>
    );
};

export default OpportunitiesPage;
