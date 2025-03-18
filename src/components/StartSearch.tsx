import { useContext } from "react";
import { Button } from "./ui/button";
import { beginSearch } from "@/api/api";
import { AppContext } from "@/contexts/AppContext";
import { GlobalState } from "@/types/types";
import { toast } from "sonner";
import { SearchResult } from "@pmseason/ai-job-scraper";

export function StartSearch() {
  //global app state
  const { addSearchResult, searchData, startLoading } = useContext(
    AppContext
  ) as GlobalState;

  const reportCompletion = (index: number, error: boolean, results?: SearchResult[]) => {
    if (error) addSearchResult(index, true)
    if (results) addSearchResult(index, false, results)
  }

  const beginAudit = async () => {
    //filter to all configs that are included
    const configs = searchData
      .filter((search) => search.includeInNextSearch)
      .map((search) => search.config);

    const indices = searchData
      .map((search, index) => search.includeInNextSearch ? index : -1)
      .filter(index => index !== -1);

    //start search in the background, receive a promise
    startLoading(indices)
    const searchStatus = beginSearch(configs, indices, reportCompletion);

    toast.promise(searchStatus, {
      loading: "Running an audit...",
      success: "Audit has successfully run!",
      error:
        "An error has occurred, sorry. Did you connect to the server beforehand? Reach out to Mrinal if this continues to happen",
    });
  };

  return (
    <Button type="button" onClick={beginAudit}>
      Begin Audit Search
    </Button>
  );
}
