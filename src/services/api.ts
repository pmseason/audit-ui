import axios from 'axios';
import { ClosedRoleAuditTask, OpenRoleAuditTask, ScrapedPosition } from '../types/audit';
import { JobStatus } from '@/types/jobs';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// // Add request interceptor to include bearer token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('auth_token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export const getClosedRoleAuditTasks = async (): Promise<ClosedRoleAuditTask[]> => {
  const response = await api.get<ClosedRoleAuditTask[]>('/audit/closed');
  return response.data;
};

export const updatePositionStatus = async (positionId: string, status: JobStatus) => {
  await api.put(`/positions/${positionId}/status`, { status });
};

export const getOpenRoleAuditTasks = async (): Promise<OpenRoleAuditTask[]> => {
  const response = await api.get<OpenRoleAuditTask[]>('/audit/open');
  return response.data;
};

export const getScrapedPositions = async (date?: string): Promise<ScrapedPosition[]> => {
  const params = date ? { date } : {};
  const response = await api.get<ScrapedPosition[]>('/positions/scraped-positions', { params });
  return response.data ?? [];
};

