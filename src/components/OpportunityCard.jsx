import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users } from 'lucide-react';

const categoryColors = {
    education: 'badge-blue',
    environment: 'badge-green',
    health: 'badge-red',
    community: 'badge-yellow',
    animals: 'badge-green',
    default: 'badge-gray',
};

const OpportunityCard = ({ opp }) => {
    const badgeClass = categoryColors[opp.category?.toLowerCase()] || categoryColors.default;
    const formattedDate = opp.date
        ? new Date(opp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'Date TBD';

    return (
        <div className="card opp-card">
            <div className="opp-card-header">
                <span className={`badge ${badgeClass}`}>{opp.category || 'General'}</span>
                {opp.type && <span className="badge badge-gray">{opp.type}</span>}
            </div>
            <h3 className="opp-card-title">{opp.title}</h3>
            <p className="opp-card-desc">{opp.description?.slice(0, 110)}...</p>
            <div className="opp-card-meta">
                <span><MapPin size={13} /> {opp.location || 'Remote'}</span>
                <span><Calendar size={13} /> {formattedDate}</span>
                {opp.duration_hours && <span><Clock size={13} /> {opp.duration_hours}h</span>}
                {opp.spots_available && <span><Users size={13} /> {opp.spots_available} spots</span>}
            </div>
            <Link to={`/opportunities/${opp.id}`} className="btn btn-outline" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
                View Details
            </Link>
        </div>
    );
};

export default OpportunityCard;
