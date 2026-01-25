import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { ChevronLeft, Camera, Send, CheckCircle, AlertCircle, X, Loader2 } from 'lucide-react';
import QRCode from 'react-qr-code';
import { submitComplaint, initPhotoSession, checkUploadStatus } from '../../services/api/kiosk';
import { KIOSK_ID } from '../../services/config';
import '../../styles/kiosk.css'; // Assuming base styles exist

const ComplaintBox = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Photo Upload State
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [photoAttached, setPhotoAttached] = useState(false);
    const [uploadSession, setUploadSession] = useState(null); // { sessionId, uploadUrl }
    const [pollingInterval, setPollingInterval] = useState(null);

    const [formData, setFormData] = useState({
        department: '',
        description: '',
        phoneNumber: '', // Optional
        photoUrl: ''     // Optional
    });

    const departments = [
        'Kiosk Related',
        'Revenue Department',
        'Health Department',
        'Education Department',
        'Transport Department',
        'Municipality',
        'Police / Security'
    ];

    const wordCount = formData.description.trim().split(/\s+/).filter(Boolean).length;
    const isDescriptionValid = wordCount >= 5 && wordCount <= 300;
    const isPhoneNumberValid = !formData.phoneNumber || formData.phoneNumber.length === 10;
    const wordsLeft = 300 - wordCount;

    // Clean up polling on unmount or modal close
    useEffect(() => {
        return () => {
            if (pollingInterval) clearInterval(pollingInterval);
        };
    }, [pollingInterval]);

    const handleInputChange = (field, value) => {
        if (field === 'description') {
            const words = value.trim().split(/\s+/).filter(Boolean).length;
            if (words > 300 && value.length > formData.description.length) return; // Prevent typing more
        }
        if (field === 'phoneNumber') {
            // Only allow numbers
            if (!/^\d*$/.test(value)) return;
            // Limit to 10 digits
            if (value.length > 10) return;
        }
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const startPhotoSession = async () => {
        setShowPhotoModal(true);
        setUploadSession(null); // Reset

        try {
            // 1. Init Session
            const session = await initPhotoSession(KIOSK_ID);
            setUploadSession(session);

            // 2. Start Polling
            const interval = setInterval(async () => {
                try {
                    const statusRes = await checkUploadStatus(session.sessionId);
                    if (statusRes.status === 'COMPLETED') {
                        setFormData(prev => ({ ...prev, photoUrl: statusRes.photoUrl }));
                        setPhotoAttached(true);
                        setShowPhotoModal(false);
                        clearInterval(interval);
                    }
                } catch (err) {
                    console.error("Polling error", err);
                }
            }, 3000); // Poll every 3 seconds

            setPollingInterval(interval);

        } catch (error) {
            console.error("Failed to init photo session", error);
            // Handle error (show message to user)
        }
    };

    const cancelPhotoUpload = () => {
        if (pollingInterval) clearInterval(pollingInterval);
        setShowPhotoModal(false);
        setUploadSession(null);
    };

    const removePhoto = () => {
        setPhotoAttached(false);
        setFormData(prev => ({ ...prev, photoUrl: '' }));
    };

    const handleSubmit = async () => {
        if (!isDescriptionValid || !isPhoneNumberValid || !formData.department) return;

        setLoading(true);
        const payload = {
            ...formData,
            kioskId: KIOSK_ID,
            timestamp: new Date().toISOString()
        };

        try {
            const response = await submitComplaint(payload);
            if (response.success) {
                setShowSuccess(true);
                setTimeout(() => {
                    navigate('/kiosk'); // Redirect after animation
                }, 4000);
            }
        } catch (error) {
            console.error("Submission error:", error);
            // Handle error state (maybe show toast)
        } finally {
            setLoading(false);
        }
    };

    // UX4G Inspired Styles
    const styles = {
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#1e293b', // Slate 800
            fontSize: '1.1rem'
        },
        input: {
            width: '100%',
            padding: '1rem',
            fontSize: '1.1rem',
            borderRadius: '8px',
            border: '2px solid #cbd5e1', // Slate 300
            marginBottom: '1.5rem',
            outline: 'none',
            transition: 'border-color 0.2s'
        },
        select: {
            width: '100%',
            padding: '1rem',
            fontSize: '1.1rem',
            borderRadius: '8px',
            border: '2px solid #cbd5e1',
            marginBottom: '1.5rem',
            backgroundColor: 'white',
            cursor: 'pointer'
        },
        buttonPrimary: {
            background: '#2563eb', // Blue 600
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1.2rem',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            width: '100%',
            opacity: (!isDescriptionValid || !isPhoneNumberValid || !formData.department || loading) ? 0.5 : 1,
            pointerEvents: (!isDescriptionValid || !isPhoneNumberValid || !formData.department || loading) ? 'none' : 'auto',
            transition: 'opacity 0.2s'
        },
        buttonSecondary: {
            background: 'white',
            color: '#2563eb',
            border: '2px solid #2563eb',
            padding: '0.8rem 1.5rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        }
    };

    if (showSuccess) {
        return (
            <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-panel"
                    style={{ padding: '3rem', textAlign: 'center', background: 'white', borderRadius: '24px', maxWidth: '500px' }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                        <CheckCircle size={80} color="#22c55e" style={{ marginBottom: '1.5rem' }} />
                    </motion.div>
                    <h2 style={{ color: '#166534', fontSize: '2rem', marginBottom: '1rem' }}>Success!</h2>
                    <p style={{ fontSize: '1.2rem', color: '#4b5563' }}>Your complaint has been registered successfully.</p>
                    <p style={{ marginTop: '2rem', fontSize: '1rem', color: '#9ca3af' }}>Redirecting to home...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="page-container" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button onClick={() => navigate('/kiosk/services')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569' }}>
                    <ChevronLeft size={36} />
                </button>
                <h1 style={{ margin: 0, fontSize: '2rem', color: '#0f172a' }}>Register Complaint</h1>
            </div>

            <div style={{ display: 'flex', gap: '4rem', maxWidth: '1200px', margin: '0 auto', width: '100%', flex: 1 }}>

                {/* Left Column - Form */}
                <div style={{ flex: 1.5 }}>
                    {/* Department Select */}
                    <div>
                        <label style={styles.label}>Department <span style={{ color: 'red' }}>*</span></label>
                        <select
                            style={styles.select}
                            value={formData.department}
                            onChange={(e) => handleInputChange('department', e.target.value)}
                        >
                            <option value="">Select a Department</option>
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label style={{ ...styles.label, marginBottom: 0 }}>Description <span style={{ color: 'red' }}>*</span></label>
                            <span style={{
                                fontSize: '0.9rem',
                                color: wordCount > 300 ? '#ef4444' : (wordCount < 5 && wordCount > 0 ? '#eab308' : '#64748b')
                            }}>
                                {wordCount < 5 ? `Min 5 words (${wordCount}/5)` : `${wordsLeft} words left`}
                            </span>
                        </div>
                        <textarea
                            style={{ ...styles.input, minHeight: '150px', resize: 'none' }}
                            placeholder="Please describe your issue in detail (min 5 words)..."
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                        />
                        {wordCount > 0 && wordCount < 5 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#eab308', marginTop: '-1rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                <AlertCircle size={16} /> Please provide more details
                            </div>
                        )}
                    </div>

                    {/* Phone Number (Optional) */}
                    <div>
                        <label style={styles.label}>Phone Number (Optional)</label>
                        <input
                            type="tel"
                            style={styles.input}
                            placeholder="Enter your mobile number"
                            value={formData.phoneNumber}
                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        />
                        {formData.phoneNumber && formData.phoneNumber.length < 10 && (
                            <div style={{ color: '#ef4444', fontSize: '0.9rem', marginTop: '-1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <AlertCircle size={16} /> Phone number must be exactly 10 digits
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Actions & Info */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Photo Upload Section */}
                    <div className="glass-panel" style={{ padding: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Camera size={24} color="#2563eb" /> Attach Photo (Optional)
                        </h3>

                        {!photoAttached ? (
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ marginBottom: '1rem', color: '#64748b' }}>Scan a QR code to upload a photo from your mobile device.</p>
                                <button
                                    style={styles.buttonSecondary}
                                    onClick={startPhotoSession}
                                >
                                    <Camera size={20} /> Scan to Upload
                                </button>
                            </div>
                        ) : (
                            <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#166534' }}>
                                <CheckCircle size={24} />
                                <span style={{ fontWeight: '500' }}>Photo attached successfully</span>
                                <button
                                    onClick={removePhoto}
                                    style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#166534' }}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        )}
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                        <button
                            style={styles.buttonPrimary}
                            onClick={handleSubmit}
                            disabled={loading || !isDescriptionValid || !isPhoneNumberValid || !formData.department}
                        >
                            {loading ? 'Submitting...' : 'Submit Complaint'}
                            {!loading && <Send size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mock QR Code Modal */}
            <AnimatePresence>
                {showPhotoModal && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                    }}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            style={{ background: 'white', padding: '2rem', borderRadius: '16px', textAlign: 'center', maxWidth: '90%', width: '400px' }}
                        >
                            <h3 style={{ marginBottom: '1.5rem' }}>Scan with Mobile</h3>

                            {uploadSession ? (
                                <>
                                    <div style={{ background: 'white', padding: '1rem', display: 'inline-block', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
                                        <QRCode value={uploadSession.uploadUrl || 'https://viosk.com'} size={200} />
                                    </div>
                                    <p style={{ marginTop: '1.5rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                        <Loader2 className="animate-spin" size={20} /> Waiting for upload...
                                    </p>
                                </>
                            ) : (
                                <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Loader2 className="animate-spin" size={40} color="#2563eb" />
                                </div>
                            )}

                            <button
                                onClick={cancelPhotoUpload}
                                style={{ marginTop: '2rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1rem', fontWeight: 500 }}
                            >
                                Cancel
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ComplaintBox;
