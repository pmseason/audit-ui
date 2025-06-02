// import { Browser } from "puppeteer-core";
// import { SearchConfig } from "./config.type";

import { Job } from "@/types/jobs";

// export type SearchTool = "scraping" | "firecrawl" | "scraping+ai";


// export type SearchInput = {
//     browser: Browser;
//     searchConfig: SearchConfig;
//     timestamp: string;
// };

// export type ScrapedJob = {
//     textContent: any,
//     link: string
// }

// export type ProcessedJob = {
//     title?: string,
//     application_link?: string,
//     location?: string,
//     description?: string,
//     other?: string
// }

// export type RawJob = ScrapedJob
// export type Job = RawJob | ProcessedJob

// export type SearchResult = {
//     jobs: Job[],
//     success: boolean,
//     error?: string,
//     message?: string,
//     count?: number,
//     tool: SearchTool
//     searchConfig?: SearchConfig,
//     timestamp?: string
// }

// export type CSVSearchResult = {
//     title?: string,
//     application_link?: string,
//     location?: string,
//     description?: string,
//     other?: string,
//     searchConfig: string,
//     company: string,
//     timestamp: string
// }

export enum AuditStatus {
    PENDING = "pending",
    QUEUED = "queued",
    COMPLETED = "completed",
    FAILED = "failed",
    IN_PROGRESS = "in_progress"
}

export interface ClosedRoleAuditTask {
    id: number;
    job: Job;
    url: string;
    status: AuditStatus;
    statusMessage: string;
    result: "open" | "closed" | "unsure";
    justification: string;
    screenshot: string;
    updated_at: string;
    created_at: string;
}

