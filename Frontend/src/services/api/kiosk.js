// Kiosk API Services - Mock Data

export const getServices = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 'electricity', name: 'Electricity', icon: 'Zap' },
                { id: 'water', name: 'Water', icon: 'Droplet' },
                { id: 'gas', name: 'Gas', icon: 'Flame' },
                { id: 'waste', name: 'Waste Mgmt', icon: 'Trash2' },
                { id: 'grievance', name: 'Grievance', icon: 'MessageSquare' }
            ]);
        }, 500);
    });
};

export const getServiceDetails = async (serviceId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: serviceId,
                name: serviceId.charAt(0).toUpperCase() + serviceId.slice(1),
                fields: [
                    { name: 'consumerId', label: 'Consumer Number', type: 'number' },
                    { name: 'amount', label: 'Bill Amount', type: 'readonly', value: '₹ 450.00' }
                ]
            });
        }, 500);
    });
};

export const submitPayment = async (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, transactionId: 'TXN' + Math.floor(Math.random() * 1000000) });
        }, 1500);
    });
};
