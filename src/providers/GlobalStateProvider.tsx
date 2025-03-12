import { getSupportedSources } from "@/api/api";
import { AppContext } from "@/contexts/AppContext";
import { Search, SearchStatus } from "@/types/types";
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
  const [searchData, setSearchData] = useState<Search[]>([]);
  const [currentAuditId, setCurrentAuditId] = useState<string | undefined>();

  //on first load
  useEffect(() => {
    init();
  }, []);

  //on page load, fetch updated sources to show in the form
  const init = () => {
    getSupportedSources().then(setSupportedSources);
  };

  /////////////////////SEARCH CONFIG//////////////////////
  //add a single new config to the list
  const addToConfig = (
    config: SearchConfig,
    supportedSource?: SearchSource
  ) => {
    //default to search in the next run
    setSearchData([
      ...searchData,
      { config, supportedSource, includeInNextSearch: true, status: SearchStatus.NotRun },
    ]);
  };

  //remove a single config from the list
  const removeFromConfig = (index: number) => {
    setSearchData((prevSearches) => prevSearches.filter((_, i) => i !== index));
  };

  //include a specific search in the next search
  const includeInNextSearch = (index: number) => {
    setSearchData((prevSearchData) =>
      prevSearchData.map((search, i) =>
      i === index ? { ...search, includeInNextSearch: true } : search
      )
    );
  };

  //exclude a specific search from the next search
  const excludeFromNextSearch = (index: number) => {
    setSearchData((prevSearchData) =>
      prevSearchData.map((search, i) =>
      i === index ? { ...search, includeInNextSearch: false } : search
      )
    );
  };

  //set global search config from user-uploaded file, user can decide if it overwrites or concats
  const setSearchConfigs = (configs: SearchConfig[], overwrite: boolean) => {
    setSearchData((prevSearches) => [
      ...(overwrite ? [] : prevSearches),
      ...configs.map((config) => ({ config, includeInNextSearch: true, status: "not-run" as SearchStatus })),
    ]);
  };

  const toggleAll = () => {
    setSearchData((prevSearchData) => {
      const allIncluded = prevSearchData.every((search) => search.includeInNextSearch);
      return prevSearchData.map((search) => ({
      ...search,
      includeInNextSearch: !allIncluded,
      }));
    });
  }

  const startLoading = (indices: number[]) => {
    setSearchData((prevSearchData) =>
      prevSearchData.map((search, i) =>
      indices.includes(i)
        ? { ...search, status: SearchStatus.InProgress }
        : search
      )
    );
  };

  /////////////////////SEARCH RESULTS//////////////////////
  const addSearchResult = (index: number, error: boolean, result?: SearchResult) => {
    setSearchData((prevSearchData) =>
      prevSearchData.map((search, i) =>
      i === index
        ? { ...search, ...(result && { results: result }), status: error ? SearchStatus.Error : SearchStatus.Success }
        : search
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        supportedSources,

        searchData,
        addToConfig,
        removeFromConfig,
        includeInNextSearch,
        excludeFromNextSearch,
        setSearchConfigs,

        currentAuditId,
        setCurrentAuditId,

        addSearchResult,

        toggleAll,
        startLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
