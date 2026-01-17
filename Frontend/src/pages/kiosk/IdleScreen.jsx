import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Touchpad } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const IdleScreen = () => {
    const navigate = useNavigate();
    // We can cycle languages here for "Touch to Start" text eventually, 
    // but for now let's show English + Hindi static or just big English.

    return (
        <div
            onClick={() => navigate('/kiosk/language')}
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                background: 'radial-gradient(circle at center, #ffffff 0%, #f1f5f9 100%)'
            }}
        >
            <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <div style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'var(--primary-glow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Touchpad size={80} color="var(--primary)" />
                </div>
            </motion.div>

            <h1 style={{
                fontSize: '4rem',
                marginTop: '3rem',
                textAlign: 'center',
                background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
            }}>
                SUVIDHA
            </h1>
            <p style={{ fontSize: '2rem', color: 'var(--text-dim)', marginTop: '1rem' }}>
                Touch to Start • प्रारंभ करने के लिए स्पर्श करें
            </p>
        </div>
    );
};

export default IdleScreen;
