import { API_CONFIG } from '@/app/config/api';

const API_BASE_URL = `${API_CONFIG.baseUrl}/ai`;

export interface UGCRequest {
  topic: string;
  platform: string;
  type: string;
  tone: string;
  targetAudience: string;
}

export interface UGCResponse {
  success: boolean;
  data: {
    content: string;
    hooks: string[];
    hashtags: string[];
    engagementPotential: number;
  };
}

export const ugcApi = {
  generateContent: async (data: UGCRequest): Promise<UGCResponse> => {
    const response = await fetch(`${API_BASE_URL}/ugc-generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Neural bridge failed to synthesize asset.');
    }
    
    return response.json();
  },
};
