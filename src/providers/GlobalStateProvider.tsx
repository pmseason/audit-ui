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
  const [searchConfigs, setSearchConfigs] = useState<SearchConfig[]>([]);
  const [currentAuditId, setCurrentAuditId] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [includeFlags, setIncludeFlags] = useState<boolean[]>([]);

  //on first load
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    getSupportedSources().then(setSupportedSources).catch(console.error);
  };

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
        !mergedResults.some(
          (existingResult) =>
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
    setIncludeFlags([...includeFlags, false]);
  }

  const removeFromConfig = (index: number) => {
    const updatedConfigs = [...searchConfigs];
    const updatedFlags = [...includeFlags];
    updatedConfigs.splice(index, 1);
    updatedFlags.splice(index, 1);
    setSearchConfigs(updatedConfigs);
    setIncludeFlags(updatedFlags);
  }

  const addToNextSearch = (index: number) =>  {
    includeFlags[index] = true
  }

  const removeFromNextSearch = (index: number) =>  {
    includeFlags[index] = false;
  }

  const getSearchableConfigs = () => {
    return searchConfigs.filter((_, index) => includeFlags[index]);
  }


  return (
    <AppContext.Provider
      value={{
        supportedSources,
        searchConfigs,
        currentAuditId,
        searchResults,
        addToConfig,
        removeFromConfig,
        setSupportedSources,
        setCurrentAuditId,
        addToSearchResults,
        addToNextSearch,
        removeFromNextSearch,
        getSearchableConfigs,
        setSearchConfigs
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
