import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader } from 'lucide-react';
import { getServiceDetails, submitPayment } from '../../services/api/kiosk';
import VirtualKeyboard from '../../components/kiosk/VirtualKeyboard';
import { useLanguage } from '../../context/LanguageContext';

const ServiceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const [details, setDetails] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState('input'); // input, processing, success
    const [showKeyboard, setShowKeyboard] = useState(false);

    useEffect(() => {
        getServiceDetails(id).then(setDetails);
    }, [id]);

    const handleKeyPress = (key) => setInputValue(prev => prev + key);
    const handleDelete = () => setInputValue(prev => prev.slice(0, -1));

    const handleSubmit = () => {
        if (!inputValue) return;
        setStatus('processing');
        submitPayment({ serviceId: id, consumerId: inputValue })
            .then(() => setStatus('success'));
    };

    if (!details) return <div style={{ padding: '4rem' }}>Loading...</div>;

    if (status === 'success') {
        return (
            <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem'
            }}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ color: '#22c55e' }}
                >
                    <CheckCircle size={120} />
                </motion.div>
                <h2 style={{ fontSize: '3rem' }}>{t('success')}</h2>
                <p style={{ fontSize: '1.5rem', color: 'var(--text-dim)' }}>ID: TXN12345678</p>
                <button
                    className="kiosk-btn"
                    style={{ width: '300px', marginTop: '2rem' }}
                    onClick={() => navigate('/kiosk/services')}
                >
                    {t('printRec')} & Close
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem 4rem', height: '100%', display: 'flex', gap: '4rem' }}>
            <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{details.name}</h2>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>
                            {details.fields[0].label}
                        </label>
                        <div
                            onClick={() => setShowKeyboard(true)}
                            style={{
                                border: '2px solid var(--accent)',
                                padding: '1rem',
                                borderRadius: '8px',
                                fontSize: '2rem',
                                minHeight: '4rem',
                                caretColor: 'var(--accent)',
                                background: 'white',
                                color: 'var(--text-light)'
                            }}
                        >
                            {inputValue}<span className="blink">|</span>
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>
                            {details.fields[1].label}
                        </label>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                            {details.fields[1].value}
                        </div>
                    </div>

                    <button
                        className="kiosk-btn"
                        onClick={handleSubmit}
                        disabled={status === 'processing' || !inputValue}
                        style={{ opacity: inputValue ? 1 : 0.5 }}
                    >
                        {status === 'processing' ? (
                            <><Loader className="spin" /> {t('processing')}</>
                        ) : t('pay')}
                    </button>
                </div>
            </div>

            <div style={{ flex: 1 }}>
                <AnimatePresence>
                    {showKeyboard && (
                        <motion.div
                            initial={{ y: 200, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 200, opacity: 0 }}
                        >
                            <VirtualKeyboard
                                onKeyPress={handleKeyPress}
                                onDelete={handleDelete}
                                onSubmit={() => setShowKeyboard(false)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
                .blink { animation: blink 1s step-end infinite; }
                @keyframes blink { 50% { opacity: 0; } }
            `}</style>
        </div>
    );
};

export default ServiceDetail;
