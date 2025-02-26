import axios from "axios";
import { isOk } from "./api";

export async function pollSearchResults(auditId: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const pollInterval = setInterval(async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/audit/${auditId}/status`);
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