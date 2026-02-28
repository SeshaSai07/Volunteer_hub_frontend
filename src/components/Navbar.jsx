import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Bell, Menu, X, Heart, LogOut, User, LayoutDashboard, Moon, Sun, MessageSquare, Users, Clock, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const { user, role, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setOpen(false);
        setDropdownOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const isDark = theme === 'dark';

    const profileMenuItems = [
        { to: '/profile', icon: <User size={14} />, label: 'Profile' },
        { to: '/notifications', icon: <Bell size={14} />, label: 'Alerts' },
        { to: '/groups', icon: <Users size={14} />, label: 'Groups' },
        { to: '/messages', icon: <MessageSquare size={14} />, label: 'Messages' },
        { to: '/dashboard', icon: <Clock size={14} />, label: 'My Hours' },
    ];

    if (role === 'organization') {
        profileMenuItems.push({ to: '/org/volunteers', icon: <Users size={14} />, label: 'Track Volunteers' });
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <Heart size={22} className="brand-icon" />
                    <span>VolunteerHub</span>
                </Link>

                <div className={`navbar-links ${open ? 'open' : ''}`}>
                    <NavLink to="/opportunities" className="nav-link" onClick={() => setOpen(false)}>Opportunities</NavLink>
                    <NavLink to="/resources" className="nav-link" onClick={() => setOpen(false)}>Resources</NavLink>
                    <NavLink to="/calendar" className="nav-link" onClick={() => setOpen(false)}>Calendar</NavLink>
                    <NavLink to="/about" className="nav-link" onClick={() => setOpen(false)}>About</NavLink>

                    {user ? (
                        <>
                            {(role === 'organization' || role === 'admin') && (
                                <>
                                    <NavLink to="/post-opportunity" className="nav-link nav-link-accent" onClick={() => setOpen(false)}>
                                        + Opp
                                    </NavLink>
                                    <NavLink to="/post-resource" className="nav-link nav-link-accent" onClick={() => setOpen(false)}>
                                        + Res
                                    </NavLink>
                                </>
                            )}
                            {role === 'admin' && (
                                <NavLink to="/admin" className="nav-link nav-link-admin" onClick={() => setOpen(false)}>
                                    <LayoutDashboard size={15} /> Admin
                                </NavLink>
                            )}

                            {/* ── Profile Dropdown ── */}
                            <div className="profile-dropdown-wrapper" ref={dropdownRef}>
                                <button
                                    className="nav-link nav-link-profile profile-trigger"
                                    onClick={() => setDropdownOpen(p => !p)}
                                    aria-expanded={dropdownOpen}
                                >
                                    <User size={15} />
                                    Profile
                                    <ChevronDown size={13} className={`chevron ${dropdownOpen ? 'rotated' : ''}`} />
                                </button>

                                {dropdownOpen && (
                                    <div className="profile-dropdown-menu">
                                        {profileMenuItems.map(item => (
                                            <NavLink
                                                key={item.to}
                                                to={item.to}
                                                className="dropdown-item"
                                                onClick={() => { setDropdownOpen(false); setOpen(false); }}
                                            >
                                                {item.icon}
                                                {item.label}
                                            </NavLink>
                                        ))}
                                        <div className="dropdown-divider" />
                                        <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                                            <LogOut size={14} /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="nav-link" onClick={() => setOpen(false)}>Login</NavLink>
                            <NavLink to="/register" className="nav-btn-primary" onClick={() => setOpen(false)}>Get Started</NavLink>
                        </>
                    )}

                    {/* Theme toggle */}
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        title={isDark ? 'Switch to Blush Pink theme' : 'Switch to Dark theme'}
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Sun size={16} /> : <Moon size={16} />}
                        <span className="theme-toggle-label">{isDark ? 'Light' : 'Dark'}</span>
                    </button>
                </div>

                <button className="navbar-toggle" onClick={() => setOpen(!open)}>
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
