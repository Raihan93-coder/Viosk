// Admin API Services - Mock Data

export const getDashboardStats = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                totalTransactions: 1250,
                activeKiosks: 42,
                pendingGrievances: 15,
                dailyRevenue: 450000
            });
        }, 800);
    });
};

export const getAnalyticsData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { name: 'Mon', value: 400 },
                { name: 'Tue', value: 300 },
                { name: 'Wed', value: 550 },
                { name: 'Thu', value: 450 },
                { name: 'Fri', value: 700 },
            ]);
        }, 800);
    });
};

export const toggleAnnouncement = async (message, active) => {
    console.log(`Announcement "${message}" set to ${active}`);
    return Promise.resolve({ success: true });
};
