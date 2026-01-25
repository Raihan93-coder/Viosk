import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Search } from 'lucide-react';
import { ELECTRICITY_BOARDS } from '../../../data/electricityBoards';

const BoardSelection = ({ onSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBoards = ELECTRICITY_BOARDS.filter(board =>
        board.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        board.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ width: '100%' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#64748b' }}>Select Electricity Board</h3>

            {/* Search Bar */}
            <div style={{ maxWidth: '600px', margin: '0 auto 2rem', position: 'relative' }}>
                <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
                <input
                    type="text"
                    placeholder="Search Board (e.g., TNEB, Bescom, Delhi)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3rem',
                        fontSize: '1.1rem',
                        borderRadius: '12px',
                        border: '2px solid #e2e8f0',
                        outline: 'none',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                />
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1.5rem',
                maxHeight: '60vh', // Scrollable if too many
                overflowY: 'auto',
                padding: '0.5rem' // Prevent shadow clipping
            }}>
                {filteredBoards.length > 0 ? (
                    filteredBoards.map(board => (
                        <motion.button
                            key={board.id}
                            whileHover={{ scale: 1.02, borderColor: board.color }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onSelect(board)}
                            className="glass-panel"
                            style={{
                                padding: '1.5rem',
                                border: '1px solid var(--glass-border)',
                                background: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1rem',
                                cursor: 'pointer',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{
                                width: '60px', height: '60px', borderRadius: '50%',
                                background: `${board.color}20`, color: board.color,
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Building2 size={28} />
                            </div>
                            <span style={{ fontWeight: '600', fontSize: '1.1rem', color: '#334155' }}>{board.name}</span>
                        </motion.button>
                    ))
                ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                        <p>No boards found matching "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoardSelection;
