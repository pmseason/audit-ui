import axios from 'axios';
import { ClosedRoleAuditTask } from '../types/audit';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const getClosedRoleAuditTasks = async (): Promise<ClosedRoleAuditTask[]> => {
  const response = await api.get<ClosedRoleAuditTask[]>('/audit/closed');
  return response.data;
};

export const startClosedRoleAudit = async (taskIds: number[]): Promise<void> => {
  await api.post('/audit/start/closed', { taskIds });
};

export const createClosedRoleAudit = async (): Promise<void> => {
  await api.post('/audit/create/closed');
};

export const addOpenRoleSearch = async (task: { url: string, extra_notes?: string }): Promise<void> => {
  await api.post('/audit/add/open', task);
};
