import React from 'react';
import { CheckCircle } from 'lucide-react';

const DetailRow = ({ label, value, highlight }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{ color: '#64748b' }}>{label}</span>
        <span style={{ fontWeight: '600', color: highlight ? '#dc2626' : '#1e293b' }}>{value}</span>
    </div>
);

const BillResult = ({ billDetails, consumerNumber, selectedService, onPayment }) => {
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
            <div className="glass-panel" style={{ padding: '2rem', background: 'white', borderRadius: '16px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-flex', padding: '1rem', background: '#dcfce7', borderRadius: '50%', color: '#166534', marginBottom: '1rem' }}>
                        <CheckCircle size={40} />
                    </div>
                    <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#1e293b' }}>Bill Details Fetched</h3>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
                    <DetailRow label="Consumer Name" value={billDetails?.consumerName} />
                    <DetailRow label="Consumer Number" value={consumerNumber} />
                    <DetailRow label="Bill Period" value="Jan 2026 - Feb 2026" />
                    <DetailRow label="Due Date" value={billDetails?.dueDate} highlight />

                    <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '2px dashed #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <span style={{ color: '#475569', fontWeight: '600' }}>Total Amount</span>
                        <span style={{ fontSize: '1.8rem', fontWeight: '700', color: '#0f172a' }}>{billDetails?.billAmount}</span>
                    </div>
                </div>

                {selectedService === 'quick_pay' ? (
                    <button
                        onClick={onPayment}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1.2rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Proceed to Pay
                    </button>
                ) : (
                    <div style={{ textAlign: 'center', color: '#64748b', fontSize: '1.1rem' }}>
                        Bill Status: <span style={{ color: '#d97706', fontWeight: '700' }}>{billDetails?.status}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BillResult;
