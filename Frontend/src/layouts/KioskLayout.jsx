import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/kiosk.css';

const INACTIVITY_LIMIT = 60000; // 60 seconds

const KioskLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { language, t, languages } = useLanguage();
    const [lastActivity, setLastActivity] = useState(() => Date.now());

    // Reset timer on touch
    useEffect(() => {
        const resetTimer = () => setLastActivity(Date.now());
        window.addEventListener('click', resetTimer);
        window.addEventListener('touchstart', resetTimer);
        return () => {
            window.removeEventListener('click', resetTimer);
            window.removeEventListener('touchstart', resetTimer);
        };
    }, []);

    // Check inactivity
    useEffect(() => {
        const interval = setInterval(() => {
            if (Date.now() - lastActivity > INACTIVITY_LIMIT) {
                // Only redirect if not already at root
                if (location.pathname !== '/kiosk') {
                    navigate('/kiosk');
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [lastActivity, navigate, location.pathname]);

    const isRoot = location.pathname === '/kiosk';
    const currentLangName = languages.find(l => l.code === language)?.native;

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--dark-bg)' }}>
            {/* Top Bar - Hidden on Idle Screen */}
            {!isRoot && (
                <div style={{
                    height: '80px',
                    padding: '0 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(0,0,0,0.4)',
                    borderBottom: '1px solid var(--glass-border)'
                }}>
                    <button
                        onClick={() => navigate(-1)}
                        className="glass-panel"
                        style={{
                            padding: '0.8rem 1.5rem',
                            display: 'flex',
                            gap: '0.5rem',
                            alignItems: 'center',
                            color: 'var(--primary)',
                            border: 'none',
                            fontSize: '1.2rem'
                        }}
                    >
                        <ArrowLeft /> {t('back')}
                    </button>

                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <div
                            onClick={() => navigate('/kiosk/language')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--text-dim)',
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                                padding: '0.5rem',
                                borderRadius: '8px',
                                border: '1px solid transparent',
                                transition: 'all 0.2s'
                            }}
                            className="lang-selector"
                        >
                            <Globe size={24} color="var(--primary)" />
                            <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{currentLangName}</span>
                        </div>
                        <button style={{
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            padding: '0.8rem 1.5rem',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: 'bold'
                        }}>
                            <AlertTriangle size={20} />
                            {t('emergency')}
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default KioskLayout;
