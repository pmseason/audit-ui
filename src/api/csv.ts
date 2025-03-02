import { CSVSearchResult } from "@/types/types";
import { Job, ProcessedJob, SearchResult } from "@pmseason/ai-job-scraper";

export function prepareForCsv(results: SearchResult[]): CSVSearchResult[] {
    const filtered = results.filter(result => result.tool !== "scraping");

    const csvResults: CSVSearchResult[] = []
    for (const result of filtered) {
        const { searchConfig, jobs, timestamp } = result
        const { scrapeFrom, roleType } = searchConfig ?? { scrapeFrom: { name: "", url: "" }, roleType: "apm", aiQuery: "" }
        const entries = jobs.map((job: Job) => {
            const { title, application_link, location, description, other } = job as ProcessedJob;
            return { timestamp: timestamp!, company: scrapeFrom.name, title, application_link, location, description, other, roleType, searchConfig: JSON.stringify(searchConfig) }
        })
        csvResults.push(...entries)
    }
    csvResults.sort((a: CSVSearchResult, b: CSVSearchResult) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    return csvResults;
}