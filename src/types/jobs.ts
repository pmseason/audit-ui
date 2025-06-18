export const industries = [
    { key: "tech", label: "Tech" },
    { key: "nonTech", label: "Non-Tech" }
] as const;
export type Industry = (typeof industries)[number]["key"];

export const roleTypes = [
    { key: "full-time", label: "Full-Time" },
    { key: "internship", label: "Internship" }
] as const;
export type RoleType = (typeof roleTypes)[number]["key"];
export const roleTypeKeys = roleTypes.map((value) => value.key);


export const visaSponsors = [
    { key: "yes", description: "This position sponsors visas" },
    { key: "no", description: "This position does not sponsor visas" },
    {
        key: "unsure",
        description: "It is unclear whether this position sponsors visa",
    },
] as const;
export type VisaSponsor = (typeof visaSponsors)[number]["key"];
/**
 * @param visaSponsored one of the 3 visa sponsorship types
 * @returns corresponding description
 */
export const getVisaSponsorDescription = (
    visaSponsored: VisaSponsor
): string | undefined => {
    const match = visaSponsors.find((value) => value.key == visaSponsored);
    return match ? match["description"] : undefined;
};


export const jobStatuses = [
    {
        key: "open",
        label: "Open",
        color: "green",
        description: "This role is open - apply today!",
    },
    {
        key: "postponed",
        label: "Postponed",
        color: "yellow",
        description: "Application opening has been temporarily delayed",

    },
    {
        key: "notOpen",
        label: "Not Open",
        color: "gray",
        description: "Application is set to open at a later date",

    },
    {
        key: "closed",
        label: "Closed",
        color: "red",
        description: "Application deadline has passed this recruiting season",

    },
    {
        key: "cancelled",
        label: "Cancelled",
        color: "purple",
        description: "Position has been terminated this recruiting season",

    },
] as const;
export type JobStatus = (typeof jobStatuses)[number]["key"];
export const jobStatusKeys = jobStatuses.map((value) => value.key);


/**
 * Get the specified attribute from the status array
 *
 * @param inputStatus status to find associated attribute
 * @param attribute attribute key to find within status object
 * @returns attribute value
 */
export const getStatusAttribute = (
    inputStatus: JobStatus,
    attribute: "color" | "label" | "description"
): string | undefined => {
    const foundStatus = jobStatuses.find((value) => {
        return value.key === inputStatus;
    });
    return foundStatus ? foundStatus[attribute] : undefined;
};
export interface Company {
    id: string;
    name: string;
    type: Industry;
    createdAt: Date;
    location: string;
    logo?: {
        id: string;
        filename_disk: string
        url: string
    }
}
export interface Job {
    id: string;
    company: Company;
    jobType: "full-time" | "internship";
    status: JobStatus;
    title: string;
    season: string;
    url: string;
    description?: string;
    hidden: boolean;
    createdAt: string;
    dateAdded: string;
    salaryText: string;
    visaSponsored: VisaSponsor;
    site: string;
}


export interface JobFilter {
    status?: "all" | JobStatus; // Filter by "all" or a specific job status
    jobType?: "all" | RoleType; // Filter by a specific job type
    companyType?: "all" | Industry; // Filter by "all" or a specific company industry
}