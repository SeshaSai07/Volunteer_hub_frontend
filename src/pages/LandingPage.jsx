import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { getOpportunities } from '../api/opportunityService';
import OpportunityCard from '../components/OpportunityCard';
import '../components/OpportunityCard.css';
import './LandingPage.css';

const STATS = [
    { target: 1200, label: 'Volunteers Registered' },
    { target: 340, label: 'Opportunities Listed' },
    { target: 8500, label: 'Hours Served' },
    { target: 95, label: 'Organizations' },
];

function useCountUp(target, duration = 1800) {
    const [count, setCount] = useState(0);
    const ref = useRef(false);
    useEffect(() => {
        if (ref.current) return;
        ref.current = true;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            setCount(Math.floor(current));
            if (current >= target) clearInterval(timer);
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration]);
    return count;
}

const StatItem = ({ target, label }) => {
    const count = useCountUp(target);
    return (
        <div className="landing-stat">
            <div className="landing-stat-value">{count.toLocaleString()}+</div>
            <div className="landing-stat-label">{label}</div>
        </div>
    );
};

const LandingPage = () => {
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        getOpportunities({ limit: 3 }).then(res => setFeatured(res.data.results || [])).catch(() => { });
    }, []);

    return (
        <div className="landing">
            {/* Hero */}
            <section className="landing-hero">
                <div className="hero-glow" />
                <div className="page-container hero-content">
                    <div className="hero-badge">🌍 Make a difference today</div>
                    <h1 className="hero-title">
                        Find Your Next<br />
                        <span className="hero-accent">Volunteer</span> Opportunity
                    </h1>
                    <p className="hero-sub">
                        Join thousands of passionate volunteers connecting with organizations that need your unique skills and energy.
                    </p>
                    <div className="hero-actions">
                        <Link to="/opportunities" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                            Browse Opportunities
                        </Link>
                        <Link to="/register" className="btn btn-secondary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                            Join Free
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="landing-stats-section">
                <div className="page-container">
                    <div className="landing-stats-grid">
                        {STATS.map(s => <StatItem key={s.label} {...s} />)}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="landing-cats-section">
                <div className="page-container">
                    <h2 className="section-title">Browse by <span>Category</span></h2>
                    <div className="cats-grid">
                        {['Education', 'Environment', 'Health', 'Community', 'Animals', 'Arts'].map(cat => (
                            <Link key={cat} to={`/opportunities?category=${cat.toLowerCase()}`} className="cat-chip">
                                {cat}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured */}
            <section className="landing-featured">
                <div className="page-container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 className="section-title" style={{ marginBottom: 0 }}>Featured <span>Opportunities</span></h2>
                        <Link to="/opportunities" className="btn btn-outline">View All →</Link>
                    </div>
                    {featured.length > 0 ? (
                        <div className="grid-3">
                            {featured.map(opp => <OpportunityCard key={opp.id} opp={opp} />)}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-state-icon">🔍</div>
                            <p>Loading opportunities from backend...</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="landing-cta">
                <div className="page-container cta-box">
                    <h2>Ready to Start <span>Volunteering?</span></h2>
                    <p>Create your free account and explore hundreds of opportunities in your community.</p>
                    <Link to="/register" className="btn btn-primary" style={{ padding: '0.8rem 2.5rem', fontSize: '1.05rem' }}>
                        Get Started — It's Free
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
