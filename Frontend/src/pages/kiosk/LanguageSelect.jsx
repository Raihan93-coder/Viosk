import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSelect = () => {
    const { languages, setLanguage } = useLanguage();
    const navigate = useNavigate();

    const handleSelect = (code) => {
        setLanguage(code);
        navigate('/kiosk/services');
    };

    return (
        <div style={{ padding: '4rem', height: '100%' }}>
            <h2 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '4rem' }}>
                Select Language • भाषा चुनें
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '2rem',
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                {languages.map((lang, index) => (
                    <motion.button
                        key={lang.code}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                        onClick={() => handleSelect(lang.code)}
                        className="glass-panel"
                        style={{
                            padding: '3rem',
                            border: '1px solid var(--primary-glow)',
                            fontSize: '2.5rem',
                            color: 'var(--text-light)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            background: 'white',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        whileHover={{ scale: 1.05, borderColor: 'var(--primary)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div style={{ fontSize: '1.5rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>
                            {lang.name}
                        </div>
                        {lang.native}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSelect;
