import { SearchConfig, SearchSource } from '@mrinal-c/ai-job-scraper';
import axios, { AxiosResponse } from 'axios';

export const isOk = (response: AxiosResponse) => {
    return 200 <= response.status && response.status <= 299;
}

export async function getSupportedSources(): Promise<SearchSource[]> {
    const response = await axios.get<SearchSource[]>(`${import.meta.env.VITE_BACKEND_URL}/audit/supported`);
    return response.data;
}

export async function beginSearch(chromeUrl: string, searchConfigs: SearchConfig[]): Promise<string | undefined> {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/audit/start`, {
        remoteUrl: chromeUrl,
        searchConfigs: searchConfigs
    });
    if (isOk(response)) {
        const id = response.data.id;
        return id;
    }
}