import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { getQuickPayUrl } from '../../services/api/kiosk';

// Importer Sub-components
import ServiceSelection from '../../components/kiosk/electricity/ServiceSelection';
import BoardSelection from '../../components/kiosk/electricity/BoardSelection';
import ConsumerDetails from '../../components/kiosk/electricity/ConsumerDetails';
import BillResult from '../../components/kiosk/electricity/BillResult';

const ElectricityOptions = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    // Wizard State
    // Steps: 1=Service, 2=Board, 3=Details, 4=Review/Success
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState(null); // 'quick_pay' | 'view_bill'
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [consumerNumber, setConsumerNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [billDetails, setBillDetails] = useState(null);

    const handleBack = () => {
        if (step === 1) {
            navigate(-1);
        } else {
            setStep(prev => prev - 1);
            if (step === 2) setSelectedBoard(null); // Back from Service -> Board
            if (step === 3) setSelectedService(null); // Back from Details -> Service
            if (step === 4) setBillDetails(null);
        }
    };

    const handleBoardSelect = (board) => {
        setSelectedBoard(board);
        setStep(2); // Move to Service Selection
    };

    const handleServiceSelect = (serviceId) => {
        setSelectedService(serviceId);
        setStep(3); // Move to Details
    };

    const fetchBillDetails = async () => {
        if (!consumerNumber || consumerNumber.length < 5) return;

        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock Response
        setBillDetails({
            consumerName: "A**** Kumar",
            billAmount: "₹ 1,240.00",
            dueDate: "28 Feb 2026",
            status: "PENDING",
            unitsConsumed: 245
        });
        setLoading(false);
        setStep(4);
    };

    const handlePayment = async () => {
        const url = await getQuickPayUrl();
        if (url) {
            window.location.href = url;
        } else {
            alert("Payment gateway integration pending.");
        }
    };

    return (
        <div style={{ padding: '2rem 4rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                    onClick={handleBack}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#475569',
                        padding: '0.5rem',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <ChevronLeft size={32} />
                </button>
                <div>
                    <h2 style={{ fontSize: '2rem', margin: 0, color: '#0f172a' }}>Electricity Services</h2>
                    <p style={{ margin: 0, color: '#64748b' }}>
                        {step === 1 && "Select your electricity board"}
                        {step === 2 && "Select a service to proceed"}
                        {step === 3 && "Enter connection details"}
                        {step === 4 && "Review bill details"}
                    </p>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2rem' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                    >
                        {step === 1 && <BoardSelection onSelect={handleBoardSelect} />}

                        {step === 2 && <ServiceSelection onSelect={handleServiceSelect} />}

                        {step === 3 && (
                            <ConsumerDetails
                                selectedBoard={selectedBoard}
                                selectedService={selectedService}
                                consumerNumber={consumerNumber}
                                setConsumerNumber={setConsumerNumber}
                                onFetch={fetchBillDetails}
                                loading={loading}
                            />
                        )}

                        {step === 4 && (
                            <BillResult
                                billDetails={billDetails}
                                consumerNumber={consumerNumber}
                                selectedService={selectedService}
                                onPayment={handlePayment}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ElectricityOptions;
