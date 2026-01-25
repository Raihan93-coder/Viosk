import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as Icons from 'lucide-react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { getServices } from '../../services/api/kiosk';
import { useLanguage } from '../../context/LanguageContext';

const ServiceMenu = () => {
    const [services, setServices] = useState([]);
    const { t } = useLanguage();
    const navigate = useNavigate();

    useEffect(() => {
        getServices().then(setServices);
    }, []);

    const getIcon = (iconName) => {
        const Icon = Icons[iconName];
        return Icon ? <Icon size={48} /> : <Icons.HelpCircle size={48} />;
    };

    return (
        <div style={{ padding: '2rem 4rem', height: '100%' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>{t('services')}</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '2rem'
            }}>
                {services.map((service, index) => (
                    <motion.button
                        key={service.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                        className="kiosk-card glass-panel"
                        onClick={() => {
                            if (service.id === 'grievance') {
                                navigate('/kiosk/complaint');
                            } else if (service.id === 'electricity') {
                                navigate('/kiosk/electricity-options');
                            } else {
                                navigate(`/kiosk/service/${service.id}`);
                            }
                        }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1.5rem',
                            background: 'white',
                            border: '1px solid var(--glass-border)',
                            cursor: 'pointer',
                            color: 'var(--text-light)',
                            height: '220px',
                            justifyContent: 'center',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        whileHover={{ scale: 1.05, borderColor: 'var(--primary)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div style={{
                            color: 'var(--primary)',
                            filter: 'drop-shadow(0 0 5px rgba(37,99,235,0.3))'
                        }}>
                            {getIcon(service.icon)}
                        </div>
                        <span style={{ fontSize: '1.5rem', fontWeight: '500' }}>{t(service.id)}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default ServiceMenu;
