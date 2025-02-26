import { SearchConfig, SearchSource } from '@mrinal-c/ai-job-scraper';
import axios, { AxiosResponse } from 'axios';

export const isOk = (response: AxiosResponse) => {
    return 200 <= response.status && response.status <= 299;
}

export async function getSupportedSources(url: string): Promise<SearchSource[]> {
    const response = await axios.get<SearchSource[]>(`${url}/audit/supported`);
    return response.data;
}

export async function beginSearch(url: string, searchConfigs: SearchConfig[]): Promise<string | undefined> {
    const response = await axios.post(`${url}/audit/start`, {
        remoteUrl: "http://localhost:9222",
        searchConfigs: searchConfigs
    });
    if (isOk(response)) {
        const id = response.data.id;
        return id;
    }
}

export async function validateRemoteServer(url: string): Promise<boolean> {
    try {
        const response = await axios.get(`${url}`);
        return isOk(response);
    } catch (err) {
        return false;

    }
}