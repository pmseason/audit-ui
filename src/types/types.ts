// import { SearchConfig, SearchResult, SearchSource } from "@pmseason/ai-job-scraper";


// //global app state
// export type GlobalState = {
//     //dynamic supported sources fetched from server to display in form
//     supportedSources: SearchSource[];

//     //holds all current user-added search configs
//     searchData: Search[];
//     addToConfig: (config: SearchConfig, supportedSource?: SearchSource) => void;
//     removeFromConfig: (index: number) => void;
//     includeInNextSearch: (index: number) => void;
//     excludeFromNextSearch: (index: number) => void;
//     setSearchConfigs: (configs: SearchConfig[], overwrite: boolean) => void;

//     //audit id if running, empty if not
//     currentAuditId?: string;
//     setCurrentAuditId: (id: string) => void;

//     //accumulates all search results retrieved, without merging (duplicates allowed)
//     addSearchResult: (index: number, error: boolean, results?: SearchResult[]) => void;

//     toggleAll: () => void;

//     startLoading: (indices: number[]) => void
// }

// //wrapper around the config for ui-specific metadata
// export enum SearchStatus {
//     NotRun = "not-run",
//     Success = "success",
//     Error = "error",
//     InProgress = "in-progress"
// }
// export type Search = {
//     config: SearchConfig;
//     includeInNextSearch: boolean;
//     supportedSource?: SearchSource;
//     results?: SearchResult[];
//     status: SearchStatus;
// }

// export type CSVSearchResult = {
//     title?: string,
//     application_link?: string,
//     location?: string,
//     description?: string,
//     other?: string,
//     searchConfig: string,
//     timestamp: string
// }