import React, { useState } from 'react';
import { Megaphone } from 'lucide-react';
import { toggleAnnouncement } from '../../services/api/admin';

const AnnouncementToggle = () => {
    const [active, setActive] = useState(false);

    const handleToggle = () => {
        const newState = !active;
        setActive(newState);
        toggleAnnouncement('Public Holiday Alert', newState);
        // In a real app, this would use WebSockets or Context to push to Kiosks
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                {active ? 'Broadcasting Alert' : 'No Announcement'}
            </span>
            <button
                onClick={handleToggle}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    border: '1px solid ' + (active ? '#ef4444' : 'var(--glass-border)'),
                    background: active ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                    color: active ? '#ef4444' : 'var(--text-dim)',
                    cursor: 'pointer'
                }}
            >
                <Megaphone size={16} />
                {active ? 'ON' : 'OFF'}
            </button>
        </div>
    );
};

export default AnnouncementToggle;
