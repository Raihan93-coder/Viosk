import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, MessageSquare, Settings, Bell } from 'lucide-react';
import AnnouncementToggle from '../components/admin/AnnouncementToggle';
import '../styles/admin.css';

const AdminLayout = () => {
    return (
        <div className="admin-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div style={{ padding: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)' }}>
                    <h3>SUVIDHA Admin</h3>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Smart City Portal</p>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <NavItem to="/admin" icon={<LayoutDashboard size={20} />} label="Dashboard" end />
                    <NavItem to="/admin/kiosks" icon={<Users size={20} />} label="Kiosk Monitor" />
                    <NavItem to="/admin/grievances" icon={<MessageSquare size={20} />} label="Grievances" />
                    <div style={{ margin: '1rem 0', borderTop: '1px solid var(--glass-border)' }} />
                    <NavItem to="/admin/settings" icon={<Settings size={20} />} label="Settings" />
                </nav>
            </div>

            {/* Main Content Area */}
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                {/* Header */}
                <header style={{
                    height: '64px',
                    borderBottom: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 2rem',
                    background: 'rgba(0,0,0,0.2)'
                }}>
                    <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Dashboard Overview</h2>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <AnnouncementToggle />
                        <div style={{ position: 'relative' }}>
                            <Bell size={20} color="var(--text-dim)" />
                            <div style={{
                                position: 'absolute', top: -5, right: -5,
                                width: '8px', height: '8px',
                                background: 'red', borderRadius: '50%'
                            }} />
                        </div>
                        <div style={{
                            width: '32px', height: '32px',
                            borderRadius: '50%', background: 'var(--primary)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="admin-content" style={{ flex: 1, overflowY: 'auto' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const NavItem = ({ to, icon, label, end }) => (
    <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
        }
        style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            textDecoration: 'none',
            color: isActive ? 'white' : 'var(--text-dim)',
            background: isActive ? 'var(--primary-glow)' : 'transparent',
            borderRadius: '8px',
            transition: 'all 0.2s'
        })}
    >
        {icon}
        <span>{label}</span>
    </NavLink>
);

export default AdminLayout;
