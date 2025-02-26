import { SearchConfig, SearchResult, SearchSource } from "@mrinal-c/ai-job-scraper";

export type GlobalState = {
    supportedSources: SearchSource[];
    searchConfigs: SearchConfig[];
    currentAuditId?: string;
    searchResults: SearchResult[];
    setSupportedSources: (sources: SearchSource[]) => void;
    addToConfig: (config: SearchConfig) => void;
    removeFromConfig: (index: number) => void;
    setCurrentAuditId: (id: string) => void;
    addToSearchResults: (results: SearchResult[]) => void;
    addToNextSearch: (index: number) => void;
    removeFromNextSearch: (index: number) => void;
    getSearchableConfigs: () => SearchConfig[];
    setSearchConfigs: (configs: SearchConfig[]) => void;
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