import { SearchConfig, SearchResult, SearchSource } from '@pmseason/ai-job-scraper';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getSupportedSources(): Promise<SearchSource[]> {
    try {
        const response = await axios.get<SearchSource[]>(`${BACKEND_URL}/audit/supported`);
        return response.data;
    } catch (error) {
        console.error("Error fetching supported sources:", error);
        return []
    }
}

export async function beginSearch(searchConfigs: SearchConfig[], indices: number[], reportCompletion: (index: number, error: boolean, result?: SearchResult, ) => void): Promise<any> {
    for (let index = 0; index < searchConfigs.length; index++) {
        const config = searchConfigs[index];
        try {
            const results = await runOneSearch(config);
            const result = results.find(result => result.tool == "firecrawl" || result.tool == "scraping+ai")
            reportCompletion(indices[index], false, result);
        } catch (error) {
            console.error("Error during search:", error);
            reportCompletion(indices[index], true);

        }
    }
}

async function runOneSearch(config: SearchConfig): Promise<SearchResult[]> {
    let pollInterval: NodeJS.Timeout | undefined;

    return new Promise<SearchResult[]>(async (resolve, reject) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/audit/start`, {
                searchConfigs: [config]
            });

            const auditId = response.data.id;
            pollInterval = setInterval(async () => {
                try {
                    const response = await axios.get(`${BACKEND_URL}/audit/${auditId}/status`);

                    //response has message?, error?, data?, and status fields
                    const { error, data, status } = response.data;

                    //if error is present at any point, reject
                    if (error) {
                        reject(error);
                        clearInterval(pollInterval);
                    }

                    //if completed and data, resolve
                    if (status === "completed" && data) {
                        resolve(data);
                        clearInterval(pollInterval);
                    }
                } catch (error) {
                    reject(error);
                    clearInterval(pollInterval);
                }
            }, 5000);

            // Set a timeout to stop polling after a maximum runtime
            const maxRuntime = 120000; // 1 minute
            setTimeout(() => {
                reject("Audit timed out...sorry....");
                clearInterval(pollInterval);
            }, maxRuntime);
        } catch (error) {
            reject("An error occurred... Are you sure you connected to the server beforehand?");
            if (pollInterval) clearInterval(pollInterval);
        }
    });

}