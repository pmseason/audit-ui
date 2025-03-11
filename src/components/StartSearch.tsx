import { useContext } from "react";
import { Button } from "./ui/button";
import { beginSearch } from "@/api/api";
import { AppContext } from "@/contexts/AppContext";
import { GlobalState } from "@/types/types";
import { toast } from "sonner";

export function StartSearch() {
  //global app state
  const { addToSearchResults, searchConfigData } = useContext(
    AppContext
  ) as GlobalState;

  const beginAudit = async () => {
    //filter to all configs that are included
    const configs = searchConfigData
      .filter((configData) => configData.includeInNextSearch)
      .map((configData) => configData.config);

    //start search in the background, receive a promise
    const searchStatus = beginSearch(configs);

    toast.promise(searchStatus, {
      loading: "Started an audit...",
      success: "Audit has successfully run!",
      error:
        "An error has occurred, sorry. Did you connect to the server beforehand? Reach out to Mrinal if this continues to happen",
    });
    searchStatus.then(addToSearchResults).catch();
  };

  return (
    <Button type="button" onClick={beginAudit}>
      Begin Audit Search
    </Button>
  );
}
