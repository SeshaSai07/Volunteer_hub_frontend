import { Link } from 'react-router-dom';
import {
    Heart, Github, Twitter, Linkedin, Mail,
    MapPin, Phone, ExternalLink, ArrowRight,
    Shield, Zap
} from 'lucide-react';
import './Footer.css';

const PRODUCT_LINKS = [
    { label: 'Browse Opportunities', to: '/opportunities' },
    { label: 'Resources & Guides', to: '/resources' },
    { label: 'Events Calendar', to: '/calendar' },
    { label: 'Volunteer Groups', to: '/groups' },
    { label: 'Post an Opportunity', to: '/post-opportunity' },
];

const COMMUNITY_LINKS = [
    { label: 'Volunteer Dashboard', to: '/dashboard' },
    { label: 'Notifications', to: '/notifications' },
    { label: 'Messages', to: '/messages' },
    { label: 'Your Profile', to: '/profile' },
];

const COMPANY_LINKS = [
    { label: 'About Us', to: '/about', external: false },
    { label: 'Blog', to: '/#blog', external: false },
    { label: 'Careers', to: '/#careers', external: false },
    { label: 'API Reference', href: 'https://api-volunteer-opportunity-hub-backend.onrender.com', external: true },
];

const SOCIAL = [
    { icon: Github, href: 'https://github.com/SeshaSai07', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter / X' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:maddinenisesha07@gmail.com', label: 'Email' },
];

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            {/* Top accent line */}
            <div className="footer-accent-line" />

            <div className="footer-inner">

                {/* ── Main grid ── */}
                <div className="footer-grid">

                    {/* Brand column */}
                    <div className="footer-brand-col">
                        <Link to="/" className="footer-logo">
                            <span className="footer-logo-icon">
                                <Heart size={18} fill="currentColor" />
                            </span>
                            VolunteerHub
                        </Link>
                        <p className="footer-desc">
                            Connecting passionate volunteers with meaningful opportunities
                            to build stronger communities — one act of service at a time.
                        </p>

                        {/* Status badge */}
                        <div className="footer-status">
                            <span className="status-dot" />
                            All systems operational
                        </div>

                        {/* Social icons */}
                        <div className="footer-socials">
                            {SOCIAL.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-social-btn"
                                    aria-label={label}
                                    title={label}
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Product</h4>
                        <ul className="footer-link-list">
                            {PRODUCT_LINKS.map(({ label, to }) => (
                                <li key={label}>
                                    <Link to={to} className="footer-link">
                                        <ArrowRight size={12} className="footer-link-arrow" />
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Community */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Community</h4>
                        <ul className="footer-link-list">
                            {COMMUNITY_LINKS.map(({ label, to }) => (
                                <li key={label}>
                                    <Link to={to} className="footer-link">
                                        <ArrowRight size={12} className="footer-link-arrow" />
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Company</h4>
                        <ul className="footer-link-list">
                            {COMPANY_LINKS.map(({ label, to, href, external }) => (
                                <li key={label}>
                                    {external ? (
                                        <a href={href} target="_blank" rel="noopener noreferrer" className="footer-link">
                                            <ArrowRight size={12} className="footer-link-arrow" />
                                            {label}
                                            <ExternalLink size={10} style={{ opacity: 0.5, marginLeft: 2 }} />
                                        </a>
                                    ) : (
                                        <Link to={to} className="footer-link">
                                            <ArrowRight size={12} className="footer-link-arrow" />
                                            {label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Contact mini block */}
                        <div className="footer-contact">
                            <a href="mailto:hello@volunteerhub.io" className="footer-contact-item">
                                <Mail size={13} /> hello@volunteerhub.io
                            </a>
                            <span className="footer-contact-item">
                                <MapPin size={13} /> Global · Remote-first
                            </span>
                        </div>
                    </div>

                    {/* Newsletter column */}
                    <div className="footer-newsletter-col">
                        <h4 className="footer-col-title">Stay in the loop</h4>
                        <p className="footer-newsletter-desc">
                            Get weekly volunteer opportunity highlights delivered to your inbox.
                        </p>
                        <form
                            className="footer-newsletter-form"
                            onSubmit={e => { e.preventDefault(); }}
                        >
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="footer-newsletter-input"
                                required
                            />
                            <button type="submit" className="footer-newsletter-btn">
                                Subscribe
                            </button>
                        </form>
                        <p className="footer-newsletter-note">
                            No spam. Unsubscribe anytime.
                        </p>
                    </div>
                </div>

                {/* ── Divider ── */}
                <div className="footer-divider" />

                {/* ── Bottom bar ── */}
                <div className="footer-bottom">
                    <p className="footer-copy">
                        © {year}{' '}
                        <span style={{ color: 'var(--accent)' }}>VolunteerHub</span>. All rights reserved.
                        Made with <Heart size={11} fill="var(--accent)" color="var(--accent)" style={{ verticalAlign: 'middle', margin: '0 2px' }} /> for community impact.
                    </p>

                    <div className="footer-legal">
                        <a href="#" className="footer-legal-link">Privacy Policy</a>
                        <span className="footer-legal-dot">·</span>
                        <a href="#" className="footer-legal-link">Terms of Service</a>
                        <span className="footer-legal-dot">·</span>
                        <a href="#" className="footer-legal-link">Cookie Policy</a>
                    </div>

                    <div className="footer-badges">
                        <span className="footer-badge-pill">
                            <Shield size={11} /> Secure
                        </span>
                        <span className="footer-badge-pill">
                            <Zap size={11} /> Built on Supabase
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
