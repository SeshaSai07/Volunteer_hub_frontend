import { useState } from 'react';

const StarRating = ({ value = 0, onChange, readOnly = false }) => {
    const [hovered, setHovered] = useState(0);

    return (
        <div style={{ display: 'flex', gap: '4px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => !readOnly && onChange && onChange(star)}
                    onMouseEnter={() => !readOnly && setHovered(star)}
                    onMouseLeave={() => !readOnly && setHovered(0)}
                    style={{
                        fontSize: '1.4rem',
                        cursor: readOnly ? 'default' : 'pointer',
                        color: star <= (hovered || value) ? '#f59e0b' : 'rgba(255,255,255,0.15)',
                        transition: 'color 0.15s',
                    }}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
