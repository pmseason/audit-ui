// import { Browser } from "puppeteer-core";
// import { SearchConfig } from "./config.type";

import { Company, Job } from "@/types/jobs";                          

export enum AuditStatus {
    PENDING = "pending",
    NOT_RUN = "not_run",
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

export interface OpenRoleAuditTask {
    id: number;
    url: string;
    extra_notes: string;
    status: AuditStatus;
    status_message: string;
    updated_at: string;
    created_at: string;
    company: Company;
}

export type ScrapedPosition = Job & {
    location: string;
    other: string;
    years_experience: string;
}

