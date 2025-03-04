import { SearchConfig, SearchResult, SearchSource } from "@pmseason/ai-job-scraper";


export type ServerStatus = "down" | "pingable" | "auditable" | "unknown"

//global app state
export type GlobalState = {
    //dynamic supported sources fetched from server to display in form
    supportedSources: SearchSource[];

    //holds all current user-added search configs
    searchConfigData: SearchConfigData[];
    addToConfig: (config: SearchConfig, supportedSource?: SearchSource) => void;
    removeFromConfig: (index: number) => void;
    includeInNextSearch: (index: number) => void;
    excludeFromNextSearch: (index: number) => void;
    setSearchConfigs: (configs: SearchConfig[], overwrite: boolean) => void;

    //audit id if running, empty if not
    currentAuditId?: string;
    setCurrentAuditId: (id: string) => void;

    //accumulates all search results retrieved, without merging (duplicates allowed)
    searchResults: SearchResult[];
    addToSearchResults: (results: SearchResult[]) => void;

    //server status
    serverStatus: ServerStatus;
    setServerStatus: (status: ServerStatus) => void;
}

//wrapper around the config for ui-specific metadata
export type SearchConfigData = {
    config: SearchConfig;
    includeInNextSearch: boolean;
    supportedSource?: SearchSource;
}

export type CSVSearchResult = {
    title?: string,
    application_link?: string,
    location?: string,
    description?: string,
    other?: string,
    searchConfig: string,
    timestamp: string
}