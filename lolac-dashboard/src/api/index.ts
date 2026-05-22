import type { DetectionLog, EmailSettings } from '../types';

const apiRequest = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const token = localStorage.getItem('lolac-token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    headers,
    ...options
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
};

export const loginModerator = async (username: string, password: string): Promise<{ token: string }> => {
  return apiRequest('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
};

export const fetchDetections = async (): Promise<DetectionLog[]> => {
  return apiRequest('/api/detections');
};

export const fetchLogs = async (): Promise<DetectionLog[]> => {
  return apiRequest('/api/logs');
};

export const sendAlert = async (payload: { emailSettings: EmailSettings; logId?: string; test?: boolean }): Promise<{ success: boolean }> => {
  return apiRequest('/api/send-alert', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
};
