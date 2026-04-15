import { API_CONFIG } from '../../../../config/api';

const API_BASE_URL = API_CONFIG.baseUrl;

export interface Lead {
  id: string;
  _id: string;
  name: string;
  email: string;
  phone?: string;
  source: 'meta' | 'google' | 'tiktok' | 'manual';
  status: 'new' | 'qualified' | 'booked' | 'converted' | 'lost';
  score: number;
  value: number;
  notes?: string;
  conversation?: Array<{
    role: 'ai' | 'user' | 'system';
    content: string;
    timestamp: string | Date;
  }>;
  analysisReason?: string;
  appointmentDate?: string | null;
  bookingLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsData {
  totalRevenue: number;
  potentialRevenue: number;
  funnelStages: {
    new: number;
    qualified: number;
    booked: number;
    converted: number;
    lost: number;
  };
  sourceStats: {
    meta: number;
    google: number;
    tiktok: number;
    manual: number;
  };
  activeLeads: number;
  totalLeads: number;
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
  storage?: 'local-file' | 'mongodb';
}

export const crmApi = {
  getLeads: async (params?: { status?: string; source?: string }): Promise<ApiResponse<Lead[]>> => {
    const query = new URLSearchParams(params as any).toString();
    const response = await fetch(`${API_BASE_URL}/leads?${query}`);
    if (!response.ok) throw new Error('Failed to fetch leads');
    return response.json();
  },

  getLeadById: async (id: string): Promise<ApiResponse<Lead>> => {
    const response = await fetch(`${API_BASE_URL}/leads/${id}`);
    if (!response.ok) throw new Error('Lead not found');
    return response.json();
  },

  createLead: async (leadData: Partial<Lead>): Promise<ApiResponse<Lead>> => {
    const response = await fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData),
    });
    if (!response.ok) throw new Error('Failed to create lead');
    return response.json();
  },

  updateLead: async (id: string, updateData: Partial<Lead>): Promise<ApiResponse<Lead>> => {
    const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) throw new Error('Failed to update lead');
    return response.json();
  },

  deleteLead: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete lead');
    return response.json();
  },

  getAnalytics: async (): Promise<ApiResponse<AnalyticsData>> => {
    const response = await fetch(`${API_BASE_URL}/leads/analytics`);
    if (!response.ok) throw new Error('Failed to fetch analytics');
    return response.json();
  },
};
