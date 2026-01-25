import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Zap, FileText } from 'lucide-react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { useLanguage } from '../../context/LanguageContext';

import { getQuickPayUrl } from '../../services/api/kiosk';

const ElectricityOptions = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleQuickPay = async () => {
        const url = await getQuickPayUrl();
        if (url) {
            window.location.href = url;
        }
    };

    return (
        <div style={{ padding: '2rem 4rem', height: '100%' }}>
            <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: 'var(--text-light)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    ← {t('back')}
                </button>
                <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{t('electricity')} Services</h2>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                justifyItems: 'center'
            }}>
                {/* Quick Pay Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-panel"
                    onClick={handleQuickPay}
                    style={{
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.5rem',
                        background: 'white',
                        border: '1px solid var(--glass-border)',
                        cursor: 'pointer',
                        color: 'var(--text-light)',
                        width: '100%',
                        maxWidth: '300px',
                        height: '220px',
                        justifyContent: 'center',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    whileHover={{ scale: 1.05, borderColor: 'var(--primary)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div style={{ color: '#eab308' }}>
                        <Zap size={48} />
                    </div>
                    <span style={{ fontSize: '1.5rem', fontWeight: '500' }}>Quick Pay</span>
                </motion.button>

                {/* Bill View Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel"
                    onClick={() => { }} // Placeholder
                    style={{
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.5rem',
                        background: 'white',
                        border: '1px solid var(--glass-border)',
                        cursor: 'pointer',
                        color: 'var(--text-light)',
                        width: '100%',
                        maxWidth: '300px',
                        height: '220px',
                        justifyContent: 'center',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    whileHover={{ scale: 1.05, borderColor: 'var(--primary)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div style={{ color: 'var(--primary)' }}>
                        <FileText size={48} />
                    </div>
                    <span style={{ fontSize: '1.5rem', fontWeight: '500' }}>Bill View</span>
                </motion.button>
            </div>
        </div>
    );
};

export default ElectricityOptions;
