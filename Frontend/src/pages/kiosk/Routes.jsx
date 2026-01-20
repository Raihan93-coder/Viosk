import React from 'react';
import { Routes, Route } from 'react-router-dom';
import KioskLayout from '../../layouts/KioskLayout';
import IdleScreen from './IdleScreen';
import LanguageSelect from './LanguageSelect';
import ServiceMenu from './ServiceMenu';
import ServiceDetail from './ServiceDetail';
import ComplaintBox from './ComplaintBox';

const KioskRoutes = () => {
    return (
        <Routes>
            <Route element={<KioskLayout />}>
                <Route path="/" element={<IdleScreen />} />
                <Route path="/language" element={<LanguageSelect />} />
                <Route path="/services" element={<ServiceMenu />} />
                <Route path="/service/:id" element={<ServiceDetail />} />
                <Route path="/complaint" element={<ComplaintBox />} />
            </Route>
        </Routes>
    );
};

export default KioskRoutes;
