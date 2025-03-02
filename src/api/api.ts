import { SearchConfig, SearchSource } from '@pmseason/ai-job-scraper';
import axios, { AxiosResponse } from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const isOk = (response: AxiosResponse) => {
    return 200 <= response.status && response.status <= 299;
}

export async function getSupportedSources(): Promise<SearchSource[]> {
    const response = await axios.get<SearchSource[]>(`${SERVER_URL}/audit/supported`);
    return response.data;
}

export async function beginSearch(searchConfigs: SearchConfig[]): Promise<string | undefined> {
    const response = await axios.post(`${SERVER_URL}/audit/start`, {
        searchConfigs: searchConfigs
    });
    if (isOk(response)) {
        const id = response.data.id;
        return id;
    }
}


export async function pollSearchResults(auditId: string): Promise<any> {
    return new Promise((resolve) => {
        const pollInterval = setInterval(async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/audit/${auditId}/status`);
                if (isOk(response)) {
                    resolve(response.data);
                    clearInterval(pollInterval);
                }
            } catch (error) {
                // reject(error);
            }
        }, 5000);
    });
}

export async function validateRemoteServer(): Promise<boolean> {
    try {
        const response = await axios.get(`${SERVER_URL}`);
        return isOk(response);
    } catch (err) {
        return false;

    }
}