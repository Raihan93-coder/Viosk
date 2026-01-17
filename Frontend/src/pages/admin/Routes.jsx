import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import Dashboard from './Dashboard';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="scan" element={<div>Scanner Config</div>} />
                <Route path="*" element={<div style={{ padding: '2rem' }}>Coming Soon...</div>} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
