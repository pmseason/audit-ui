import { getSupportedSources } from "@/api/api";
import { AppContext } from "@/contexts/AppContext";
import {
  SearchConfig,
  SearchResult,
  SearchSource,
} from "@mrinal-c/ai-job-scraper";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

export function GlobalStateProvider({ children }: Props) {
  //local state, this is put into global context
  const [supportedSources, setSupportedSources] = useState<SearchSource[]>([]);
  const [searchConfigs, _setSearchConfigs] = useState<SearchConfig[]>([]);
  const [currentAuditId, setCurrentAuditId] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [includeFlags, setIncludeFlags] = useState<boolean[]>([]);
  const [serverUrl, _setServerUrl] = useState("");

  //on first load
  useEffect(() => {
    init();
  }, []);

  const init = () => {};

  const isEquals = (a: SearchConfig, b: SearchConfig) => {
    return (
      a.scrapeFrom.name === b.scrapeFrom.name &&
      a.scrapeFrom.url === b.scrapeFrom.url &&
      a.roleType === b.roleType &&
      a.aiQuery === b.aiQuery
    );
  };

  const addToSearchResults = (newResults: SearchResult[]) => {
    const mergedResults = [...newResults];

    searchResults.forEach((result) => {
      if (
        !mergedResults.some((existingResult) =>
          isEquals(existingResult.searchConfig!, result.searchConfig!)
        )
      ) {
        mergedResults.push(result);
      }
    });
    setSearchResults(mergedResults);
  };

  const addToConfig = (config: SearchConfig) => {
    setSearchConfigs([...searchConfigs, config]);
    setIncludeFlags([...includeFlags, true]);
  };

  const removeFromConfig = (index: number) => {
    const updatedConfigs = [...searchConfigs];
    const updatedFlags = [...includeFlags];
    updatedConfigs.splice(index, 1);
    updatedFlags.splice(index, 1);
    setSearchConfigs(updatedConfigs);
    setIncludeFlags(updatedFlags);
  };

  const addToNextSearch = (index: number) => {
    includeFlags[index] = true;
  };

  const removeFromNextSearch = (index: number) => {
    includeFlags[index] = false;
  };

  const getSearchableConfigs = () => {
    return searchConfigs.filter((_, index) => includeFlags[index]);
  };

  const setSearchConfigs = (configs: SearchConfig[]) => {
    _setSearchConfigs(configs)
    setIncludeFlags(new Array(configs.length).fill(true))
  }

  const setServerUrl = (url: string) => {
    _setServerUrl(url);
    getSupportedSources(url).then(setSupportedSources).catch(console.error);
  };

  return (
    <AppContext.Provider
      value={{
        supportedSources,
        searchConfigs,
        currentAuditId,
        searchResults,
        serverUrl,
        addToConfig,
        removeFromConfig,
        setSupportedSources,
        setCurrentAuditId,
        addToSearchResults,
        addToNextSearch,
        removeFromNextSearch,
        getSearchableConfigs,
        setSearchConfigs,
        setServerUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
