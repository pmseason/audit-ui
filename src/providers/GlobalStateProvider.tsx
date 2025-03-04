import { checkServerStatus, getSupportedSources } from "@/api/api";
import { AppContext } from "@/contexts/AppContext";
import { SearchConfigData, ServerStatus } from "@/types/types";
import {
  SearchConfig,
  SearchResult,
  SearchSource,
} from "@pmseason/ai-job-scraper";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

export function GlobalStateProvider({ children }: Props) {
  //local state, this is put into global context
  const [supportedSources, setSupportedSources] = useState<SearchSource[]>([]);
  const [searchConfigData, setSearchConfigData] = useState<SearchConfigData[]>(
    []
  );
  const [currentAuditId, setCurrentAuditId] = useState<string | undefined>();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [serverStatus, setServerStatus] = useState<ServerStatus>("unknown");

  //on first load
  useEffect(() => {
    init();
  }, []);

  //on page load, fetch updated sources to show in the form
  const init = () => {
    getSupportedSources().then(setSupportedSources);
    checkServerStatus().then(setServerStatus);
  };

  /////////////////////SEARCH CONFIG//////////////////////
  //add a single new config to the list
  const addToConfig = (config: SearchConfig, supportedSource?: SearchSource) => {
    //default to search in the next run
    setSearchConfigData([
      ...searchConfigData,
      { config, supportedSource, includeInNextSearch: true },
    ]);
  };

  //remove a single config from the list
  const removeFromConfig = (index: number) => {
    setSearchConfigData((prevConfigs) =>
      prevConfigs.filter((_, i) => i !== index)
    );
  };

  //include a specific search in the next search
  const includeInNextSearch = (index: number) => {
    searchConfigData[index].includeInNextSearch = true;
  };

  //exclude a specific search from the next search
  const excludeFromNextSearch = (index: number) => {
    searchConfigData[index].includeInNextSearch = false;
  };

  //set global search config from user-uploaded file, user can decide if it overwrites or concats
  const setSearchConfigs = (configs: SearchConfig[], overwrite: boolean) => {
    setSearchConfigData((prevConfigs) => [
      ...(overwrite ? [] : prevConfigs),
      ...configs.map((config) => ({ config, includeInNextSearch: true })),
    ]);
  };

  /////////////////////SEARCH RESULTS//////////////////////
  const addToSearchResults = (results: SearchResult[]) => {
    setSearchResults((prevResults) => [...prevResults, ...results]);
  };

  return (
    <AppContext.Provider
      value={{
        supportedSources,

        searchConfigData,
        addToConfig,
        removeFromConfig,
        includeInNextSearch,
        excludeFromNextSearch,
        setSearchConfigs,

        currentAuditId,
        setCurrentAuditId,

        searchResults,
        addToSearchResults,

        serverStatus,
        setServerStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
