const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  endpoints: {
    leads: `${API_BASE_URL}/leads`,
    analytics: `${API_BASE_URL}/leads/analytics`,
    ai: `${API_BASE_URL}/ai`,
    campaigns: `${API_BASE_URL}/campaigns`,
    whatsapp: `${API_BASE_URL}/whatsapp`,
  }
};

export default API_CONFIG;
