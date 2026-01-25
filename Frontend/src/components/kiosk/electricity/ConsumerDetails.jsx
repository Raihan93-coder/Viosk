import React from 'react';
import { Building2, Loader2, ArrowRight } from 'lucide-react';

const ConsumerDetails = ({ selectedBoard, selectedService, consumerNumber, setConsumerNumber, onFetch, loading }) => {
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
            <div className="glass-panel" style={{ padding: '2rem', background: 'white', borderRadius: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{
                        width: '50px', height: '50px', borderRadius: '12px',
                        background: `${selectedBoard?.color}20`, color: selectedBoard?.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Building2 size={24} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, color: '#1e293b' }}>{selectedBoard?.name}</h3>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>{selectedService === 'quick_pay' ? 'Bill Payment' : 'Check Status'}</p>
                    </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#475569' }}>
                        Consumer Number / Connection ID
                    </label>
                    <input
                        type="text"
                        value={consumerNumber}
                        onChange={(e) => setConsumerNumber(e.target.value.replace(/\D/g, ''))} // Numeric only
                        placeholder="Enter 10-12 digit Consumer No"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            fontSize: '1.2rem',
                            borderRadius: '8px',
                            border: '2px solid #cbd5e1',
                            outline: 'none'
                        }}
                    />
                    <p style={{ marginTop: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                        Usually found on the top-right of your electricity bill.
                    </p>
                </div>

                <button
                    onClick={onFetch}
                    disabled={!consumerNumber || consumerNumber.length < 5 || loading}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        background: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        opacity: (!consumerNumber || consumerNumber.length < 5 || loading) ? 0.7 : 1
                    }}
                >
                    {loading ? <Loader2 className="animate-spin" /> : (selectedService === 'quick_pay' ? 'Fetch Bill' : 'Check Status')}
                    {!loading && <ArrowRight size={20} />}
                </button>
            </div>
        </div>
    );
};

export default ConsumerDetails;
