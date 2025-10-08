const API_BASE = 'http://your-api-url.com/api'; // Replace with your backend

export const api = {
  getToken: async (tokenCode) => {
    const response = await fetch(`${API_BASE}/tokens/${tokenCode}`);
    return response.json();
  },

  createTransaction: async (data) => {
    const response = await fetch(`${API_BASE}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed');
    return response.json();
  },

  getTransactions: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_BASE}/transactions?${params}`);
    return response.json();
  },

  getReports: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_BASE}/reports?${params}`);
    return response.json();
  },
};