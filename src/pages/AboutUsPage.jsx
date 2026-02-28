import React from 'react';
import { Target, Heart, Users, Globe, ArrowRight, Shield, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import './AboutUsPage.css';

const AboutUsPage = () => {
    return (
        <div className="about-page">
            <div className="about-hero">
                <div className="about-hero-glass">
                    <div className="about-badge">
                        <Heart size={14} className="badge-icon" />
                        <span>Our Story</span>
                    </div>
                    <h1>Empowering Communities <br/>Through <span>Service</span></h1>
                    <p>
                        We bridge the gap between passionate volunteers and organizations
                        creating real-world impact. Join thousands of change-makers building
                        a better tomorrow, today.
                    </p>
                    <div className="hero-stats">
                        <div className="hero-stat-item">
                            <span className="stat-num">50k+</span>
                            <span className="stat-label">Volunteers</span>
                        </div>
                        <div className="hero-stat-item">
                            <span className="stat-num">10k+</span>
                            <span className="stat-label">Opportunities</span>
                        </div>
                        <div className="hero-stat-item">
                            <span className="stat-num">1M+</span>
                            <span className="stat-label">Hours Served</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-container">
                {/* ── Mission Section ── */}
                <section className="about-section mission-section">
                    <div className="mission-content">
                        <h2 className="section-title">Our <span>Mission</span></h2>
                        <p className="lead-text">
                            At VolunteerHub, we believe that everyone has the power to make a difference. 
                            Our platform is designed to make volunteering accessible, transparent, and rewarding for both individuals and organizations.
                        </p>
                        <p>
                            We started with a simple idea: what if finding the perfect volunteer opportunity was as easy as finding a movie to watch? Since our inception, we've dedicated ourselves to building tools that eliminate the friction from community service. Whether you're looking to clean up a local park, mentor a student, or provide professional pro-bono services, VolunteerHub is your gateway to giving back.
                        </p>
                    </div>
                    <div className="mission-image-wrapper">
                        <div className="mission-image-placeholder">
                            <Globe size={80} className="mission-icon" />
                            <div className="mission-glow"></div>
                        </div>
                    </div>
                </section>

                {/* ── Core Values ── */}
                <section className="about-section values-section">
                    <div className="values-header">
                        <h2 className="section-title">Core <span>Values</span></h2>
                        <p>The principles that guide our platform and our community.</p>
                    </div>
                    
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon-wrapper">
                                <Target size={24} />
                            </div>
                            <h3>Impact First</h3>
                            <p>We measure our success not by metrics, but by the tangible difference our volunteers make in their communities.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon-wrapper">
                                <Users size={24} />
                            </div>
                            <h3>Inclusivity</h3>
                            <p>We welcome volunteers from all backgrounds, skill levels, and walks of life. Diversity is our strength.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon-wrapper">
                                <Shield size={24} />
                            </div>
                            <h3>Trust & Safety</h3>
                            <p>We rigorously vet out organizations and ensure a secure environment for all community members.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon-wrapper">
                                <Award size={24} />
                            </div>
                            <h3>Recognition</h3>
                            <p>Every hour counts. We believe in celebrating and acknowledging the hard work of our dedicated volunteers.</p>
                        </div>
                    </div>
                </section>

                {/* ── How It Works / Features ── */}
                <section className="about-section features-section">
                    <div className="features-content">
                        <h2 className="section-title">Built for <span>Impact</span></h2>
                        <ul className="feature-list">
                            <li>
                                <div className="feature-icon"><Zap size={18} /></div>
                                <div>
                                    <h4>Smart Matching</h4>
                                    <p>Our algorithm connects you with opportunities that align perfectly with your skills and passions.</p>
                                </div>
                            </li>
                            <li>
                                <div className="feature-icon"><Heart size={18} /></div>
                                <div>
                                    <h4>Community Groups</h4>
                                    <p>Join forces with like-minded individuals in your area to tackle larger initiatives together.</p>
                                </div>
                            </li>
                            <li>
                                <div className="feature-icon"><Globe size={18} /></div>
                                <div>
                                    <h4>Global Reach, Local Focus</h4>
                                    <p>While we operate on a large scale, our focus remains on strengthening local neighborhoods.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="about-cta">
                    <div className="cta-content">
                        <h2>Ready to make a difference?</h2>
                        <p>Join our growing community and start your volunteer journey today.</p>
                        <div className="cta-buttons">
                            <Link to="/register" className="btn btn-primary btn-lg">
                                Get Started <ArrowRight size={16} />
                            </Link>
                            <Link to="/opportunities" className="btn btn-secondary btn-lg">
                                Browse Opportunities
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUsPage;
