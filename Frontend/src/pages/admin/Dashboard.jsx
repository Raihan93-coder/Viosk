import React, { useEffect, useState } from 'react';
import { Download, TrendingUp, Users, Activity, FileText } from 'lucide-react';
import { getDashboardStats, getAnalyticsData } from '../../services/api/admin';

// Simple bar chart component since we are not using a heavy charting lib like Recharts for this prototype
const SimpleBarChart = ({ data }) => {
    const max = Math.max(...data.map(d => d.value));

    return (
        <div style={{
            height: '300px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingTop: '2rem'
        }}>
            {data.map((d, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '0.5rem' }}>
                    <div style={{
                        width: '100%',
                        background: 'var(--primary)',
                        height: `${max > 0 ? (d.value / max) * 200 : 0}px`,
                        borderRadius: '4px',
                        opacity: 0.8,
                        transition: 'height 0.5s'
                    }} />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{d.name}</span>
                </div>
            ))}
        </div>
    );
};

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        getDashboardStats().then(setStats);
        getAnalyticsData().then(setChartData);
    }, []);

    if (!stats) return <div>Loading Dashboard...</div>;

    return (
        <div>
            <div className="admin-header">
                <div>
                    <h1 style={{ fontSize: '2rem' }}>System Performance</h1>
                    <p style={{ color: 'var(--text-dim)' }}>Real-time updates from all connected kiosks</p>
                </div>
                <button
                    className="glass-panel"
                    style={{ display: 'flex', gap: '0.5rem', padding: '0.8rem 1.5rem', alignItems: 'center', color: 'var(--accent)' }}
                    onClick={() => alert("Downloading Report...")}
                >
                    <Download size={20} /> Download Report
                </button>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard title="Total Transactions" value={stats.totalTransactions} icon={<Activity />} color="var(--primary)" />
                <StatCard title="Active Kiosks" value={stats.activeKiosks} icon={<Users />} color="var(--accent)" />
                <StatCard title="Daily Revenue" value={`₹ ${stats.dailyRevenue}`} icon={<TrendingUp />} color="#22c55e" />
                <StatCard title="Pending Grievances" value={stats.pendingGrievances} icon={<FileText />} color="#f59e0b" />
            </div>

            {/* Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div className="stat-card">
                    <h3>Weekly Service Usage</h3>
                    <SimpleBarChart data={chartData} />
                </div>

                <div className="stat-card">
                    <h3>Recent Alerts</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                        <AlertItem msg="Kiosk #042 Printer Paper Low" time="2m ago" />
                        <AlertItem msg="Kiosk #012 Network Slow" time="15m ago" />
                        <AlertItem msg="Grievance Escalation #992" time="1h ago" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color }) => (
    <div className="stat-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{title}</p>
            <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>{value}</h2>
        </div>
        <div style={{ padding: '0.5rem', color: color }}>{icon}</div>
    </div>
);

const AlertItem = ({ msg, time }) => (
    <div style={{
        padding: '1rem',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '8px',
        fontSize: '0.9rem',
        display: 'flex',
        justifyContent: 'space-between'
    }}>
        <span>{msg}</span>
        <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>{time}</span>
    </div>
);

export default Dashboard;
