import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Landing from './pages/Landing';
import KioskRoutes from './pages/kiosk/Routes';
import AdminRoutes from './pages/admin/Routes';
import './styles/main.css';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/kiosk/*" element={<KioskRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
