import { SearchConfig, SearchSource } from '@pmseason/ai-job-scraper';
import axios, { AxiosResponse } from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export async function getSupportedSources(): Promise<SearchSource[]> {
    try {
        const response = await axios.get<SearchSource[]>(`${SERVER_URL}/audit/supported`);
        return response.data;
    } catch (error) {
        console.error("Error fetching supported sources:", error);
        return []
    }
}


export async function beginSearch(searchConfigs: SearchConfig[]): Promise<any> {
    return new Promise(async (resolve, reject) => {
        let pollInterval: NodeJS.Timeout | undefined;
        try {
            const response = await axios.post(`${SERVER_URL}/audit/start`, {
                searchConfigs: searchConfigs
            });

            const auditId = response.data.id;

            pollInterval = setInterval(async () => {
                try {
                    const response = await axios.get(`${SERVER_URL}/audit/${auditId}/status`);

                    //response has message?, error?, data?, and status fields
                    const { error, data, status } = response.data;

                    //if error is present at any point, reject
                    if (error) {
                        reject(error);
                        clearInterval(pollInterval)
                    }

                    //if completed and data, resolve
                    if (status === "completed" && data) {
                        resolve(data)
                        clearInterval(pollInterval)
                    }
                } catch (error) {
                    reject(error);
                    clearInterval(pollInterval)
                }
            }, 5000);

            // Set a timeout to stop polling after a maximum runtime
            const maxRuntime = 120000; // 1 minute
            const timeout = setTimeout(() => {
                reject("Audit timed out...sorry....");
                clearInterval(pollInterval);
            }, maxRuntime);
        } catch (error) {
            reject("An error occurred... Are you sure you connected to the server beforehand?")
            if (pollInterval) clearInterval(pollInterval)
        }

    });

}