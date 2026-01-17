import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, UserCircle } from 'lucide-react';

const Landing = () => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            background: 'linear-gradient(to bottom right, var(--dark-bg), #e0f2fe)'
        }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>SUVIDHA System</h1>

            <div style={{ display: 'flex', gap: '2rem' }}>
                <Link to="/kiosk" className="glass-panel" style={{
                    padding: '2rem',
                    textDecoration: 'none',
                    color: 'var(--text-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    width: '200px',
                    background: 'white',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                    <Monitor size={48} color="var(--primary)" />
                    <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>Kiosk Mode</span>
                </Link>

                <Link to="/admin" className="glass-panel" style={{
                    padding: '2rem',
                    textDecoration: 'none',
                    color: 'var(--text-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    width: '200px',
                    background: 'white',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                    <UserCircle size={48} color="var(--secondary)" />
                    <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>Admin Portal</span>
                </Link>
            </div>
        </div>
    );
};

export default Landing;
