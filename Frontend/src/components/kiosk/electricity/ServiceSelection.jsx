import React from 'react';
import { motion } from 'framer-motion';
import { Zap, FileText } from 'lucide-react';

const ServiceCard = ({ icon, title, color, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.05, borderColor: '#2563eb' }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="glass-panel"
        style={{
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            background: 'white',
            border: '1px solid var(--glass-border)',
            cursor: 'pointer',
            color: '#334155',
            width: '100%',
            maxWidth: '300px',
            height: '220px',
            justifyContent: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
    >
        <div style={{ color: color }}>{icon}</div>
        <span style={{ fontSize: '1.3rem', fontWeight: '600' }}>{title}</span>
    </motion.button>
);

const ServiceSelection = ({ onSelect }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            justifyItems: 'center',
            width: '100%'
        }}>
            <ServiceCard
                icon={<Zap size={48} />}
                title="Quick Pay"
                color="#eab308"
                onClick={() => onSelect('quick_pay')}
            />
            <ServiceCard
                icon={<FileText size={48} />}
                title="View Bill Status"
                color="#3b82f6"
                onClick={() => onSelect('view_bill')}
            />
        </div>
    );
};

export default ServiceSelection;
