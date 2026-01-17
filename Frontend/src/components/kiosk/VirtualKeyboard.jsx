import React, { useState } from 'react';
import { Delete, ArrowUp } from 'lucide-react';
import '../../styles/kiosk.css';

const keys = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

const VirtualKeyboard = ({ onKeyPress, onDelete, onSubmit }) => {
    const [shift, setShift] = useState(false);

    const handleKey = (key) => {
        onKeyPress(shift ? key : key.toLowerCase());
    };

    return (
        <div className="virtual-keyboard glass-panel">
            {/* Number Row */}
            {keys[0].map(k => (
                <button key={k} className="key-btn" onClick={() => handleKey(k)}>{k}</button>
            ))}

            {/* Row 1 */}
            {keys[1].map(k => (
                <button key={k} className="key-btn" onClick={() => handleKey(k)}>{k}</button>
            ))}

            {/* Row 2 */}
            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                {keys[2].map(k => (
                    <button key={k} className="key-btn" style={{ width: '9%' }} onClick={() => handleKey(k)}>{k}</button>
                ))}
            </div>

            {/* Row 3 */}
            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <button
                    className="key-btn"
                    style={{ width: '15%', background: shift ? 'var(--primary)' : '' }}
                    onClick={() => setShift(!shift)}
                >
                    <ArrowUp size={24} />
                </button>

                {keys[3].map(k => (
                    <button key={k} className="key-btn" style={{ width: '9%' }} onClick={() => handleKey(k)}>{k}</button>
                ))}

                <button
                    className="key-btn"
                    style={{ width: '15%', background: '#ef4444' }}
                    onClick={onDelete}
                >
                    <Delete size={24} />
                </button>
            </div>

            {/* Space Bar */}
            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
                <button className="key-btn" style={{ width: '60%' }} onClick={() => handleKey(' ')}>SPACE</button>
                <button
                    className="key-btn"
                    style={{ width: '30%', background: 'var(--primary)', fontWeight: 'bold' }}
                    onClick={onSubmit}
                >
                    ENTER
                </button>
            </div>
        </div>
    );
};

export default VirtualKeyboard;
